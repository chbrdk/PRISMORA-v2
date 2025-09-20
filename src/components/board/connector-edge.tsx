'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { Connector } from '@/types/prismora';
import { Prismion } from '@/types/prismora';
import { Switch } from '@/components/ui/switch';
import { 
  calculatePortPosition, 
  generateConnectionPath,
  getConnectorBounds,
  findPathAvoidingObstacles,
  Point,
  Obstacle
} from '@/lib/connector-utils';

interface ConnectorEdgeProps {
  connector: Connector;
  prismions: Record<string, Prismion>;
  selectedPrismionIds?: string[];
  onDirectionChange?: (connectorId: string, newDirection: 'forward' | 'backward') => void;
  onNewConnection?: (fromConnectorId: string, toConnectorId: string, optimalPort?: 'top' | 'right' | 'bottom' | 'left') => void;
}

export function ConnectorEdge({ connector, prismions, selectedPrismionIds = [], onDirectionChange, onNewConnection }: ConnectorEdgeProps) {
  const [forceUpdate, setForceUpdate] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isOverlayHovered, setIsOverlayHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartPos, setDragStartPos] = useState<{ x: number; y: number } | null>(null);
  const [dragCurrentPos, setDragCurrentPos] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Pointer-based drag (reliable on SVG)
  const handlePointerDown = useCallback((e: React.PointerEvent<SVGPathElement>) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.currentTarget as Element).setPointerCapture(e.pointerId);
    } catch {}
    setIsDragging(true);
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setDragStartPos({ x, y });
      setDragCurrentPos({ x, y });
    }
  }, []);

  const handlePointerMove = useCallback((e: React.PointerEvent<SVGPathElement>) => {
    if (!isDragging) return;
    const rect = svgRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setDragCurrentPos({ x, y });
    }
  }, [isDragging]);

  const handlePointerUp = useCallback((e: React.PointerEvent<SVGPathElement>) => {
    if (!isDragging) return;
    e.preventDefault();
    e.stopPropagation();
    try {
      (e.currentTarget as Element).releasePointerCapture(e.pointerId);
    } catch {}

    // Detect drop target under cursor
    const target = document.elementFromPoint(e.clientX, e.clientY);
    if (target && onNewConnection) {
      const connectorEl = (target as HTMLElement).closest('[data-connector-id]') as HTMLElement | null;
      const prismionEl = (target as HTMLElement).closest('[data-prismion-id]') as HTMLElement | null;

      if (connectorEl) {
        const toConnectorId = connectorEl.getAttribute('data-connector-id') || '';
        if (toConnectorId && toConnectorId !== connector.id) {
          onNewConnection(connector.id, toConnectorId);
        }
      } else if (prismionEl) {
        const toPrismionId = prismionEl.getAttribute('data-prismion-id') || '';
        if (toPrismionId) {
          const rect = prismionEl.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width;
          const relY = (e.clientY - rect.top) / rect.height;
          let optimalPort: 'top' | 'right' | 'bottom' | 'left';
          if (relY < 0.3) optimalPort = 'top';
          else if (relY > 0.7) optimalPort = 'bottom';
          else if (relX < 0.3) optimalPort = 'left';
          else optimalPort = 'right';
          onNewConnection(connector.id, toPrismionId, optimalPort);
        }
      }
    }

    setIsDragging(false);
    setDragStartPos(null);
    setDragCurrentPos(null);
  }, [isDragging, onNewConnection, connector.id]);

  // Get the connected prismions
  const fromPrismion = prismions[connector.from.prismionId];
  const toPrismion = prismions[connector.to.prismionId];

  if (!fromPrismion || !toPrismion) {
    return null;
  }

  // Check if either connected prismion is selected
  const isSelected = selectedPrismionIds.includes(fromPrismion.id) || selectedPrismionIds.includes(toPrismion.id);

  // Determine line style based on selection
  const lineStyle = isSelected ? {
    stroke: "hsl(var(--primary))",
    strokeWidth: "2",
    strokeDasharray: "none"
  } : {
    stroke: "#9ca3af",
    strokeWidth: "2",
    strokeDasharray: "5,5"
  };

  // Get port positions
  const fromPos = calculatePortPosition(fromPrismion, connector.from.port);
  const toPos = calculatePortPosition(toPrismion, connector.to.port);

  // Convert all prismions to obstacles (excluding the connected ones)
  const obstacles: Obstacle[] = Object.values(prismions)
    .filter(p => p.id !== fromPrismion.id && p.id !== toPrismion.id)
    .map(p => ({
      x: p.position.x,
      y: p.position.y,
      width: p.size.w,
      height: p.size.h,
      id: p.id
    }));

  // Find path avoiding obstacles
  const path = findPathAvoidingObstacles(fromPos, toPos, obstacles, [
    fromPrismion.id, 
    toPrismion.id
  ], connector.from.port, connector.to.port);

  // Calculate SVG bounds based on path points
  const bounds = getConnectorBounds(fromPos, toPos, path);

  // Calculate midpoint for overlay - use the actual midpoint of the visible path
  const getMidpoint = () => {
    // Calculate the actual midpoint of the path by finding the middle point
    // of the path segments that are actually visible
    
    if (path.length === 2) {
      // Direct connection
      return {
        x: (fromPos.x + toPos.x) / 2,
        y: (fromPos.y + toPos.y) / 2
      };
    } else if (path.length === 4) {
      // Path with perpendicular exits - use the middle of the main segment
      const startExit = path[1];
      const endExit = path[2];
      return {
        x: (startExit.x + endExit.x) / 2,
        y: (startExit.y + endExit.y) / 2
      };
    } else if (path.length === 6) {
      // Path with waypoints - use the middle of the waypoint segment
      const waypoint1 = path[2];
      const waypoint2 = path[3];
      return {
        x: (waypoint1.x + waypoint2.x) / 2,
        y: (waypoint1.y + waypoint2.y) / 2
      };
    } else {
      // Complex path - use the middle of the longest segment
      let maxDistance = 0;
      let bestMidpoint = { x: 0, y: 0 };
      
      for (let i = 0; i < path.length - 1; i++) {
        const current = path[i];
        const next = path[i + 1];
        const distance = Math.sqrt(
          Math.pow(next.x - current.x, 2) + Math.pow(next.y - current.y, 2)
        );
        
        if (distance > maxDistance) {
          maxDistance = distance;
          bestMidpoint = {
            x: (current.x + next.x) / 2,
            y: (current.y + next.y) / 2
          };
        }
      }
      
      return bestMidpoint;
    }
  };

  const midpoint = getMidpoint();

  // Handle direction change
  const handleDirectionChange = (checked: boolean) => {
    if (onDirectionChange) {
      const newDirection = checked ? 'forward' : 'backward';
      onDirectionChange(connector.id, newDirection);
    }
  };

  // Get current direction (optional on type)
  const currentDirection: 'forward' | 'backward' = (
    (connector as unknown as { direction?: 'forward' | 'backward' }).direction
  ) || 'forward';

  // Show overlay when hovering over line OR overlay
  const shouldShowOverlay = isHovered || showOverlay || isOverlayHovered;

  // Build rounded-corner orthogonal path data
  const buildRoundedPathData = (points: Point[], cornerRadius = 16): string => {
    if (points.length < 2) return '';
    if (points.length === 2) {
      return `M ${points[0].x - bounds.x} ${points[0].y - bounds.y} L ${points[1].x - bounds.x} ${points[1].y - bounds.y}`;
    }

    let d = `M ${points[0].x - bounds.x} ${points[0].y - bounds.y}`;
    for (let i = 1; i < points.length - 1; i++) {
      const p0 = points[i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];

      const v1x = p1.x - p0.x;
      const v1y = p1.y - p0.y;
      const v2x = p2.x - p1.x;
      const v2y = p2.y - p1.y;

      const epsilon = 0.0001;
      const isV1Horizontal = Math.abs(v1y) < epsilon && Math.abs(v1x) > epsilon;
      const isV1Vertical = Math.abs(v1x) < epsilon && Math.abs(v1y) > epsilon;
      const isV2Horizontal = Math.abs(v2y) < epsilon && Math.abs(v2x) > epsilon;
      const isV2Vertical = Math.abs(v2x) < epsilon && Math.abs(v2y) > epsilon;

      // If not a right-angle turn, just line to p1
      if (!((isV1Horizontal && isV2Vertical) || (isV1Vertical && isV2Horizontal))) {
        d += ` L ${p1.x - bounds.x} ${p1.y - bounds.y}`;
        continue;
      }

      const len1 = Math.abs(isV1Horizontal ? v1x : v1y);
      const len2 = Math.abs(isV2Horizontal ? v2x : v2y);
      const r = Math.min(cornerRadius, Math.max(0, Math.min(len1, len2) / 2));

      // Points before and after corner by r
      let p1a: Point = { x: p1.x, y: p1.y };
      let p1b: Point = { x: p1.x, y: p1.y };
      if (isV1Horizontal) {
        p1a.x = p1.x - Math.sign(v1x) * r;
        p1a.y = p1.y;
      } else {
        p1a.x = p1.x;
        p1a.y = p1.y - Math.sign(v1y) * r;
      }
      if (isV2Horizontal) {
        p1b.x = p1.x + Math.sign(v2x) * r;
        p1b.y = p1.y;
      } else {
        p1b.x = p1.x;
        p1b.y = p1.y + Math.sign(v2y) * r;
      }

      // Line to p1a then use quadratic curve with control point at the corner (p1)
      d += ` L ${p1a.x - bounds.x} ${p1a.y - bounds.y}`;
      d += ` Q ${p1.x - bounds.x} ${p1.y - bounds.y}, ${p1b.x - bounds.x} ${p1b.y - bounds.y}`;
    }
    // Finally line to last point
    const last = points[points.length - 1];
    d += ` L ${last.x - bounds.x} ${last.y - bounds.y}`;
    return d;
  };

  const pathData = buildRoundedPathData(path, 12);
  
  console.log('🎯 Connector path data:', { connectorId: connector.id, pathData, bounds });



  // Force re-render when connected prismion positions change
  useEffect(() => {
    const fromPrismion = prismions[connector.from.prismionId];
    const toPrismion = prismions[connector.to.prismionId];
    
    if (!fromPrismion || !toPrismion) return;

    // Force re-render by updating state
    setForceUpdate(prev => prev + 1);
  }, [
    connector.from.prismionId, 
    connector.to.prismionId,
    prismions[connector.from.prismionId]?.position.x,
    prismions[connector.from.prismionId]?.position.y,
    prismions[connector.to.prismionId]?.position.x,
    prismions[connector.to.prismionId]?.position.y
  ]);

  return (
    <>
      {/* SVG for the connector line */}
      <svg
        ref={svgRef}
        data-connector-id={connector.id}
        style={{
          position: 'absolute',
          left: bounds.x,
          top: bounds.y,
          width: bounds.width,
          height: bounds.height,
          pointerEvents: 'none',
          zIndex: 0,
        }}
        viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setShowOverlay(false);
        }}
        onMouseDown={() => setShowOverlay(true)}
        onMouseUp={() => setShowOverlay(false)}
      >
        {/* Arrowhead definitions */}
        <defs>
          <marker
            id={`arrowhead-forward-${connector.id}`}
            markerWidth="8"
            markerHeight="6"
            refX="6"
            refY="3"
            orient="auto"
          >
            <polygon
              points="0 0, 8 3, 0 6"
              fill={lineStyle.stroke}
            />
          </marker>
          <marker
            id={`arrowhead-backward-${connector.id}`}
            markerWidth="8"
            markerHeight="6"
            refX="2"
            refY="3"
            orient="auto"
          >
            <polygon
              points="8 0, 0 3, 8 6"
              fill={lineStyle.stroke}
            />
          </marker>
        </defs>
        
        {/* Main connector path with arrowhead */}
        <path
          d={pathData}
          stroke={lineStyle.stroke}
          strokeWidth={lineStyle.strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={lineStyle.strokeDasharray}
          markerEnd={currentDirection === 'forward' ? `url(#arrowhead-forward-${connector.id})` : undefined}
          markerStart={currentDirection === 'backward' ? `url(#arrowhead-backward-${connector.id})` : undefined}
          style={{ 
            pointerEvents: 'stroke', 
            cursor: isDragging ? 'grabbing' : 'grab',
            opacity: isDragging ? 0.7 : 1,
            touchAction: 'none'
          }}
          data-connector-id={connector.id}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        />

        {/* Drag preview line */}
        {isDragging && dragStartPos && dragCurrentPos && (
          <path
            d={`M ${dragStartPos.x} ${dragStartPos.y} L ${dragCurrentPos.x} ${dragCurrentPos.y}`}
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            strokeDasharray="5,5"
            fill="none"
            style={{ pointerEvents: 'none' }}
          />
        )}

        {/* Interactive overlay inside SVG */}
        {shouldShowOverlay && (
          <g>
            {/* Background rectangle for better visibility */}
            <rect
              x={midpoint.x - bounds.x - 35}
              y={midpoint.y - bounds.y - 15}
              width="70"
              height="30"
              rx="6"
              fill="rgba(255, 255, 255, 0.95)"
              stroke="hsl(var(--primary))"
              strokeWidth="1"
              style={{ pointerEvents: 'all', cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); handleDirectionChange(currentDirection === 'backward'); }}
            />
            
            {/* Direction text */}
            <text
              x={midpoint.x - bounds.x - 25}
              y={midpoint.y - bounds.y - 2}
              fontSize="10"
              fill="hsl(var(--primary))"
              fontWeight="500"
              style={{ pointerEvents: 'all', cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); handleDirectionChange(currentDirection === 'backward'); }}
            >
              Richtung
            </text>
            
            {/* Direction indicator */}
            <text
              x={midpoint.x - bounds.x + 15}
              y={midpoint.y - bounds.y + 4}
              fontSize="12"
              fill="hsl(var(--primary))"
              fontWeight="bold"
              style={{ pointerEvents: 'all', cursor: 'pointer' }}
              onClick={(e) => { e.stopPropagation(); handleDirectionChange(currentDirection === 'backward'); }}
            >
              {currentDirection === 'forward' ? '→' : '←'}
            </text>
          </g>
        )}
      </svg>

      {/* HTML overlay for the Switch component */}
      {shouldShowOverlay && (
        <div
          style={{
            position: 'absolute',
            left: midpoint.x - 40, // Center the wider overlay
            top: midpoint.y - 20,  // Center the taller overlay
            zIndex: 20,
            pointerEvents: 'all',
          }}
          onMouseEnter={() => setIsOverlayHovered(true)}
          onMouseLeave={() => setIsOverlayHovered(false)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-gray-200 min-w-[80px]">
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-gray-600 font-medium leading-none">Richtung</span>
              <div className="flex-shrink-0">
                <Switch
                  size="default"
                  variant="direction"
                  checked={currentDirection === 'forward'}
                  onChange={(e) => handleDirectionChange(e.target.checked)}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

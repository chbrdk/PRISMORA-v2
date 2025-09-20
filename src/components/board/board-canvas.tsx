'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Board, Prismion, Connection, BoardParticipant, Connector } from '@/types/prismora';
import { useBoardStore } from '@/stores/board-store';
import { CANVAS_DEFAULTS } from '@/lib/board-utils';
import { BoardToolbar } from '@/components/board/board-toolbar';
import { UserToolbar } from '@/components/board/user-toolbar';
import { PrismionCard } from '@/components/board/prismion-card';
import { ConnectorEdge } from '@/components/board/connector-edge';
import { resolveOverlaps } from '@/lib/collision-utils';
import { findOptimalPorts } from '@/lib/connector-utils';
import { Sparkles } from 'lucide-react';

interface BoardCanvasProps {
  board: Board;
  prismions: Prismion[];
  connections: Connection[];
  participants: BoardParticipant[];
  onPrismionCreated?: (prismion: Prismion) => void;
  onRefresh?: () => void;
}

export function BoardCanvas({ board, prismions, connections, participants, onPrismionCreated, onRefresh }: BoardCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [selectedPrismionId, setSelectedPrismionId] = useState<string | null>(null);
  
  // Port drag state (from Storybook demo)
  const [portDrag, setPortDrag] = useState<{
    active: boolean;
    fromPrismionId: string | null;
    fromPort: 'top' | 'right' | 'bottom' | 'left' | null;
    start: { x: number; y: number } | null;
    current: { x: number; y: number } | null;
  }>({ active: false, fromPrismionId: null, fromPort: null, start: null, current: null });
  
  // Local state for prismions and connectors (sync with props)
  const [localPrismions, setLocalPrismions] = useState<Record<string, Prismion>>({});
  const [localConnectors, setLocalConnectors] = useState<Record<string, Connector>>({});
  
  const { canvas, setPan, setZoom } = useBoardStore();

  // Helper functions (from Storybook demo)
  const getOppositePort = (port: 'top' | 'right' | 'bottom' | 'left'): 'top' | 'right' | 'bottom' | 'left' => {
    switch (port) {
      case 'top': return 'bottom';
      case 'right': return 'left';
      case 'bottom': return 'top';
      case 'left': return 'right';
    }
  };

  // Convert database format to Storybook format
  const convertToStoryBookPrismion = (dbPrismion: any): Prismion => ({
    id: dbPrismion.id,
    boardId: dbPrismion.boardId,
    title: dbPrismion.title,
    prompt: dbPrismion.prompt || '',
    colorToken: dbPrismion.color || '#0ea5e9',
    tags: dbPrismion.tags.map((tag: string, index: number) => ({
      id: `tag-${index}`,
      label: tag,
      colorToken: '#3b82f6'
    })),
    position: { x: dbPrismion.x, y: dbPrismion.y, zIndex: 10 },
    size: { w: dbPrismion.width, h: dbPrismion.height, minW: 200, minH: 150 },
    ports: {
      top: { id: 'top', side: 'top', capacity: 'multi' },
      right: { id: 'right', side: 'right', capacity: 'multi' },
      bottom: { id: 'bottom', side: 'bottom', capacity: 'multi' },
      left: { id: 'left', side: 'left', capacity: 'multi' }
    },
    state: dbPrismion.state || 'draft',
    createdBy: 'user',
    createdAt: dbPrismion.createdAt,
    updatedAt: dbPrismion.updatedAt,
    revision: 1
  });

  // Sync props to local state
  React.useEffect(() => {
    const prismionMap: Record<string, Prismion> = {};
    prismions.forEach(p => {
      prismionMap[p.id] = convertToStoryBookPrismion(p);
    });
    setLocalPrismions(prismionMap);
  }, [prismions]);

  React.useEffect(() => {
    const connectorMap: Record<string, Connector> = {};
    connections.forEach(c => {
      connectorMap[c.id] = {
        id: c.id,
        boardId: c.boardId,
        from: { prismionId: c.fromPrismionId, port: (c.fromPort as any) || 'right' },
        to: { prismionId: c.toPrismionId, port: (c.toPort as any) || 'left' },
        createdBy: 'user',
        createdAt: c.createdAt,
      };
    });
    setLocalConnectors(connectorMap);
  }, [connections]);

  // Create new prismion (from Storybook demo)
  const createNewPrismion = async (sourcePrismionId: string, port: 'top' | 'right' | 'bottom' | 'left') => {
    const sourcePrismion = localPrismions[sourcePrismionId];
    if (!sourcePrismion) return;

    // Calculate position for new prismion
    const offset = 350;
    let newX = sourcePrismion.position.x;
    let newY = sourcePrismion.position.y;

    switch (port) {
      case 'right':
        newX += offset;
        break;
      case 'left':
        newX -= offset;
        break;
      case 'bottom':
        newY += offset;
        break;
      case 'top':
        newY -= offset;
        break;
    }

    try {
      const response = await fetch(`/api/boards/${board.shareId}/prismions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New Prismion',
          prompt: '',
          x: Math.max(0, newX),
          y: Math.max(0, newY),
          width: 300,
          height: 200,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ New prismion created:', result.prismion);
        
        // Add to local state immediately
        const newPrismion = convertToStoryBookPrismion(result.prismion);
        setLocalPrismions(prev => {
          let next: Record<string, Prismion> = { ...prev, [newPrismion.id]: newPrismion };
          next = resolveOverlaps(next, newPrismion.id, { maxIterations: 16, snapToGrid: 10, padding: 50 });
          return next;
        });

        // Create connector
        const connectorId = `connector-${Date.now()}`;
        const newConnector: Connector = {
          id: connectorId,
          boardId: board.id,
          from: { prismionId: sourcePrismionId, port },
          to: { prismionId: newPrismion.id, port: getOppositePort(port) },
          createdBy: 'user',
          createdAt: new Date().toISOString(),
        };
        setLocalConnectors(prev => ({ ...prev, [connectorId]: newConnector }));

        if (onPrismionCreated) {
          onPrismionCreated(result.prismion);
        }
      }
    } catch (error) {
      console.error('❌ Failed to create prismion:', error);
    }
  };
  
  // Canvas settings from board or defaults
  const canvasSettings = board.canvasSettings || CANVAS_DEFAULTS;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 1 || (e.button === 0 && e.metaKey)) { // Middle click or Cmd+Click
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      
      setPan({
        x: canvas.pan.x + deltaX,
        y: canvas.pan.y + deltaY,
      });
      
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, lastPanPoint, canvas.pan, setPan]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const zoomFactor = e.deltaY > 0 ? 0.9 : 1.1;
    const newZoom = Math.max(
      CANVAS_DEFAULTS.minZoom,
      Math.min(CANVAS_DEFAULTS.maxZoom, canvas.zoom * zoomFactor)
    );
    
    // Zoom towards cursor position
    const zoomDelta = newZoom - canvas.zoom;
    const panDeltaX = (e.clientX - rect.left - centerX - canvas.pan.x) * (zoomDelta / canvas.zoom);
    const panDeltaY = (e.clientY - rect.top - centerY - canvas.pan.y) * (zoomDelta / canvas.zoom);
    
    setZoom(newZoom);
    setPan({
      x: canvas.pan.x - panDeltaX,
      y: canvas.pan.y - panDeltaY,
    });
  }, [canvas.zoom, canvas.pan, setZoom, setPan]);

  const handleDoubleClick = useCallback(async (e: React.MouseEvent) => {
    // Create new Prismion at click position
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left - canvas.pan.x) / canvas.zoom;
    const y = (e.clientY - rect.top - canvas.pan.y) / canvas.zoom;

    try {
      const response = await fetch(`/api/boards/${board.shareId}/prismions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'New Prismion',
          prompt: '',
          x,
          y,
          width: 300,
          height: 200,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (onPrismionCreated) {
          onPrismionCreated(result.prismion);
        }
      }
    } catch (error) {
      console.error('Failed to create prismion:', error);
    }
  }, [canvas.pan, canvas.zoom, board.shareId, onPrismionCreated]);

  // Grid pattern
  const gridSize = canvasSettings.patternSize * canvas.zoom;
  const gridOffsetX = canvas.pan.x % gridSize;
  const gridOffsetY = canvas.pan.y % gridSize;

  return (
    <div
      ref={canvasRef}
      className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
      style={{ backgroundColor: canvasSettings.backgroundColor }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onWheel={handleWheel}
      onDoubleClick={handleDoubleClick}
    >
      {/* Grid Background */}
      {canvasSettings.background === 'grid' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ 
            transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`,
          }}
        >
          <defs>
            <pattern
              id="grid"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`}
                fill="none"
                stroke={canvasSettings.patternColor}
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      )}

      {/* Dot Background */}
      {canvasSettings.background === 'dots' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ 
            transform: `translate(${gridOffsetX}px, ${gridOffsetY}px)`,
          }}
        >
          <defs>
            <pattern
              id="dots"
              width={gridSize}
              height={gridSize}
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx={gridSize / 2}
                cy={gridSize / 2}
                r="1"
                fill={canvasSettings.patternColor}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      )}

      {/* Canvas Content */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${canvas.pan.x}px, ${canvas.pan.y}px) scale(${canvas.zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Connections Layer */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {connections.map((connection) => (
            <g key={connection.id}>
              {/* TODO: Render connection with intelligent pathfinding */}
              <line
                x1={100} // TODO: Calculate from actual Prismion positions
                y1={100}
                x2={300}
                y2={200}
                stroke={connection.color || '#6b7280'}
                strokeWidth={connection.strokeWidth}
                className="pointer-events-auto cursor-pointer hover:stroke-blue-500"
              />
            </g>
          ))}
        </svg>

        {/* Empty State - Getting Started */}
        {prismions.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-md text-center shadow-xl border-2 border-dashed border-blue-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Bereit für deine Ideen! 
              </h3>
              <p className="text-gray-600 mb-4">
                **Doppelklick** auf das Canvas, um dein erstes Prismion zu erstellen und loszulegen.
              </p>
              <div className="text-xs text-gray-500">
                💡 Tipp: Du kannst Prismions verschieben, bearbeiten und miteinander verbinden
              </div>
            </div>
          </div>
        )}

        {/* Prismions Layer */}
        {prismions.map((prismion) => {
          // Convert database Prismion to Storybook Prismion format
          const isStartHere = prismion.tags.includes('start-here');
          const isEmpty = !prismion.prompt || prismion.prompt.trim() === '';
          const storyBookPrismion = {
            id: prismion.id,
            boardId: prismion.boardId,
            title: prismion.title,
            prompt: prismion.prompt || '',
            colorToken: prismion.color || '#0ea5e9',
            tags: prismion.tags.map((tag, index) => ({
              id: `tag-${index}`,
              label: tag,
              colorToken: isStartHere ? '#10b981' : '#3b82f6'
            })),
            position: {
              x: prismion.x,
              y: prismion.y,
              zIndex: 10
            },
            size: {
              w: prismion.width,
              h: prismion.height,
              minW: 200,
              minH: 150
            },
            ports: {
              top: { id: 'top', side: 'top' as const, capacity: 'multi' as const },
              right: { id: 'right', side: 'right' as const, capacity: 'multi' as const },
              bottom: { id: 'bottom', side: 'bottom' as const, capacity: 'multi' as const },
              left: { id: 'left', side: 'left' as const, capacity: 'multi' as const }
            },
            state: prismion.state as any || 'draft',
            createdBy: 'user',
            createdAt: prismion.createdAt,
            updatedAt: prismion.updatedAt,
            revision: 1
          };

          return (
            <div
              key={prismion.id}
              className={`absolute ${isStartHere && isEmpty ? 'animate-pulse' : ''}`}
              style={{
                left: prismion.x,
                top: prismion.y,
                zIndex: isStartHere ? 20 : 10,
              }}
            >
              <PrismionCard
                prismion={storyBookPrismion}
                onMove={(position) => {
                  console.log('Move prismion to:', position);
                  // TODO: Update prismion position via API
                }}
                onSelect={(multiSelect) => {
                  console.log('Select prismion:', prismion.id, multiSelect);
                }}
                onPromptSubmit={(prompt) => {
                  console.log('Submit prompt:', prompt);
                  // TODO: Update prismion prompt via API
                }}
                onConnectorClick={async (port) => {
                  console.log('Create new prismion from port:', port, 'on prismion:', prismion.id);
                  
                  // Use Storybook demo logic for positioning
                  const offset = 350; // Distance from current prismion
                  let newX = prismion.x;
                  let newY = prismion.y;
                  
                  switch (port) {
                    case 'right':
                      newX = prismion.x + prismion.width + 50;
                      break;
                    case 'left':
                      newX = prismion.x - offset;
                      break;
                    case 'bottom':
                      newY = prismion.y + prismion.height + 50;
                      break;
                    case 'top':
                      newY = prismion.y - offset;
                      break;
                  }
                  
                  try {
                    const response = await fetch(`/api/boards/${board.shareId}/prismions`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        title: 'New Prismion',
                        prompt: '',
                        x: Math.max(0, newX), // Ensure positive coordinates
                        y: Math.max(0, newY),
                        width: 300,
                        height: 200,
                      }),
                    });

                    if (response.ok) {
                      const result = await response.json();
                      console.log('✅ New prismion created:', result.prismion);
                      if (onPrismionCreated) {
                        onPrismionCreated(result.prismion);
                      }
                    } else {
                      console.error('❌ Failed to create prismion:', response.status, response.statusText);
                    }
                  } catch (error) {
                    console.error('❌ Network error creating prismion:', error);
                  }
                }}
                className={isStartHere && isEmpty ? 'ring-2 ring-green-400 ring-opacity-75 shadow-xl' : ''}
                // Auto-focus the prompt input for start-here prismions
                autoFocus={isStartHere && isEmpty}
              />
            </div>
          );
        })}

        {/* Participant Cursors */}
        {participants
          .filter(p => p.isActive && p.cursorX !== null && p.cursorY !== null)
          .map((participant) => (
            <div
              key={participant.id}
              className="absolute pointer-events-none z-50"
              style={{
                left: participant.cursorX!,
                top: participant.cursorY!,
                transform: 'translate(-2px, -2px)',
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20">
                <path
                  d="M0 0L0 16L5 11L9 15L13 10L20 20L0 0Z"
                  fill={participant.userColor || '#6b7280'}
                  className="drop-shadow-sm"
                />
              </svg>
              <div
                className="absolute top-5 left-2 px-2 py-1 rounded text-xs text-white font-medium whitespace-nowrap"
                style={{ backgroundColor: participant.userColor || '#6b7280' }}
              >
                {participant.userName}
              </div>
            </div>
          ))}
      </div>

      {/* Board Toolbar - Bottom Right */}
      <div className="absolute bottom-4 right-4">
        <BoardToolbar />
      </div>

      {/* User Toolbar - Top Right */}
      <div className="absolute top-4 right-4">
        <UserToolbar 
          displayName="Anonymous User"
          onChangeName={(name) => console.log('Change name:', name)}
          onChangeAvatar={(url) => console.log('Change avatar:', url)}
          onToggleFollow={(enabled) => console.log('Toggle follow:', enabled)}
          variant="compact"
        />
      </div>
    </div>
  );
}
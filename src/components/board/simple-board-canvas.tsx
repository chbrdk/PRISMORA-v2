'use client';

import React, { useState, useRef, useCallback } from 'react';
import { Board, Prismion, Connection, BoardParticipant } from '@/types/prismora';
import { PrismionCard } from '@/components/board/prismion-card';
import { ConnectorEdge } from '@/components/board/connector-edge';
import { Plus } from 'lucide-react';

interface SimpleBoardCanvasProps {
  board: Board;
  prismions: Prismion[];
  connections: Connection[];
  participants: BoardParticipant[];
  onPrismionCreated?: (prismion: Prismion) => void;
}

export function SimpleBoardCanvas({ 
  board, 
  prismions, 
  connections, 
  participants, 
  onPrismionCreated 
}: SimpleBoardCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [selectedPrismionId, setSelectedPrismionId] = useState<string | null>(null);

  // Handle canvas panning
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (isPanning) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      setPan(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  }, [isPanning, lastPanPoint]);

  const handleMouseUp = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Handle zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.max(0.1, Math.min(3, prev * delta)));
  }, []);

  // Handle double-click to create new prismion
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    if (e.target === canvasRef.current) {
      const rect = canvasRef.current!.getBoundingClientRect();
      const x = (e.clientX - rect.left - pan.x) / zoom;
      const y = (e.clientY - rect.top - pan.y) / zoom;

      const newPrismion: Prismion = {
        id: `prismion-${Date.now()}`,
        boardId: board.id,
        title: 'New Prismion',
        prompt: 'Click to edit...',
        colorToken: '#0ea5e9',
        tags: [],
        position: { x, y, zIndex: 10 },
        size: { w: 300, h: 200, minW: 200, minH: 100 },
        ports: {
          top: { id: 'top', side: 'top', capacity: 'multi' },
          right: { id: 'right', side: 'right', capacity: 'multi' },
          bottom: { id: 'bottom', side: 'bottom', capacity: 'multi' },
          left: { id: 'left', side: 'left', capacity: 'multi' }
        },
        state: 'active',
        createdBy: 'user',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        revision: 1
      };

      onPrismionCreated?.(newPrismion);
    }
  }, [board.id, pan, zoom, onPrismionCreated]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-gray-50">
      {/* Canvas */}
      <div
        ref={canvasRef}
        className="absolute inset-0 cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
        onDoubleClick={handleDoubleClick}
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0'
        }}
      >
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `radial-gradient(circle, #d1d5db 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}
        />

        {/* Prismions */}
        {prismions.map((prismion) => (
          <div
            key={prismion.id}
            className="absolute"
            style={{
              left: prismion.position.x,
              top: prismion.position.y,
              zIndex: prismion.position.zIndex
            }}
          >
            <PrismionCard
              prismion={prismion}
              isSelected={selectedPrismionId === prismion.id}
              onSelect={() => setSelectedPrismionId(prismion.id)}
              onDeselect={() => setSelectedPrismionId(null)}
            />
          </div>
        ))}

        {/* Connections */}
        <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
          {connections.map((connection) => (
            <ConnectorEdge
              key={connection.id}
              connection={connection}
              fromPrismion={prismions.find(p => p.id === connection.fromPrismionId)}
              toPrismion={prismions.find(p => p.id === connection.toPrismionId)}
            />
          ))}
        </svg>
      </div>

      {/* Add Prismion Button */}
      <button
        className="absolute bottom-4 right-4 z-10 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 shadow-lg transition-colors"
        onClick={() => {
          const newPrismion: Prismion = {
            id: `prismion-${Date.now()}`,
            boardId: board.id,
            title: 'New Prismion',
            prompt: 'Click to edit...',
            colorToken: '#0ea5e9',
            tags: [],
            position: { x: 100, y: 100, zIndex: 10 },
            size: { w: 300, h: 200, minW: 200, minH: 100 },
            ports: {
              top: { id: 'top', side: 'top', capacity: 'multi' },
              right: { id: 'right', side: 'right', capacity: 'multi' },
              bottom: { id: 'bottom', side: 'bottom', capacity: 'multi' },
              left: { id: 'left', side: 'left', capacity: 'multi' }
            },
            state: 'active',
            createdBy: 'user',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            revision: 1
          };
          onPrismionCreated?.(newPrismion);
        }}
      >
        <Plus className="w-6 h-6" />
      </button>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <button
          className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm"
          onClick={() => setZoom(prev => Math.min(3, prev * 1.2))}
        >
          +
        </button>
        <button
          className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm"
          onClick={() => setZoom(prev => Math.max(0.1, prev * 0.8))}
        >
          -
        </button>
        <button
          className="bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-2 shadow-sm text-xs"
          onClick={() => setZoom(1)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

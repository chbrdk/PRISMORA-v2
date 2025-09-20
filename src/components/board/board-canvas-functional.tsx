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

export function BoardCanvasFunctional({ board, prismions, connections, participants, onPrismionCreated }: BoardCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [selectedPrismionId, setSelectedPrismionId] = useState<string | null>(null);
  
  // Port drag state (from Storybook demo)
  const [portDrag, setPortDrag] = useState<{
    active: boolean;
    fromPrismionId: string | null;
    fromPort: 'top' | 'right' | 'bottom' | 'left' | null;
    start: { x: number; y: number } | null;
    current: { x: number; y: number } | null;
  }>({ active: false, fromPrismionId: null, fromPort: null, start: null, current: null });
  
  // Local state for prismions and connectors
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
      colorToken: tag === 'start-here' ? '#10b981' : '#3b82f6'
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
    revision: 1,
    kind: (() => {
      switch (dbPrismion.kind) {
        case 'PROMPT': return 'prompt';
        case 'ATTACHMENT_FILE': return 'attachment.file';
        case 'RESULT_TEXT': return 'result.text';
        case 'RESULT_RICHTEXT': return 'result.richtext';
        case 'RESULT_IMAGE': return 'result.image';
        case 'RESULT_VIDEO': return 'result.video';
        case 'RESULT_LINK': return 'result.link';
        default: return undefined;
      }
    })()
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
  const createNewPrismion = async (
    sourcePrismionId: string,
    port: 'top' | 'right' | 'bottom' | 'left',
    type: 'prompt' | 'file' | 'image' | 'video' | 'link' = 'prompt',
  ) => {
    const sourcePrismion = localPrismions[sourcePrismionId];
    if (!sourcePrismion) return;

    // Calculate position for new prismion (Storybook logic)
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
      const backendKind = type === 'prompt' ? 'PROMPT' : 'ATTACHMENT_FILE';
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
          kind: backendKind,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('✅ New prismion created:', result.prismion);
        
        // Add to local state immediately (Storybook demo logic)
        const newPrismion = convertToStoryBookPrismion(result.prismion);
        setLocalPrismions(prev => {
          let next: Record<string, Prismion> = { ...prev, [newPrismion.id]: newPrismion };
          next = resolveOverlaps(next, newPrismion.id, { maxIterations: 16, snapToGrid: 10, padding: 50 });
          return next;
        });

        // Create connector (Storybook demo logic)
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

  // Double click to create new prismion
  const handleDoubleClick = useCallback(async (e: React.MouseEvent) => {
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
        const newPrismion = convertToStoryBookPrismion(result.prismion);
        setLocalPrismions(prev => ({ ...prev, [newPrismion.id]: newPrismion }));
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
      className="w-full h-full relative overflow-hidden select-none"
      style={{ backgroundColor: canvasSettings.backgroundColor }}
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

      {/* Canvas Content */}
      <div
        className="absolute inset-0"
        style={{
          transform: `translate(${canvas.pan.x}px, ${canvas.pan.y}px) scale(${canvas.zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {/* Empty State */}
        {Object.keys(localPrismions).length === 0 && (
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
        {Object.values(localPrismions).map((prismion) => {
          const isStartHere = prismion.tags.some(tag => tag.label === 'start-here');
          const isEmpty = !prismion.prompt || prismion.prompt.trim() === '';

          return (
            <PrismionCard
              key={prismion.id}
              prismion={prismion}
              selected={selectedPrismionId === prismion.id}
              onSelect={(multiSelect) => {
                if (multiSelect) {
                  // Multi-select logic here
                } else {
                  setSelectedPrismionId(prismion.id);
                }
              }}
              onConnectorClick={(port) => {
                // This will be handled by the PrismionCard's internal ConnectorMenu
                console.log('Port clicked:', port, 'on prismion:', prismion.id);
              }}
              onConnectorCreatePrismion={(port, type) => {
                console.log('Create prismion from menu:', type, 'at port:', port);
                createNewPrismion(prismion.id, port, type);
              }}
              onConnectorDrag={(port, event) => {
                console.log('Connector drag started:', { prismionId: prismion.id, port });
                const containerRect = canvasRef.current?.getBoundingClientRect();
                if (!containerRect) return;

                // Compute start point from prismion data (center of the port on card edge)
                const p = prismion;
                let startX = p.position.x;
                let startY = p.position.y;
                switch (port) {
                  case 'top':
                    startX += p.size.w / 2;
                    startY += 0;
                    break;
                  case 'right':
                    startX += p.size.w;
                    startY += p.size.h / 2;
                    break;
                  case 'bottom':
                    startX += p.size.w / 2;
                    startY += p.size.h;
                    break;
                  case 'left':
                    startX += 0;
                    startY += p.size.h / 2;
                    break;
                }

                const moveHandler = (e: MouseEvent) => {
                  setPortDrag(prev => ({
                    ...prev,
                    active: true,
                    fromPrismionId: prismion.id,
                    fromPort: port,
                    start: { x: startX, y: startY },
                    current: { x: e.clientX - containerRect.left, y: e.clientY - containerRect.top },
                  }));
                };

                const upHandler = (e: MouseEvent) => {
                  window.removeEventListener('mousemove', moveHandler);
                  window.removeEventListener('mouseup', upHandler);

                  // Determine drop target under cursor
                  const target = document.elementFromPoint(e.clientX, e.clientY) as HTMLElement | null;
                  if (target) {
                    const prismionEl = target.closest('[data-prismion-id]') as HTMLElement | null;
                    if (prismionEl) {
                      const toPrismionId = prismionEl.getAttribute('data-prismion-id') || '';
                      if (toPrismionId && toPrismionId !== prismion.id) {
                        const rect = prismionEl.getBoundingClientRect();
                        const relX = (e.clientX - rect.left) / rect.width;
                        const relY = (e.clientY - rect.top) / rect.height;
                        let targetPort: 'top' | 'right' | 'bottom' | 'left';
                        if (relY < 0.3) targetPort = 'top';
                        else if (relY > 0.7) targetPort = 'bottom';
                        else if (relX < 0.3) targetPort = 'left';
                        else targetPort = 'right';

                        const newConnectorId = `connector-${Date.now()}`;
                        const newConnector: Connector = {
                          id: newConnectorId,
                          boardId: board.id,
                          from: { prismionId: prismion.id, port },
                          to: { prismionId: toPrismionId, port: targetPort },
                          createdBy: 'user',
                          createdAt: new Date().toISOString(),
                        };
                        setLocalConnectors(prev => ({ ...prev, [newConnectorId]: newConnector }));
                        console.log('🎯 New connector created via port drag:', newConnector);
                      }
                    }
                  }

                  setPortDrag({ active: false, fromPrismionId: null, fromPort: null, start: null, current: null });
                };

                window.addEventListener('mousemove', moveHandler);
                window.addEventListener('mouseup', upHandler);
              }}
              onMove={(position) => {
                setLocalPrismions(prev => {
                  let updated = {
                    ...prev,
                    [prismion.id]: {
                      ...prev[prismion.id],
                      position: { ...position, zIndex: prev[prismion.id].position.zIndex },
                    }
                  };
                  // Auto-collision resolve after move
                  updated = resolveOverlaps(updated, prismion.id, { maxIterations: 16, snapToGrid: 10, padding: 50 });
                  return updated;
                });
                
                // Update connector ports if needed
                setLocalConnectors(prev => {
                  const updatedConnectors = { ...prev };
                  
                  Object.values(updatedConnectors).forEach(connector => {
                    if (connector.from.prismionId === prismion.id || connector.to.prismionId === prismion.id) {
                      const fromPrismion = localPrismions[connector.from.prismionId];
                      const toPrismion = localPrismions[connector.to.prismionId];
                      
                      if (fromPrismion && toPrismion) {
                        const { fromPort, toPort } = findOptimalPorts(fromPrismion, toPrismion);
                        connector.from.port = fromPort;
                        connector.to.port = toPort;
                      }
                    }
                  });
                  
                  return updatedConnectors;
                });
              }}
              onPromptSubmit={async (prompt) => {
                // Update local state immediately
                setLocalPrismions(prev => ({
                  ...prev,
                  [prismion.id]: {
                    ...prev[prismion.id],
                    prompt,
                    state: 'active',
                    updatedAt: new Date().toISOString(),
                  }
                }));
                
                // Update via API
                try {
                  await fetch(`/api/boards/${board.shareId}/prismions/${prismion.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ prompt, state: 'active' }),
                  });
                } catch (error) {
                  console.error('Failed to update prompt:', error);
                }
              }}
              onLockToggle={async () => {
                const newState = prismion.state === 'locked' ? 'active' : 'locked';
                
                // Update local state immediately
                setLocalPrismions(prev => ({
                  ...prev,
                  [prismion.id]: {
                    ...prev[prismion.id],
                    state: newState,
                    updatedAt: new Date().toISOString(),
                  }
                }));
                
                // Update via API
                try {
                  await fetch(`/api/boards/${board.shareId}/prismions/${prismion.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ state: newState }),
                  });
                } catch (error) {
                  console.error('Failed to toggle lock:', error);
                }
              }}
              onDelete={async () => {
                // Remove from local state immediately
                setLocalPrismions(prev => {
                  const next = { ...prev };
                  delete next[prismion.id];
                  return next;
                });
                
                // Remove related connectors
                setLocalConnectors(prev => {
                  const next: Record<string, Connector> = {};
                  Object.values(prev).forEach(c => {
                    if (c.from.prismionId !== prismion.id && c.to.prismionId !== prismion.id) {
                      next[c.id] = c;
                    }
                  });
                  return next;
                });
                
                // Clear selection if deleted prismion was selected
                if (selectedPrismionId === prismion.id) {
                  setSelectedPrismionId(null);
                }
                
                // Delete via API
                try {
                  await fetch(`/api/boards/${board.shareId}/prismions/${prismion.id}`, {
                    method: 'DELETE',
                  });
                } catch (error) {
                  console.error('Failed to delete prismion:', error);
                }
              }}
              onAddTag={async (label) => {
                // Update local state immediately
                setLocalPrismions(prev => {
                  const p = prev[prismion.id];
                  if (!p) return prev;
                  const newTagId = `tag_${Date.now()}`;
                  const newTag = { id: newTagId, label, colorToken: '#3b82f6' };
                  return {
                    ...prev,
                    [prismion.id]: {
                      ...p,
                      tags: [...p.tags, newTag],
                      updatedAt: new Date().toISOString(),
                    }
                  };
                });
                
                // Update via API
                try {
                  const currentTags = prismion.tags.map(t => t.label);
                  await fetch(`/api/boards/${board.shareId}/prismions/${prismion.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tags: [...currentTags, label] }),
                  });
                } catch (error) {
                  console.error('Failed to add tag:', error);
                }
              }}
              onUpdateTag={async (tagId, label) => {
                // Update local state immediately
                setLocalPrismions(prev => {
                  const p = prev[prismion.id];
                  if (!p) return prev;
                  return {
                    ...prev,
                    [prismion.id]: {
                      ...p,
                      tags: p.tags.map(t => t.id === tagId ? { ...t, label } : t),
                      updatedAt: new Date().toISOString(),
                    }
                  };
                });
                
                // Update via API
                try {
                  const updatedTags = prismion.tags.map(t => t.id === tagId ? label : t.label);
                  await fetch(`/api/boards/${board.shareId}/prismions/${prismion.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tags: updatedTags }),
                  });
                } catch (error) {
                  console.error('Failed to update tag:', error);
                }
              }}
              onDeleteTag={async (tagId) => {
                // Update local state immediately
                setLocalPrismions(prev => {
                  const p = prev[prismion.id];
                  if (!p) return prev;
                  return {
                    ...prev,
                    [prismion.id]: {
                      ...p,
                      tags: p.tags.filter(t => t.id !== tagId),
                      updatedAt: new Date().toISOString(),
                    }
                  };
                });
                
                // Update via API
                try {
                  const remainingTags = prismion.tags.filter(t => t.id !== tagId).map(t => t.label);
                  await fetch(`/api/boards/${board.shareId}/prismions/${prismion.id}`, {
                    method: 'PATCH',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ tags: remainingTags }),
                  });
                } catch (error) {
                  console.error('Failed to delete tag:', error);
                }
              }}
              onUploadAttachment={async (file) => {
                try {
                  const form = new FormData();
                  form.append('file', file);
                  form.append('type', file.type.startsWith('image/') ? 'image' : (file.type.startsWith('video/') ? 'video' : 'file'));
                  form.append('boardId', board.id);
                  const endpoint = file.type.startsWith('image/')
                    ? '/api/uploads/image'
                    : file.type.startsWith('video/')
                    ? '/api/uploads/video'
                    : '/api/uploads';
                  const res = await fetch(endpoint, { method: 'POST', body: form });
                  if (!res.ok) throw new Error('upload failed');
                  const data = await res.json();
                  const fileUrl: string = data.url;
                  const name: string = data.name;
                  const sizeBytes: number = data.sizeBytes;

                  setLocalPrismions(prev => {
                    const current = prev[prismion.id];
                    if (!current) return prev;
                    return {
                      ...prev,
                      [prismion.id]: {
                        ...current,
                        kind: 'attachment.file',
                        content: { type: 'attachment.file', url: fileUrl, name, sizeBytes } as any,
                        updatedAt: new Date().toISOString(),
                      },
                    } as any;
                  });

                  // Persist metadata on prismion if needed
                  try {
                    await fetch(`/api/boards/${board.shareId}/prismions/${prismion.id}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ kind: 'ATTACHMENT_FILE' }),
                    });
                  } catch {}
                } catch (e) {
                  console.error('Attachment upload failed', e);
                }
              }}
              className={isStartHere && isEmpty ? 'ring-2 ring-green-400 ring-opacity-75 shadow-xl' : ''}
            />
          );
        })}

        {/* Render connectors */}
        {Object.values(localConnectors).map((connector) => (
          <ConnectorEdge
            key={connector.id}
            connector={connector}
            prismions={localPrismions}
            selectedPrismionIds={selectedPrismionId ? [selectedPrismionId] : []}
            onDirectionChange={(connectorId, newDirection) => {
              setLocalConnectors(prev => ({
                ...prev,
                [connectorId]: {
                  ...prev[connectorId],
                  // direction: newDirection
                }
              }));
              console.log(`Direction changed for connector ${connectorId}: ${newDirection}`);
            }}
            onNewConnection={(fromConnectorId, toConnectorId, optimalPort) => {
              console.log(`New connection requested: ${fromConnectorId} -> ${toConnectorId}${optimalPort ? ` on port: ${optimalPort}` : ''}`);
              
              if (optimalPort) {
                const sourceConnector = localConnectors[fromConnectorId];
                if (sourceConnector) {
                  const newConnectorId = `connector-${Date.now()}`;
                  const newConnector: Connector = {
                    id: newConnectorId,
                    boardId: board.id,
                    from: { prismionId: sourceConnector.from.prismionId, port: sourceConnector.from.port },
                    to: { prismionId: toConnectorId, port: optimalPort },
                    createdBy: 'user',
                    createdAt: new Date().toISOString(),
                  };
                  
                  setLocalConnectors(prev => ({ ...prev, [newConnectorId]: newConnector }));
                  console.log('🎯 New connector created:', newConnector);
                }
              }
            }}
          />
        ))}

        {/* Port drag preview overlay */}
        {portDrag.active && portDrag.start && portDrag.current && (
          <svg
            style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}
            viewBox={`0 0 ${canvasRef.current?.clientWidth || 0} ${canvasRef.current?.clientHeight || 0}`}
          >
            <path
              d={`M ${portDrag.start.x} ${portDrag.start.y} L ${portDrag.current.x} ${portDrag.current.y}`}
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              strokeDasharray="5,5"
              fill="none"
            />
          </svg>
        )}
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

      {/* Debug Info */}
      <div className="absolute top-4 left-4 bg-white/80 p-2 rounded text-xs">
        <div>Prismions: {Object.keys(localPrismions).length}</div>
        <div>Connectors: {Object.keys(localConnectors).length}</div>
      </div>

    </div>
  );
}

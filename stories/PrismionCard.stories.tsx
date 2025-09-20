import React from 'react';
import { PrismionCard } from '@/components/board/prismion-card';
import { Prismion, Connector } from '@/types/prismora';
import { findOptimalPorts } from '@/lib/connector-utils';
import type { Meta, StoryObj } from '@storybook/react';
import { useRef, useState } from 'react';
import { PrismionResult, PrismionResultItem } from '@/components/board/prismion-result';
import { resolveOverlaps } from '@/lib/collision-utils';

const meta: Meta<typeof PrismionCard> = {
  title: 'Board/PrismionCard',
  component: PrismionCard,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Die Hauptkomponente für Prismion-Karten. Zeigt Titel, Prompt, Tags und 4 Andockpunkte für Verbindungen.',
      },
    },
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Ob die Karte ausgewählt ist',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback wenn die Karte ausgewählt wird',
    },
    onMove: {
      action: 'moved',
      description: 'Callback wenn die Karte bewegt wird',
    },
    onResize: {
      action: 'resized',
      description: 'Callback wenn die Karte in der Größe geändert wird',
    },
    onStartConnector: {
      action: 'connector-started',
      description: 'Callback wenn ein Connector gestartet wird',
    },
    onOpenMerge: {
      action: 'merge-opened',
      description: 'Callback wenn der Merge-Drawer geöffnet wird',
    },
    onPromptSubmit: {
      action: 'prompt-submitted',
      description: 'Callback wenn ein Prompt abgeschickt wird',
    },
    onConnectorClick: {
      action: 'connector-clicked',
      description: 'Callback wenn auf einen Connector geklickt wird (erstellt neues Prismion)',
    },
    onConnectorDrag: {
      action: 'connector-dragged',
      description: 'Callback wenn ein Connector gedraggt wird (verbindet mit vorhandenem Prismion)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo Prismion
const demoPrismion: Prismion = {
  id: 'demo-prismion',
  boardId: 'demo-board',
  title: 'Ideation',
  prompt: 'Generate 10 novel directions for the topic X. Consider different perspectives and approaches.',
  colorToken: 'hsl(var(--primary))',
  tags: [
    { id: 'tag_1', label: 'ideas', colorToken: 'hsl(var(--primary))' },
    { id: 'tag_2', label: 'brainstorming', colorToken: 'hsl(var(--primary))' },
  ],
  position: { x: 0, y: 0, zIndex: 1 },
  size: { w: 320, h: 240, minW: 240, minH: 160 },
  ports: {
    top: { id: 'port_top', side: 'top', capacity: 'multi' },
    right: { id: 'port_right', side: 'right', capacity: 'multi' },
    bottom: { id: 'port_bottom', side: 'bottom', capacity: 'multi' },
    left: { id: 'port_left', side: 'left', capacity: 'multi' },
  },
  state: 'active',
  createdBy: 'user_1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  revision: 1,
};

// Initial/Empty Prismion
const initialPrismion: Prismion = {
  id: 'initial-prismion',
  boardId: 'demo-board',
  title: 'New Prismion',
  prompt: '', // Empty prompt triggers initial state
  colorToken: 'hsl(var(--primary))',
  tags: [],
  position: { x: 0, y: 0, zIndex: 1 },
  size: { w: 320, h: 240, minW: 240, minH: 160 },
  ports: {
    top: { id: 'port_top', side: 'top', capacity: 'multi' },
    right: { id: 'port_right', side: 'right', capacity: 'multi' },
    bottom: { id: 'port_bottom', side: 'bottom', capacity: 'multi' },
    left: { id: 'port_left', side: 'left', capacity: 'multi' },
  },
  state: 'draft',
  createdBy: 'user_1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  revision: 1,
};

// Functional Demo Component
function PrismionCardDemo() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [portDrag, setPortDrag] = useState<{
    active: boolean;
    fromPrismionId: string | null;
    fromPort: 'top' | 'right' | 'bottom' | 'left' | null;
    start: { x: number; y: number } | null;
    current: { x: number; y: number } | null;
  }>({ active: false, fromPrismionId: null, fromPort: null, start: null, current: null });
  const [prismions, setPrismions] = useState<Record<string, Prismion>>({
    'demo-prismion': {
      ...demoPrismion,
      position: { x: 50, y: 50, zIndex: 1 },
    },
    'demo-prismion-2': {
      ...demoPrismion,
      id: 'demo-prismion-2',
      title: 'Research',
      prompt: 'Analyze the current market trends and identify key opportunities.',
      position: { x: 400, y: 50, zIndex: 1 },
    },
    'demo-prismion-3': {
      ...demoPrismion,
      id: 'demo-prismion-3',
      title: 'Implementation',
      prompt: 'Create a detailed implementation plan with timelines and resources.',
      position: { x: 50, y: 300, zIndex: 1 },
    },
  });
  const [connectors, setConnectors] = useState<Record<string, Connector>>({
    'connector-1': {
      id: 'connector-1',
      boardId: 'demo-board',
      from: { prismionId: 'demo-prismion', port: 'right' },
      to: { prismionId: 'demo-prismion-2', port: 'left' },
      createdBy: 'user_1',
      createdAt: new Date().toISOString(),
    },
    'connector-2': {
      id: 'connector-2',
      boardId: 'demo-board',
      from: { prismionId: 'demo-prismion', port: 'bottom' },
      to: { prismionId: 'demo-prismion-3', port: 'top' },
      createdBy: 'user_1',
      createdAt: new Date().toISOString(),
    },
  });
  const [selectedPrismionId, setSelectedPrismionId] = useState<string | null>(null);
  const [autoCollisions, setAutoCollisions] = useState<boolean>(true);

  const createNewPrismion = (sourcePrismionId: string, port: 'top' | 'right' | 'bottom' | 'left') => {
    const sourcePrismion = prismions[sourcePrismionId];
    if (!sourcePrismion) {
      return;
    }

    // Calculate position for new prismion
    const offset = 200;
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

    const newId = `prismion-${Date.now()}`;
    const newPrismion: Prismion = {
      id: newId,
      boardId: 'demo-board',
      title: 'New Prismion',
      prompt: '',
      colorToken: 'prismora.blue.500',
      tags: [],
      position: { x: newX, y: newY, zIndex: 1 },
      size: { w: 300, h: 200, minW: 200, minH: 120 },
      ports: {
        top: { id: 'top', side: 'top', capacity: 'single' },
        right: { id: 'right', side: 'right', capacity: 'single' },
        bottom: { id: 'bottom', side: 'bottom', capacity: 'single' },
        left: { id: 'left', side: 'left', capacity: 'single' },
      },
      state: 'draft',
      createdBy: 'user_1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      revision: 1,
    };

    const connectorId = `connector-${Date.now()}`;
    const newConnector: Connector = {
      id: connectorId,
      boardId: 'demo-board',
      from: { prismionId: sourcePrismionId, port },
      to: { prismionId: newId, port: getOppositePort(port) },
      createdBy: 'user_1',
      createdAt: new Date().toISOString(),
    };

    setPrismions(prev => {
      let next: Record<string, Prismion> = { ...prev, [newId]: newPrismion };
      next = resolveOverlaps(next, newId, { maxIterations: 16, snapToGrid: 10, padding: 50 });
      return next;
    });
    setConnectors(prev => ({ ...prev, [connectorId]: newConnector }));
  };

  const getOppositePort = (port: 'top' | 'right' | 'bottom' | 'left'): 'top' | 'right' | 'bottom' | 'left' => {
    switch (port) {
      case 'top': return 'bottom';
      case 'right': return 'left';
      case 'bottom': return 'top';
      case 'left': return 'right';
    }
  };

  const handleConnectorClick = (prismionId: string, port: 'top' | 'right' | 'bottom' | 'left') => {
    createNewPrismion(prismionId, port);
  };

  const handlePromptSubmit = (prismionId: string, prompt: string) => {
    setPrismions(prev => ({
      ...prev,
      [prismionId]: {
        ...prev[prismionId],
        prompt,
        state: 'active',
        updatedAt: new Date().toISOString(),
      }
    }));
  };

  return (
    <div ref={containerRef} className="relative w-full h-96 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <div className="absolute inset-0 p-4">
        <div className="absolute top-2 right-2 text-xs flex items-center gap-2">
          <label className="flex items-center gap-1">
            <input type="checkbox" checked={autoCollisions} onChange={(e) => setAutoCollisions(e.target.checked)} />
            Auto collisions
          </label>
        </div>
        {Object.values(prismions).map((prismion) => (
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
            onConnectorClick={(port) => handleConnectorClick(prismion.id, port)}
            onConnectorDrag={(port, event) => {
              console.log('Connector drag started:', { prismionId: prismion.id, port });
              const containerRect = containerRef.current?.getBoundingClientRect();
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
                    if (toPrismionId) {
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
                        boardId: 'demo-board',
                        from: { prismionId: prismion.id, port },
                        to: { prismionId: toPrismionId, port: targetPort },
                        createdBy: 'user_1',
                        createdAt: new Date().toISOString(),
                      };
                      setConnectors(prev => ({ ...prev, [newConnectorId]: newConnector }));
                      console.log('🎯 New connector created via port drag:', newConnector);
                    }
                  }
                }

                setPortDrag({ active: false, fromPrismionId: null, fromPort: null, start: null, current: null });
              };

              window.addEventListener('mousemove', moveHandler);
              window.addEventListener('mouseup', upHandler);
            }}
            onConnectorDrop={(fromConnectorId, targetPort) => {
              console.log('Connector dropped:', { fromConnectorId, targetPrismionId: prismion.id, targetPort });
              
              // Find the source connector to get source prismion info
              const sourceConnector = connectors[fromConnectorId];
              if (sourceConnector) {
                const newConnectorId = `connector-${Date.now()}`;
                const newConnector: Connector = {
                  id: newConnectorId,
                  boardId: 'demo-board',
                  from: { prismionId: sourceConnector.from.prismionId, port: sourceConnector.from.port },
                  to: { prismionId: prismion.id, port: targetPort },
                  createdBy: 'user_1',
                  createdAt: new Date().toISOString(),
                };
                
                setConnectors(prev => ({ ...prev, [newConnectorId]: newConnector }));
                console.log('🎯 New connector created via drop:', newConnector);
              }
            }}
            onLockToggle={() => {
              setPrismions(prev => ({
                ...prev,
                [prismion.id]: {
                  ...prev[prismion.id],
                  state: prev[prismion.id].state === 'locked' ? 'active' : 'locked',
                  updatedAt: new Date().toISOString(),
                }
              }));
            }}
            onDelete={() => {
              setPrismions(prev => {
                const next = { ...prev };
                delete next[prismion.id];
                return next;
              });
              setConnectors(prev => {
                const next: Record<string, Connector> = {};
                Object.values(prev).forEach(c => {
                  if (c.from.prismionId !== prismion.id && c.to.prismionId !== prismion.id) {
                    next[c.id] = c;
                  }
                });
                return next;
              });
              if (selectedPrismionId === prismion.id) setSelectedPrismionId(null);
            }}
            onPromptSubmit={(prompt) => handlePromptSubmit(prismion.id, prompt)}
            onAddTag={(label) => {
              setPrismions(prev => {
                const next = { ...prev };
                const p = next[prismion.id];
                if (!p) return prev;
                const newTagId = `tag_${Date.now()}`;
                const newTag = { id: newTagId, label, colorToken: 'hsl(var(--primary))' };
                p.tags = [...p.tags, newTag];
                p.updatedAt = new Date().toISOString();
                return next;
              });
            }}
            onUpdateTag={(tagId, label) => {
              setPrismions(prev => {
                const next = { ...prev };
                const p = next[prismion.id];
                if (!p) return prev;
                p.tags = p.tags.map(t => t.id === tagId ? { ...t, label } : t);
                p.updatedAt = new Date().toISOString();
                return next;
              });
            }}
            onDeleteTag={(tagId) => {
              setPrismions(prev => {
                const next = { ...prev };
                const p = next[prismion.id];
                if (!p) return prev;
                p.tags = p.tags.filter(t => t.id !== tagId);
                p.updatedAt = new Date().toISOString();
                return next;
              });
            }}
            onBranchFromSelection={(text) => {
              const newId = `prismion-${Date.now()}`;
              const newPrismion: Prismion = {
                ...demoPrismion,
                id: newId,
                title: 'Branched Prismion',
                prompt: text,
                position: { x: prismion.position.x + 220, y: prismion.position.y, zIndex: 1 },
                state: 'active',
                updatedAt: new Date().toISOString(),
              };
              setPrismions(prev => {
                let next: Record<string, Prismion> = { ...prev, [newId]: newPrismion };
                next = resolveOverlaps(next, newId, { maxIterations: 16, snapToGrid: 10, padding: 50 });
                return next;
              });
              // optional: auto-connect
              const newConnectorId = `connector-${Date.now()}`;
              const newConnector: Connector = {
                id: newConnectorId,
                boardId: 'demo-board',
                from: { prismionId: prismion.id, port: 'right' },
                to: { prismionId: newId, port: 'left' },
                createdBy: 'user_1',
                createdAt: new Date().toISOString(),
              };
              setConnectors(prev => ({ ...prev, [newConnectorId]: newConnector }));
            }}
            onMove={(position) => {
              setPrismions(prev => {
                let updated = {
                  ...prev,
                  [prismion.id]: {
                    ...prev[prismion.id],
                    position: { ...position, zIndex: prev[prismion.id].position.zIndex },
                  }
                };
                // Auto-collision resolve after move (50px padding)
                updated = resolveOverlaps(updated, prismion.id, { maxIterations: 16, snapToGrid: 10, padding: 50 });
                return updated;
              });
              
              // Update connector ports if needed (find optimal ports for all connectors involving this prismion)
              setConnectors(prev => {
                const updatedConnectors = { ...prev };
                
                // Find all connectors that involve this prismion
                Object.values(updatedConnectors).forEach(connector => {
                  if (connector.from.prismionId === prismion.id || connector.to.prismionId === prismion.id) {
                    const fromPrismion = prismions[connector.from.prismionId];
                    const toPrismion = prismions[connector.to.prismionId];
                    
                    if (fromPrismion && toPrismion) {
                      const { fromPort, toPort } = findOptimalPorts(fromPrismion, toPrismion);
                      
                      // Update the connector with optimal ports
                      connector.from.port = fromPort;
                      connector.to.port = toPort;
                    }
                  }
                });
                
                return updatedConnectors;
              });
            }}
            onToggleCollapse={() => {
              // reuse existing collapse handling if present
            }}
            onResize={(size) => {
              setPrismions(prev => {
                const prevP = prev[prismion.id];
                const newSize = { w: size.w, h: size.h, minW: prevP.size.minW, minH: prevP.size.minH };
                let next: Record<string, Prismion> = { ...prev, [prismion.id]: { ...prevP, size: newSize } };
                next = resolveOverlaps(next, prismion.id, { maxIterations: 16, snapToGrid: 10, padding: 50 });
                return next;
              });
            }}
          />
        ))}
        
        {/* Render connectors */}
        {Object.values(connectors).map((connector) => (
          <ConnectorEdge
            key={connector.id}
            connector={connector}
            prismions={prismions}
            selectedPrismionIds={selectedPrismionId ? [selectedPrismionId] : []}
            onDirectionChange={(connectorId, newDirection) => {
              setConnectors(prev => ({
                ...prev,
                [connectorId]: {
                  ...prev[connectorId],
                  direction: newDirection
                }
              }));
              console.log(`Direction changed for connector ${connectorId}: ${newDirection}`);
            }}
            onNewConnection={(fromConnectorId, toConnectorId, optimalPort) => {
              console.log(`New connection requested: ${fromConnectorId} -> ${toConnectorId}${optimalPort ? ` on port: ${optimalPort}` : ''}`);
              
              if (optimalPort) {
                // Create new connection to prismion with optimal port
                const sourceConnector = connectors[fromConnectorId];
                if (sourceConnector) {
                  const newConnectorId = `connector-${Date.now()}`;
                  const newConnector: Connector = {
                    id: newConnectorId,
                    boardId: 'demo-board',
                    from: { prismionId: sourceConnector.from.prismionId, port: sourceConnector.from.port },
                    to: { prismionId: toConnectorId, port: optimalPort },
                    createdBy: 'user_1',
                    createdAt: new Date().toISOString(),
                  };
                  
                  setConnectors(prev => ({ ...prev, [newConnectorId]: newConnector }));
                  console.log('🎯 New connector created:', newConnector);
                }
              } else {
                // Connection between connectors (existing logic)
                alert(`New connection: ${fromConnectorId} -> ${toConnectorId}`);
              }
            }}
          />
        ))}

        {/* Port drag preview overlay */}
        {portDrag.active && portDrag.start && portDrag.current && (
          <svg
            style={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 50 }}
            viewBox={`0 0 ${containerRef.current?.clientWidth || 0} ${containerRef.current?.clientHeight || 0}`}
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
        
        {/* Debug info */}
        <div className="absolute top-2 left-2 bg-background/80 p-2 rounded text-xs">
          <div>Prismions: {Object.keys(prismions).length}</div>
          <div>Connectors: {Object.keys(connectors).length}</div>
          <div className="mt-1 text-muted-foreground">
            <div>💡 Intelligent Port Calculation:</div>
            <div>• Finds closest available ports</div>
            <div>• Prefers horizontal/vertical connections</div>
            <div>• Avoids same-side connections</div>
          </div>
          {Object.values(connectors).map((connector) => (
            <div key={connector.id} className="mt-1">
              {connector.from.prismionId} ({connector.from.port}) → {connector.to.prismionId} ({connector.to.port})
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Import ConnectorEdge for the demo
import { ConnectorEdge } from '@/components/board/connector-edge';
import { PrismionToolbar } from '@/components/board/prismion-toolbar';

export const Default: Story = {
  args: {
    prismion: demoPrismion,
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard Prismion-Karte mit Titel, Prompt und Tags. Hover zeigt Ports; Drag bewegt die Karte. Toolbar unten rechts für Aktionen; Avatar daneben. Collapse/Expand über den Pfeil im Header.',
      },
    },
  },
};

export const Selected: Story = {
  args: {
    prismion: demoPrismion,
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Ausgewählte Karte mit Ring und Resize-Handles. Drag ist außerhalb von Inputs/Content möglich; in der Content-Zone kann Text selektiert werden (kein Drag).',
      },
    },
  },
};

export const InitialState: Story = {
  args: {
    prismion: initialPrismion,
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Initialer Zustand (leerer Prompt). Zeigt kompaktes Eingabefeld mit Submit-Button. Footer/Toolbar sind ausgeblendet bis Inhalt vorhanden ist.',
      },
    },
  },
};

export const InitialStateSelected: Story = {
  args: {
    prismion: initialPrismion,
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Initialer Zustand einer ausgewählten Prismion-Karte. Zeigt Resize-Handles und bleibt sichtbar.',
      },
    },
  },
};

export const Draft: Story = {
  args: {
    prismion: {
      ...demoPrismion,
      state: 'draft',
      title: 'Draft Prismion',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Draft-State Beispiel. State-Badge wird im Header angezeigt (nicht sichtbar, wenn collapsed). Locked/Merged/Archived sind analog visuell hervorgehoben.',
      },
    },
  },
};

export const Locked: Story = {
  args: {
    prismion: {
      ...demoPrismion,
      state: 'locked',
      title: 'Locked Prismion',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Gesperrte Prismion-Karte. Zeigt den Locked-State und eingeschränkte Interaktionen.',
      },
    },
  },
};

export const WithManyTags: Story = {
  args: {
    prismion: {
      ...demoPrismion,
      tags: [
        { id: 'tag_1', label: 'ideas', colorToken: 'hsl(var(--primary))' },
        { id: 'tag_2', label: 'brainstorming', colorToken: 'hsl(var(--primary))' },
        { id: 'tag_3', label: 'research', colorToken: 'hsl(var(--primary))' },
        { id: 'tag_4', label: 'analysis', colorToken: 'hsl(var(--primary))' },
        { id: 'tag_5', label: 'insights', colorToken: 'hsl(var(--primary))' },
      ],
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Prismion mit vielen Tags. Zeigt wie Tags bei begrenztem Platz dargestellt werden.',
      },
    },
  },
};

export const LongPrompt: Story = {
  args: {
    prismion: {
      ...demoPrismion,
      title: 'Long Prompt Prismion',
      prompt: 'This is a very long prompt that demonstrates how the PrismionCard handles lengthy text content. It should wrap properly and show ellipsis when the content exceeds the available space. The prompt can contain multiple paragraphs and should maintain readability while fitting within the card boundaries.',
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Prismion mit langem Prompt. Zeigt Text-Wrapping und Ellipsis bei überlangem Inhalt.',
      },
    },
  },
};

export const BranchPrismion: Story = {
  args: {
    prismion: {
      ...demoPrismion,
      title: 'Branch Prismion',
      branchMeta: {
        parentPrismionId: 'parent-prismion',
        branchId: 'branch_1',
        participants: ['user_1', 'user_2'],
      },
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Branch-Prismion mit Branch-Metadaten. Zeigt spezielle Styling für Branch-Karten.',
      },
    },
  },
};

export const ConnectorSystem: Story = {
  args: {
    prismion: demoPrismion,
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Connector-Demo: Hover → Ports sichtbar. Klick erstellt neues Prismion; Port-Drag verbindet zu vorhandenen Karten. Linien aktualisieren intelligent und haben gerundete Ecken.',
      },
    },
  },
};

export const WithToolbar: Story = {
  render: () => (
    <div className="p-6">
      <div className="max-w-md">
        <PrismionToolbar
          onBranch={() => console.log('Branch')}
          onMerge={() => console.log('Merge')}
          onLockToggle={() => console.log('Lock Toggle')}
          onArchive={() => console.log('Archive')}
          onDelete={() => console.log('Delete')}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Toolbar (radial) mit animiertem Fan-Out. Toggle blockiert Drag. Aktionen: Branch/Merge/Lock/Archive/Delete. Z-Index und Position sind an den Button gebunden.',
      },
    },
  },
};

export const FunctionalDemo: Story = {
  render: () => <PrismionCardDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Funktionale Demo: Klicke auf die Connector-Dots um neue Prismions zu erstellen. Die neuen Prismions werden automatisch mit Verbindungslinien verknüpft. Du kannst auch Prompts eingeben und die Prismions verschieben.',
      },
    },
  },
};

export const InteractiveCard: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    const [prismion, setPrismion] = useState<Prismion>({
      ...demoPrismion,
      id: 'interactive-card',
      title: 'Interactive Prismion',
      position: { x: 80, y: 80, zIndex: 1 },
      tags: [
        { id: 't1', label: 'alpha', colorToken: 'hsl(var(--primary))' },
        { id: 't2', label: 'beta', colorToken: 'hsl(var(--primary))' },
      ],
    });

    return (
      <div className="relative w-full h-[560px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <PrismionCard
          prismion={prismion}
          selected
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(v => !v)}
          onLockToggle={() => setPrismion(p => ({ ...p, state: p.state === 'locked' ? 'active' : 'locked' }))}
          onDelete={() => alert('Delete pressed (wire to state in app)')}
          onAddTag={(label) => setPrismion(p => ({ ...p, tags: [...p.tags, { id: `tag_${Date.now()}`, label, colorToken: 'hsl(var(--primary))' }] }))}
          onUpdateTag={(id, label) => setPrismion(p => ({ ...p, tags: p.tags.map(t => t.id === id ? { ...t, label } : t) }))}
          onDeleteTag={(id) => setPrismion(p => ({ ...p, tags: p.tags.filter(t => t.id !== id) }))}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaktive Karte: Collapse/Expand, Tag-Add/Edit/Delete und Toolbar-Lock/Delete sind live verdrahtet.',
      },
    },
  },
};

export const Result_Text: Story = {
  render: () => {
    const items: PrismionResultItem[] = [{
      type: 'text',
      content: `ChatGPT Response\n\nThis is a realistic multi-paragraph result. It explains the idea in detail, provides context, and offers clear next steps. The text should wrap naturally and the card should grow vertically to accommodate the full content without clipping.\n\nFurther Considerations\n\n- Ensure accessibility (contrast, focus states).\n- Provide a copy-to-clipboard action in the future.\n- Consider a compact mode for dense boards.`,
    }];
    return (
      <div className="p-6 max-w-xl">
        <PrismionResult items={items} />
      </div>
    );
  },
};

export const Result_RichText: Story = {
  render: () => {
    const items: PrismionResultItem[] = [{ type: 'richtext', content: '<p><strong>Rich</strong> <em>formatted</em> text.</p>' }];
    return (
      <div className="p-6 max-w-xl">
        <PrismionResult items={items} />
      </div>
    );
  },
};

export const Result_Image: Story = {
  render: () => {
    const items: PrismionResultItem[] = [{ type: 'image', url: 'https://via.placeholder.com/640x360', alt: 'placeholder' }];
    return (
      <div className="p-6 max-w-xl">
        <PrismionResult items={items} />
      </div>
    );
  },
};

export const Result_Video: Story = {
  render: () => {
    const items: PrismionResultItem[] = [{ type: 'video', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' }];
    return (
      <div className="p-6 max-w-xl">
        <PrismionResult items={items} />
      </div>
    );
  },
};

export const Result_Link: Story = {
  render: () => {
    const items: PrismionResultItem[] = [{ type: 'link', url: 'https://example.com', label: 'Example.com' }];
    return (
      <div className="p-6 max-w-xl">
        <PrismionResult items={items} />
      </div>
    );
  },
};

export const Result_Combined: Story = {
  render: () => {
    const items: PrismionResultItem[] = [
      { type: 'text', content: 'Summary of results...' },
      { type: 'richtext', content: '<ul><li>Point A</li><li>Point B</li></ul>' },
      { type: 'image', url: 'https://via.placeholder.com/640x360', alt: 'placeholder' },
      { type: 'link', url: 'https://example.com', label: 'Open Link' },
    ];
    return (
      <div className="p-6 max-w-2xl">
        <PrismionResult items={items} />
      </div>
    );
  },
};

export const CardWithResults: Story = {
  render: () => {
    const prismionWithResults: Prismion = {
      ...demoPrismion,
      id: 'card-with-results',
      title: 'Card With Results',
      position: { x: 40, y: 40, zIndex: 1 },
    };
    const results: PrismionResultItem[] = [
      { type: 'text', content: 'Kurze Zusammenfassung der Ergebnisse.' },
      { type: 'image', url: 'https://via.placeholder.com/480x270', alt: 'placeholder' },
      { type: 'link', url: 'https://example.com', label: 'Mehr Details' },
    ];

    return (
      <div className="relative w-full h-[480px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <PrismionCard
          prismion={prismionWithResults}
          selected={true}
          onSelect={() => {}}
          results={results}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'PrismionCard mit `PrismionResult` Tabs unter dem Prompt. Lange Text-Results: auto-height, maxWidth 800px. Für Image/Video: `mediaSize` sm|md|lg.',
      },
    },
  },
};

export const Kind_Result_Text: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div className="relative w-full h-[520px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <PrismionCard
          prismion={{
            ...demoPrismion,
            id: 'k-result-text',
            title: 'Result: Text',
            kind: 'result.text',
            content: { type: 'result.text', text: `Einleitung\n\nDies ist ein längerer Beispieltext, der typische ChatGPT-Antworten simuliert. Er besteht aus mehreren Absätzen, nutzt Überschriften und Aufzählungen und sollte in der Karte gut lesbar dargestellt werden. Die Karte soll sich in der Höhe automatisch anpassen, bis eine maximierte Breite (z. B. 800px) erreicht ist.\n\nDetails\n\n1. Die Darstellung nutzt eine mondern lesbare Typografie.\n2. Längere Absätze umbrechen sauber, ohne horizontales Scrollen.\n3. Zwischenüberschriften strukturieren den Inhalt.\n\nFazit\n\nMit dieser Darstellung können lange Text-Results realistisch getestet und bewertet werden.` },
            position: { x: 40, y: 40, zIndex: 1 },
          }}
          selected
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(v => !v)}
        />
      </div>
    );
  },
};

export const Kind_Result_RichText: Story = {
  render: () => (
    <div className="relative w-full h-[520px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionCard
        prismion={{
          ...demoPrismion,
          id: 'k-result-rich',
          title: 'Result: RichText',
          kind: 'result.richtext',
          content: { type: 'result.richtext', html: '<h4>Überschrift</h4><p>Absatz mit <strong>Fett</strong> und <em>Kursiv</em>.</p>' },
          position: { x: 40, y: 40, zIndex: 1 },
        }}
        selected
      />
    </div>
  ),
};

export const Kind_Result_Image: Story = {
  render: () => (
    <div className="relative w-full h-[520px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionCard
        prismion={{
          ...demoPrismion,
          id: 'k-result-image',
          title: 'Result: Image',
          kind: 'result.image',
          content: { type: 'result.image', url: 'https://via.placeholder.com/640x360' },
          position: { x: 40, y: 40, zIndex: 1 },
        }}
        selected
        mediaSize="sm"
      />
    </div>
  ),
};

export const Kind_Result_Video: Story = {
  render: () => (
    <div className="relative w-full h-[520px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionCard
        prismion={{
          ...demoPrismion,
          id: 'k-result-video',
          title: 'Result: Video',
          kind: 'result.video',
          content: { type: 'result.video', url: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4' },
          position: { x: 40, y: 40, zIndex: 1 },
        }}
        selected
        mediaSize="md"
      />
    </div>
  ),
};

export const Kind_Result_Link: Story = {
  render: () => (
    <div className="relative w-full h-[520px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionCard
        prismion={{
          ...demoPrismion,
          id: 'k-result-link',
          title: 'Result: Link',
          kind: 'result.link',
          content: { type: 'result.link', url: 'https://example.com', label: 'Example.com' },
          position: { x: 40, y: 40, zIndex: 1 },
        }}
        selected
      />
    </div>
  ),
};

export const Kind_Result_Image_Large: Story = {
  render: () => (
    <div className="relative w-full h-[620px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionCard
        prismion={{
          ...demoPrismion,
          id: 'k-result-image-lg',
          title: 'Result: Image (Large)',
          kind: 'result.image',
          content: { type: 'result.image', url: 'https://via.placeholder.com/1024x576' },
          position: { x: 40, y: 40, zIndex: 1 },
        }}
        selected
        mediaSize="lg"
      />
    </div>
  ),
};

export const CollapsedHeaderOnly: Story = {
  render: () => {
    const [collapsed, setCollapsed] = useState(true);
    return (
      <div className="relative w-full h-[420px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <PrismionCard
          prismion={{
            ...demoPrismion,
            id: 'collapsed-card',
            title: 'Header Only (Collapsed)',
            position: { x: 40, y: 40, zIndex: 1 },
          }}
          selected
          collapsed={collapsed}
          onToggleCollapse={() => setCollapsed(v => !v)}
        />
      </div>
    );
  },
};

export const Kind_Attachment_File: Story = {
  render: () => (
    <div className="relative w-full h-[520px] bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionCard
        prismion={{
          ...demoPrismion,
          id: 'k-attachment-file',
          title: 'Attachment: File',
          kind: 'attachment.file',
          content: { type: 'attachment.file', url: 'https://example.com/file.pdf', name: 'file.pdf', sizeBytes: 256000 },
          position: { x: 40, y: 40, zIndex: 1 },
        }}
        selected
      />
    </div>
  ),
};

// State stories are covered earlier (Draft, Locked, etc.). Removed duplicates.

import { PrismionPorts } from '@/components/board/prismion-ports';
import { PortSide } from '@/types/prismora';
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';

const meta: Meta<typeof PrismionPorts> = {
  title: 'Board/PrismionPorts',
  component: PrismionPorts,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Die PrismionPorts Komponente zeigt die 4 Andockpunkte (Ports) einer Prismion-Karte. Beim Hover werden die Ports sichtbar, beim Klick öffnet sich ein radiales Menü.',
      },
    },
  },
  argTypes: {
    onCreatePrismion: {
      action: 'create-prismion',
      description: 'Callback wenn ein neues Prismion erstellt werden soll',
    },
    onAttachToExisting: {
      action: 'attach-to-existing',
      description: 'Callback wenn ein Attachment zu einem vorhandenen Prismion hinzugefügt werden soll',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onCreatePrismion: (type) => console.log('Create Prismion:', type),
    onAttachToExisting: (type) => console.log('Attach to existing:', type),
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard PrismionPorts mit allen 4 Ports. Hover zeigt die Ports, Klick öffnet das radiale Menü.',
      },
    },
  },
};

export const TopPort: Story = {
  args: {
    onCreatePrismion: (type) => console.log('Create Prismion:', type),
    onAttachToExisting: (type) => console.log('Attach to existing:', type),
  },
  render: () => (
    <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionPorts
        onCreatePrismion={(type) => console.log('Create Prismion:', type)}
        onAttachToExisting={(type) => console.log('Attach to existing:', type)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demo des Top-Ports. Das radiale Menü fährt nach oben aus.',
      },
    },
  },
};

export const RightPort: Story = {
  args: {
    onCreatePrismion: (type) => console.log('Create Prismion:', type),
    onAttachToExisting: (type) => console.log('Attach to existing:', type),
  },
  render: () => (
    <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionPorts
        onCreatePrismion={(type) => console.log('Create Prismion:', type)}
        onAttachToExisting={(type) => console.log('Attach to existing:', type)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demo des Right-Ports. Das radiale Menü fährt nach rechts aus.',
      },
    },
  },
};

export const BottomPort: Story = {
  args: {
    onCreatePrismion: (type) => console.log('Create Prismion:', type),
    onAttachToExisting: (type) => console.log('Attach to existing:', type),
  },
  render: () => (
    <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionPorts
        onCreatePrismion={(type) => console.log('Create Prismion:', type)}
        onAttachToExisting={(type) => console.log('Attach to existing:', type)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demo des Bottom-Ports. Das radiale Menü fährt nach unten aus.',
      },
    },
  },
};

export const LeftPort: Story = {
  args: {
    onCreatePrismion: (type) => console.log('Create Prismion:', type),
    onAttachToExisting: (type) => console.log('Attach to existing:', type),
  },
  render: () => (
    <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
      <PrismionPorts
        onCreatePrismion={(type) => console.log('Create Prismion:', type)}
        onAttachToExisting={(type) => console.log('Attach to existing:', type)}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demo des Left-Ports. Das radiale Menü fährt nach links aus.',
      },
    },
  },
};

export const AllPorts: Story = {
  args: {
    onCreatePrismion: (type) => console.log('Create Prismion:', type),
    onAttachToExisting: (type) => console.log('Attach to existing:', type),
  },
  render: () => (
    <div className="flex gap-4">
      <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <PrismionPorts
          onCreatePrismion={(type) => console.log('Create Prismion:', type)}
          onAttachToExisting={(type) => console.log('Attach to existing:', type)}
        />
      </div>
      <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <PrismionPorts
          onCreatePrismion={(type) => console.log('Create Prismion:', type)}
          onAttachToExisting={(type) => console.log('Attach to existing:', type)}
        />
      </div>
      <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <PrismionPorts
          onCreatePrismion={(type) => console.log('Create Prismion:', type)}
          onAttachToExisting={(type) => console.log('Attach to existing:', type)}
        />
      </div>
      <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <PrismionPorts
          onCreatePrismion={(type) => console.log('Create Prismion:', type)}
          onAttachToExisting={(type) => console.log('Attach to existing:', type)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Alle 4 Ports nebeneinander zum Vergleich der verschiedenen Richtungen.',
      },
    },
  },
};

export const RadialMenuActions: Story = {
  args: {
    onCreatePrismion: (type) => console.log('Create Prismion:', type),
    onAttachToExisting: (type) => console.log('Attach to existing:', type),
  },
  render: () => {
    const [logs, setLogs] = useState<string[]>([]);
    
    const addLog = (message: string) => {
      setLogs(prev => [...prev.slice(-4), `${new Date().toLocaleTimeString()}: ${message}`]);
    };

    return (
      <div className="space-y-4">
        <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
          <PrismionPorts
            onCreatePrismion={(type) => addLog(`Create Prismion: ${type}`)}
            onAttachToExisting={(type) => addLog(`Attach to existing: ${type}`)}
          />
        </div>
        <div className="bg-muted/10 p-3 rounded-lg">
          <h4 className="text-sm font-medium mb-2">Action Log:</h4>
          <div className="text-xs space-y-1">
            {logs.length === 0 ? (
              <div className="text-muted-foreground">Klicken Sie auf einen Port um Aktionen zu testen...</div>
            ) : (
              logs.map((log, i) => (
                <div key={i} className="font-mono">{log}</div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo aller verfügbaren Aktionen mit Live-Logging. Klicken Sie auf verschiedene Ports und testen Sie die Aktionen.',
      },
    },
  },
};

export const AnimationDemo: Story = {
  args: {
    onCreatePrismion: (type) => console.log('Create Prismion:', type),
    onAttachToExisting: (type) => console.log('Attach to existing:', type),
  },
  render: () => (
    <div className="space-y-4">
      <div className="relative w-32 h-32 bg-muted/20 rounded-lg border-2 border-dashed border-muted-foreground/20">
        <PrismionPorts
          onCreatePrismion={(type) => console.log('Create Prismion:', type)}
          onAttachToExisting={(type) => console.log('Attach to existing:', type)}
        />
      </div>
      <div className="text-sm text-muted-foreground">
        <p>💡 <strong>Animation Features:</strong></p>
        <ul className="mt-2 space-y-1">
          <li>• Hover-Effekte: Ports werden beim Hover sichtbar</li>
          <li>• Gestaffelte Animation: Icons erscheinen nacheinander</li>
          <li>• Port-Wechsel: Elegante Übergänge zwischen Ports</li>
          <li>• Outside-Click: Menü schließt sich beim Klicken außerhalb</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Demo der Animation-Features. Testen Sie Hover-Effekte, gestaffelte Animation und Port-Wechsel.',
      },
    },
  },
};
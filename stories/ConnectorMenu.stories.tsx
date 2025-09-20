import type { Meta, StoryObj } from '@storybook/react';
import { ConnectorMenu } from '@/components/board/connector-menu';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const meta: Meta<typeof ConnectorMenu> = {
  title: 'Board/ConnectorMenu',
  component: ConnectorMenu,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Radiales Overlay-Menü für Connector-Aktionen. Orientiert sich am Design der PrismionToolbar mit radialer Icon-Button Anordnung. Erscheint beim Klick auf Port-Buttons.',
      },
    },
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'Ob das Menü geöffnet ist',
    },
    position: {
      description: 'Position des Menüs (x, y Koordinaten)',
    },
    port: {
      control: 'select',
      options: ['top', 'right', 'bottom', 'left'],
      description: 'Port-Richtung für die Menü-Orientierung',
    },
    onClose: {
      action: 'closed',
      description: 'Callback wenn das Menü geschlossen wird',
    },
    onCreatePrismion: {
      action: 'create-prismion',
      description: 'Callback für das Erstellen neuer Prismions',
    },
    onAttachToExisting: {
      action: 'attach-to-existing',
      description: 'Callback für Attachments an bestehende Prismions',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isOpen: true,
    position: { x: 400, y: 300 },
    port: 'right',
  },
  parameters: {
    docs: {
      description: {
        story: 'Radiales Connector-Menü mit 5 Icon-Buttons im Kreis angeordnet. Zentrum-Button zum Schließen, radiale Buttons für Aktionen.',
      },
    },
  },
};

export const Centered: Story = {
  args: {
    isOpen: true,
    position: { x: 600, y: 400 },
  },
  parameters: {
    docs: {
      description: {
        story: 'Zentriert positioniertes Connector-Menü.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ x: 400, y: 300 });
    const [lastAction, setLastAction] = useState<string>('');

    const handleButtonClick = (event: React.MouseEvent) => {
      setPosition({ x: event.clientX, y: event.clientY });
      setIsOpen(true);
    };

    return (
      <div className="w-full h-screen bg-gray-50 relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold text-gray-900">
              Connector Menu Demo
            </h2>
            <p className="text-gray-600">
              Klicke auf den Button, um das radiale Connector-Menü zu öffnen
            </p>
            <Button onClick={handleButtonClick}>
              Radiales Connector-Menü öffnen
            </Button>
            {lastAction && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Letzte Aktion:</strong> {lastAction}
                </p>
              </div>
            )}
          </div>
        </div>

        <ConnectorMenu
          isOpen={isOpen}
          position={position}
          port="bottom"
          onClose={() => setIsOpen(false)}
          onCreatePrismion={(type) => {
            setLastAction(`Neues ${type} Prismion erstellt`);
            setIsOpen(false);
          }}
          onAttachToExisting={(type) => {
            setLastAction(`${type} Attachment hinzugefügt`);
            setIsOpen(false);
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interaktive Demo des radialen Connector-Menüs. Klicke auf den Button um das Menü zu öffnen - die Icon-Buttons erscheinen in radialer Anordnung mit Animation.',
      },
    },
  },
};

export const PortDirections: Story = {
  render: () => {
    const [activePort, setActivePort] = useState<string | null>(null);
    
    const portDemos = [
      { port: 'top', position: { x: 400, y: 200 }, label: 'Top Port', color: 'bg-blue-100' },
      { port: 'right', position: { x: 600, y: 300 }, label: 'Right Port', color: 'bg-green-100' },
      { port: 'bottom', position: { x: 400, y: 400 }, label: 'Bottom Port', color: 'bg-purple-100' },
      { port: 'left', position: { x: 200, y: 300 }, label: 'Left Port', color: 'bg-orange-100' },
    ];

    return (
      <div className="w-full h-screen bg-gray-50 relative">
        <div className="absolute inset-0 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Port-Richtungen Demo
          </h2>
          <p className="text-gray-600 mb-6">
            Klicke auf die Port-Buttons um zu sehen, wie das Menü in verschiedene Richtungen ausfährt.
          </p>
          <div className="grid grid-cols-2 gap-4">
            {portDemos.map((demo, index) => (
              <Button
                key={index}
                variant="outline"
                className={demo.color}
                onClick={() => setActivePort(activePort === demo.port ? null : demo.port)}
              >
                {demo.label} {activePort === demo.port ? '(Aktiv)' : ''}
              </Button>
            ))}
          </div>
        </div>

        {portDemos.map((demo, index) => (
          <ConnectorMenu
            key={index}
            isOpen={activePort === demo.port}
            position={demo.position}
            port={demo.port as any}
            onClose={() => setActivePort(null)}
            onCreatePrismion={(type) => {
              console.log(`${demo.label}: Erstelle ${type} Prismion`);
              setActivePort(null);
            }}
            onAttachToExisting={(type) => {
              console.log(`${demo.label}: Füge ${type} Attachment hinzu`);
              setActivePort(null);
            }}
          />
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo verschiedener Port-Richtungen. Jeder Port lässt das Menü in die entsprechende Richtung ausfahren - Top nach oben, Right nach rechts, etc.',
      },
    },
  },
};

export const WithCustomActions: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selectedActions, setSelectedActions] = useState<string[]>([]);

    return (
      <div className="w-full h-screen bg-gray-50 relative flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Custom Actions Demo
          </h2>
          <div className="mb-4 space-y-2">
            {selectedActions.map((action, index) => (
              <div key={index} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                ✅ {action}
              </div>
            ))}
          </div>
          <Button onClick={() => setIsOpen(true)}>
            Menü erneut öffnen
          </Button>
        </div>

        <ConnectorMenu
          isOpen={isOpen}
          position={{ x: 600, y: 400 }}
          onClose={() => setIsOpen(false)}
          onCreatePrismion={(type) => {
            setSelectedActions(prev => [...prev, `Neues ${type} Prismion erstellt`]);
            setIsOpen(false);
          }}
          onAttachToExisting={(type) => {
            setSelectedActions(prev => [...prev, `${type} Attachment hinzugefügt`]);
            setIsOpen(false);
          }}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Demo mit Tracking der ausgeführten Aktionen. Zeigt wie das Menü mit verschiedenen Callback-Funktionen interagiert.',
      },
    },
  },
};

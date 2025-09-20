import type { Meta, StoryObj } from '@storybook/react';
import { ConnectorEdge } from '@/components/board/connector-edge';
import { Connector, Prismion } from '@/types/prismora';

const meta: Meta<typeof ConnectorEdge> = {
  title: 'Board/ConnectorEdge',
  component: ConnectorEdge,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'SVG-basierte Verbindungslinien zwischen Prismions. Unterstützt Labels und verschiedene Styling-Optionen.',
      },
    },
  },
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Ob die Verbindung ausgewählt ist',
    },
    onSelect: {
      action: 'selected',
      description: 'Callback wenn die Verbindung ausgewählt wird',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Demo Prismions
const prismion1: Prismion = {
  id: 'prismion-1',
  boardId: 'demo-board',
  title: 'Source Prismion',
  prompt: 'This is the source prismion',
  colorToken: 'hsl(var(--primary))',
  tags: [],
  position: { x: 100, y: 100, zIndex: 1 },
  size: { w: 200, h: 150, minW: 150, minH: 100 },
  ports: {
    top: { id: 'port_1_top', side: 'top', capacity: 'multi' },
    right: { id: 'port_1_right', side: 'right', capacity: 'multi' },
    bottom: { id: 'port_1_bottom', side: 'bottom', capacity: 'multi' },
    left: { id: 'port_1_left', side: 'left', capacity: 'multi' },
  },
  state: 'active',
  createdBy: 'user_1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  revision: 1,
};

const prismion2: Prismion = {
  id: 'prismion-2',
  boardId: 'demo-board',
  title: 'Target Prismion',
  prompt: 'This is the target prismion',
  colorToken: 'hsl(var(--primary))',
  tags: [],
  position: { x: 400, y: 100, zIndex: 2 },
  size: { w: 200, h: 150, minW: 150, minH: 100 },
  ports: {
    top: { id: 'port_2_top', side: 'top', capacity: 'multi' },
    right: { id: 'port_2_right', side: 'right', capacity: 'multi' },
    bottom: { id: 'port_2_bottom', side: 'bottom', capacity: 'multi' },
    left: { id: 'port_2_left', side: 'left', capacity: 'multi' },
  },
  state: 'active',
  createdBy: 'user_1',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
  revision: 1,
};

const demoConnector: Connector = {
  id: 'connector-1',
  boardId: 'demo-board',
  from: { prismionId: 'prismion-1', port: 'right' },
  to: { prismionId: 'prismion-2', port: 'left' },
  label: 'leads to',
  createdBy: 'user_1',
  createdAt: '2024-01-01T00:00:00Z',
};

export const Default: Story = {
  args: {
    connector: demoConnector,
    prismions: {
      'prismion-1': prismion1,
      'prismion-2': prismion2,
    },
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard-Verbindung zwischen zwei Prismions. Zeigt eine gestrichelte Linie mit Label.',
      },
    },
  },
};

export const Selected: Story = {
  args: {
    connector: demoConnector,
    prismions: {
      'prismion-1': prismion1,
      'prismion-2': prismion2,
    },
    selected: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Ausgewählte Verbindung mit hervorgehobener Linie und ohne Strichelung.',
      },
    },
  },
};

export const WithoutLabel: Story = {
  args: {
    connector: {
      ...demoConnector,
      label: undefined,
    },
    prismions: {
      'prismion-1': prismion1,
      'prismion-2': prismion2,
    },
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Verbindung ohne Label. Zeigt nur die Linie ohne beschreibenden Text.',
      },
    },
  },
};

export const VerticalConnection: Story = {
  args: {
    connector: {
      ...demoConnector,
      from: { prismionId: 'prismion-1', port: 'bottom' },
      to: { prismionId: 'prismion-2', port: 'top' },
    },
    prismions: {
      'prismion-1': prismion1,
      'prismion-2': {
        ...prismion2,
        position: { x: 100, y: 300, zIndex: 2 },
      },
    },
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Vertikale Verbindung von oben nach unten. Zeigt wie Verbindungen in verschiedenen Richtungen dargestellt werden.',
      },
    },
  },
};

export const DiagonalConnection: Story = {
  args: {
    connector: {
      ...demoConnector,
      from: { prismionId: 'prismion-1', port: 'right' },
      to: { prismionId: 'prismion-2', port: 'bottom' },
    },
    prismions: {
      'prismion-1': prismion1,
      'prismion-2': {
        ...prismion2,
        position: { x: 400, y: 300, zIndex: 2 },
      },
    },
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Diagonale Verbindung. Zeigt wie Verbindungen zwischen verschiedenen Port-Seiten funktionieren.',
      },
    },
  },
};

export const LongLabel: Story = {
  args: {
    connector: {
      ...demoConnector,
      label: 'This is a very long label that demonstrates text wrapping',
    },
    prismions: {
      'prismion-1': prismion1,
      'prismion-2': prismion2,
    },
    selected: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Verbindung mit langem Label. Zeigt wie Labels bei begrenztem Platz dargestellt werden.',
      },
    },
  },
};

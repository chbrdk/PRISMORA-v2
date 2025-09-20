import type { Meta, StoryObj } from '@storybook/react';
import { Slider2D } from '@/components/ui/slider-2d';
import { useState } from 'react';

const meta: Meta<typeof Slider2D> = {
  title: 'UI/Slider2D',
  component: Slider2D,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ein 2D-Slider für X/Y-Ebenen mit Drag & Drop Funktionalität.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'prismora'],
      description: 'Die visuelle Variante des 2D-Sliders',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe des 2D-Sliders',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deaktiviert den 2D-Slider',
    },
    showValues: {
      control: { type: 'boolean' },
      description: 'Zeigt die aktuellen Werte an',
    },
    showGrid: {
      control: { type: 'boolean' },
      description: 'Zeigt ein Grid an',
    },
    showCenterCross: {
      control: { type: 'boolean' },
      description: 'Zeigt ein Kreuz in der Mitte an',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Position Control',
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const WithValues: Story = {
  args: {
    label: '2D Position',
    showValues: true,
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Image Position',
    helperText: 'Drag to adjust the image position',
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const WithError: Story = {
  args: {
    label: 'Camera Position',
    error: 'Position is out of bounds',
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Optimal Position',
    success: 'Position optimized successfully',
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const WithGrid: Story = {
  args: {
    label: 'Grid Position',
    showGrid: true,
    gridSize: 20,
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const WithCenterCross: Story = {
  args: {
    label: 'Centered Position',
    showCenterCross: true,
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const WithGridAndCross: Story = {
  args: {
    label: 'Full Grid',
    showGrid: true,
    showCenterCross: true,
    gridSize: 25,
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small 2D Slider',
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large 2D Slider',
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled 2D Slider',
    disabled: true,
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const PrismoraVariant: Story = {
  args: {
    label: 'PRISMORA 2D Slider',
    variant: 'prismora',
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 1, y: 1 },
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6">
      <Slider2D
        label="Default"
        variant="default"
        defaultValue={{ x: 50, y: 50 }}
        max={{ x: 100, y: 100 }}
        step={{ x: 1, y: 1 }}
      />
      <Slider2D
        label="PRISMORA"
        variant="prismora"
        defaultValue={{ x: 50, y: 50 }}
        max={{ x: 100, y: 100 }}
        step={{ x: 1, y: 1 }}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6">
      <Slider2D
        label="Small"
        size="sm"
        defaultValue={{ x: 50, y: 50 }}
        max={{ x: 100, y: 100 }}
        step={{ x: 1, y: 1 }}
      />
      <Slider2D
        label="Default"
        size="default"
        defaultValue={{ x: 50, y: 50 }}
        max={{ x: 100, y: 100 }}
        step={{ x: 1, y: 1 }}
      />
      <Slider2D
        label="Large"
        size="lg"
        defaultValue={{ x: 50, y: 50 }}
        max={{ x: 100, y: 100 }}
        step={{ x: 1, y: 1 }}
      />
    </div>
  ),
};

export const CustomValueFormatter: Story = {
  args: {
    label: 'Custom Position',
    showValues: true,
    valueFormatter: (value) => `X: ${value.x.toFixed(1)}, Y: ${value.y.toFixed(1)}`,
    defaultValue: { x: 50, y: 50 },
    max: { x: 100, y: 100 },
    step: { x: 0.5, y: 0.5 },
  },
};

export const CustomRange: Story = {
  args: {
    label: 'Custom Range',
    showValues: true,
    defaultValue: { x: 0, y: 0 },
    min: { x: -100, y: -100 },
    max: { x: 100, y: 100 },
    step: { x: 5, y: 5 },
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState({ x: 50, y: 50 });
    
    return (
      <div className="space-y-4">
        <Slider2D
          label="Controlled 2D Slider"
          value={value}
          onValueChange={setValue}
          max={{ x: 100, y: 100 }}
          step={{ x: 1, y: 1 }}
          showValues={true}
        />
        <p className="text-sm text-muted-foreground">
          Current position: X: {value.x}, Y: {value.y}
        </p>
      </div>
    );
  },
};

export const Multiple2DSliders: Story = {
  render: () => (
    <div className="space-y-8">
      <Slider2D
        label="Camera Position"
        defaultValue={{ x: 50, y: 50 }}
        max={{ x: 100, y: 100 }}
        step={{ x: 1, y: 1 }}
        showGrid={true}
        showValues={true}
      />
      <Slider2D
        label="Image Crop"
        defaultValue={{ x: 25, y: 75 }}
        max={{ x: 100, y: 100 }}
        step={{ x: 1, y: 1 }}
        showCenterCross={true}
        showValues={true}
      />
    </div>
  ),
};

export const GameControllerExample: Story = {
  render: () => (
    <div className="space-y-6">
      <Slider2D
        label="Joystick Control"
        defaultValue={{ x: 50, y: 50 }}
        max={{ x: 100, y: 100 }}
        step={{ x: 1, y: 1 }}
        showGrid={true}
        showCenterCross={true}
        showValues={true}
        helperText="Move the joystick to control direction"
      />
      <Slider2D
        label="Mouse Sensitivity"
        defaultValue={{ x: 30, y: 70 }}
        max={{ x: 100, y: 100 }}
        step={{ x: 1, y: 1 }}
        showGrid={true}
        showValues={true}
        helperText="Adjust X and Y sensitivity"
      />
    </div>
  ),
};

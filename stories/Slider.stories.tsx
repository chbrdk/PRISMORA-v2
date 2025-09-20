import type { Meta, StoryObj } from '@storybook/react';
import { Slider } from '@/components/ui/slider';
import { useState } from 'react';

const meta: Meta<typeof Slider> = {
  title: 'UI/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine vielseitige Slider-Komponente mit verschiedenen Varianten, Größen und Orientierungen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'prismora'],
      description: 'Die visuelle Variante des Sliders',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe des Sliders',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Die Orientierung des Sliders',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deaktiviert den Slider',
    },
    showValue: {
      control: { type: 'boolean' },
      description: 'Zeigt den aktuellen Wert an',
    },
    showMarks: {
      control: { type: 'boolean' },
      description: 'Zeigt Markierungen an',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Volume',
    defaultValue: [75],
    max: 100,
    step: 1,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Brightness',
    showValue: true,
    defaultValue: [60],
    max: 100,
    step: 1,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Temperature',
    helperText: 'Adjust the temperature setting',
    defaultValue: [20],
    min: 0,
    max: 40,
    step: 1,
  },
};

export const WithError: Story = {
  args: {
    label: 'Speed',
    error: 'Speed is too high',
    defaultValue: [90],
    max: 100,
    step: 1,
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Quality',
    success: 'Optimal quality selected',
    defaultValue: [85],
    max: 100,
    step: 1,
  },
};

export const WithMarks: Story = {
  args: {
    label: 'Size',
    showMarks: true,
    defaultValue: [3],
    min: 1,
    max: 10,
    step: 1,
  },
};

export const CustomMarks: Story = {
  args: {
    label: 'Priority',
    showMarks: true,
    marks: [1, 3, 5, 7, 9],
    defaultValue: [5],
    min: 1,
    max: 10,
    step: 1,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Slider',
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Slider',
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Slider',
    disabled: true,
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const PrismoraVariant: Story = {
  args: {
    label: 'PRISMORA Slider',
    variant: 'prismora',
    defaultValue: [50],
    max: 100,
    step: 1,
  },
};

export const Vertical: Story = {
  render: () => (
    <div className="h-64 flex items-center justify-center">
      <Slider
        label="Vertical Slider"
        orientation="vertical"
        defaultValue={[50]}
        max={100}
        step={1}
        className="h-48"
      />
    </div>
  ),
};

export const VerticalWithValue: Story = {
  render: () => (
    <div className="h-64 flex items-center justify-center">
      <Slider
        label="Vertical Slider"
        orientation="vertical"
        showValue={true}
        defaultValue={[50]}
        max={100}
        step={1}
        className="h-48"
      />
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Slider
        label="Default"
        variant="default"
        defaultValue={[50]}
        max={100}
        step={1}
      />
      <Slider
        label="PRISMORA"
        variant="prismora"
        defaultValue={[50]}
        max={100}
        step={1}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Slider
        label="Small"
        size="sm"
        defaultValue={[50]}
        max={100}
        step={1}
      />
      <Slider
        label="Default"
        size="default"
        defaultValue={[50]}
        max={100}
        step={1}
      />
      <Slider
        label="Large"
        size="lg"
        defaultValue={[50]}
        max={100}
        step={1}
      />
    </div>
  ),
};

export const CustomValueFormatter: Story = {
  args: {
    label: 'Temperature (°C)',
    showValue: true,
    valueFormatter: (value) => `${value}°C`,
    defaultValue: [20],
    min: -10,
    max: 40,
    step: 1,
  },
};

export const PercentageFormatter: Story = {
  args: {
    label: 'Progress',
    showValue: true,
    valueFormatter: (value) => `${value}%`,
    defaultValue: [75],
    max: 100,
    step: 1,
  },
};

export const CurrencyFormatter: Story = {
  args: {
    label: 'Price',
    showValue: true,
    valueFormatter: (value) => `$${value}`,
    defaultValue: [50],
    min: 0,
    max: 200,
    step: 5,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([50]);
    
    return (
      <div className="space-y-4 w-80">
        <Slider
          label="Controlled Slider"
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          showValue={true}
        />
        <p className="text-sm text-muted-foreground">
          Current value: {value[0]}
        </p>
      </div>
    );
  },
};

export const MultipleSliders: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Slider
        label="Volume"
        defaultValue={[75]}
        max={100}
        step={1}
        showValue={true}
      />
      <Slider
        label="Bass"
        defaultValue={[60]}
        max={100}
        step={1}
        showValue={true}
      />
      <Slider
        label="Treble"
        defaultValue={[40]}
        max={100}
        step={1}
        showValue={true}
      />
    </div>
  ),
};

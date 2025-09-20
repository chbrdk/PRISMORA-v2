import type { Meta, StoryObj } from '@storybook/react';
import { RangeSlider } from '@/components/ui/range-slider';
import { useState } from 'react';

const meta: Meta<typeof RangeSlider> = {
  title: 'UI/RangeSlider',
  component: RangeSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ein Range-Slider mit zwei Thumbs für Wertebereiche.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'prismora'],
      description: 'Die visuelle Variante des Range-Sliders',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe des Range-Sliders',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deaktiviert den Range-Slider',
    },
    showValues: {
      control: { type: 'boolean' },
      description: 'Zeigt die aktuellen Werte an',
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
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Price Range',
    defaultValue: [20, 80],
    max: 100,
    step: 1,
  },
};

export const WithValues: Story = {
  args: {
    label: 'Age Range',
    showValues: true,
    defaultValue: [18, 65],
    min: 0,
    max: 100,
    step: 1,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Temperature Range',
    helperText: 'Select your preferred temperature range',
    defaultValue: [15, 25],
    min: 0,
    max: 40,
    step: 1,
  },
};

export const WithError: Story = {
  args: {
    label: 'Speed Range',
    error: 'Speed range is invalid',
    defaultValue: [30, 90],
    max: 100,
    step: 1,
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Quality Range',
    success: 'Optimal quality range selected',
    defaultValue: [70, 95],
    max: 100,
    step: 1,
  },
};

export const WithMarks: Story = {
  args: {
    label: 'Size Range',
    showMarks: true,
    defaultValue: [2, 8],
    min: 1,
    max: 10,
    step: 1,
  },
};

export const CustomMarks: Story = {
  args: {
    label: 'Priority Range',
    showMarks: true,
    marks: [1, 3, 5, 7, 9],
    defaultValue: [3, 7],
    min: 1,
    max: 10,
    step: 1,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Range Slider',
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Range Slider',
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Range Slider',
    disabled: true,
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
};

export const PrismoraVariant: Story = {
  args: {
    label: 'PRISMORA Range Slider',
    variant: 'prismora',
    defaultValue: [25, 75],
    max: 100,
    step: 1,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <RangeSlider
        label="Default"
        variant="default"
        defaultValue={[25, 75]}
        max={100}
        step={1}
      />
      <RangeSlider
        label="PRISMORA"
        variant="prismora"
        defaultValue={[25, 75]}
        max={100}
        step={1}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <RangeSlider
        label="Small"
        size="sm"
        defaultValue={[25, 75]}
        max={100}
        step={1}
      />
      <RangeSlider
        label="Default"
        size="default"
        defaultValue={[25, 75]}
        max={100}
        step={1}
      />
      <RangeSlider
        label="Large"
        size="lg"
        defaultValue={[25, 75]}
        max={100}
        step={1}
      />
    </div>
  ),
};

export const CustomValueFormatter: Story = {
  args: {
    label: 'Temperature Range (°C)',
    showValues: true,
    valueFormatter: (value) => `${value}°C`,
    defaultValue: [15, 25],
    min: -10,
    max: 40,
    step: 1,
  },
};

export const CurrencyFormatter: Story = {
  args: {
    label: 'Price Range',
    showValues: true,
    valueFormatter: (value) => `$${value}`,
    defaultValue: [50, 150],
    min: 0,
    max: 300,
    step: 5,
  },
};

export const PercentageFormatter: Story = {
  args: {
    label: 'Discount Range',
    showValues: true,
    valueFormatter: (value) => `${value}%`,
    defaultValue: [10, 30],
    max: 50,
    step: 1,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState([25, 75]);
    
    return (
      <div className="space-y-4 w-80">
        <RangeSlider
          label="Controlled Range Slider"
          value={value}
          onValueChange={setValue}
          max={100}
          step={1}
          showValues={true}
        />
        <p className="text-sm text-muted-foreground">
          Current range: {value[0]} - {value[1]}
        </p>
      </div>
    );
  },
};

export const MultipleRangeSliders: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <RangeSlider
        label="Volume Range"
        defaultValue={[20, 80]}
        max={100}
        step={1}
        showValues={true}
      />
      <RangeSlider
        label="Bass Range"
        defaultValue={[30, 70]}
        max={100}
        step={1}
        showValues={true}
      />
      <RangeSlider
        label="Treble Range"
        defaultValue={[40, 90]}
        max={100}
        step={1}
        showValues={true}
      />
    </div>
  ),
};

export const PriceRangeExample: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <RangeSlider
        label="Product Price Range"
        defaultValue={[50, 200]}
        min={0}
        max={500}
        step={5}
        showValues={true}
        valueFormatter={(value) => `$${value}`}
        helperText="Select your budget range"
      />
      <RangeSlider
        label="Discount Range"
        defaultValue={[10, 25]}
        min={0}
        max={50}
        step={1}
        showValues={true}
        valueFormatter={(value) => `${value}%`}
        helperText="Select discount percentage range"
      />
    </div>
  ),
};

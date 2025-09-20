import type { Meta, StoryObj } from '@storybook/react';
import { ZoomSlider } from '@/components/ui/zoom-slider';
import { useState } from 'react';

const meta: Meta<typeof ZoomSlider> = {
  title: 'UI/ZoomSlider',
  component: ZoomSlider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Ein spezialisierter Zoom-Slider mit logarithmischer Skala und Zoom-Funktionalitäten.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'prismora', 'compact'],
      description: 'Die visuelle Variante des Zoom-Sliders',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe des Zoom-Sliders',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deaktiviert den Zoom-Slider',
    },
    showValue: {
      control: { type: 'boolean' },
      description: 'Zeigt den aktuellen Wert an',
    },
    showZoomButtons: {
      control: { type: 'boolean' },
      description: 'Zeigt Zoom-Buttons an',
    },
    showMarks: {
      control: { type: 'boolean' },
      description: 'Zeigt Markierungen an',
    },
    logarithmic: {
      control: { type: 'boolean' },
      description: 'Verwendet logarithmische Skala',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Zoom Level',
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const WithValue: Story = {
  args: {
    label: 'Zoom Level',
    showValue: true,
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Image Zoom',
    helperText: 'Adjust the zoom level of the image',
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const WithError: Story = {
  args: {
    label: 'Zoom Level',
    error: 'Zoom level is too high',
    defaultValue: 8,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Optimal Zoom',
    success: 'Optimal zoom level selected',
    defaultValue: 1.5,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const WithMarks: Story = {
  args: {
    label: 'Zoom Level',
    showMarks: true,
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const WithZoomButtons: Story = {
  args: {
    label: 'Zoom Control',
    showZoomButtons: true,
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const WithMarksAndButtons: Story = {
  args: {
    label: 'Full Zoom Control',
    showMarks: true,
    showZoomButtons: true,
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Zoom Slider',
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Zoom Slider',
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    label: 'Compact Zoom',
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Zoom Slider',
    disabled: true,
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const PrismoraVariant: Story = {
  args: {
    label: 'PRISMORA Zoom Slider',
    variant: 'prismora',
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ZoomSlider
        label="Default"
        variant="default"
        defaultValue={1}
        min={0.1}
        max={10}
        step={0.1}
      />
      <ZoomSlider
        label="PRISMORA"
        variant="prismora"
        defaultValue={1}
        min={0.1}
        max={10}
        step={0.1}
      />
      <ZoomSlider
        label="Compact"
        variant="compact"
        defaultValue={1}
        min={0.1}
        max={10}
        step={0.1}
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <ZoomSlider
        label="Small"
        size="sm"
        defaultValue={1}
        min={0.1}
        max={10}
        step={0.1}
      />
      <ZoomSlider
        label="Default"
        size="default"
        defaultValue={1}
        min={0.1}
        max={10}
        step={0.1}
      />
      <ZoomSlider
        label="Large"
        size="lg"
        defaultValue={1}
        min={0.1}
        max={10}
        step={0.1}
      />
    </div>
  ),
};

export const CustomValueFormatter: Story = {
  args: {
    label: 'Custom Zoom',
    showValue: true,
    formatValue: (value) => `${(value * 100).toFixed(0)}% Zoom`,
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.1,
  },
};

export const LinearScale: Story = {
  args: {
    label: 'Linear Zoom',
    showValue: true,
    logarithmic: false,
    defaultValue: 5,
    min: 0,
    max: 10,
    step: 0.5,
  },
};

export const LogarithmicScale: Story = {
  args: {
    label: 'Logarithmic Zoom',
    showValue: true,
    logarithmic: true,
    defaultValue: 1,
    min: 0.1,
    max: 10,
    step: 0.01,
  },
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(1);
    
    return (
      <div className="space-y-4 w-80">
        <ZoomSlider
          label="Controlled Zoom Slider"
          value={value}
          onValueChange={setValue}
          min={0.1}
          max={10}
          step={0.1}
          showValue={true}
        />
        <p className="text-sm text-muted-foreground">
          Current zoom: {(value * 100).toFixed(0)}%
        </p>
      </div>
    );
  },
};

export const MultipleZoomSliders: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <ZoomSlider
        label="Image Zoom"
        defaultValue={1}
        min={0.1}
        max={10}
        step={0.1}
        showValue={true}
        showZoomButtons={true}
      />
      <ZoomSlider
        label="Text Zoom"
        defaultValue={1}
        min={0.5}
        max={3}
        step={0.1}
        showValue={true}
        showZoomButtons={true}
      />
      <ZoomSlider
        label="Map Zoom"
        defaultValue={1}
        min={0.1}
        max={20}
        step={0.1}
        showValue={true}
        showMarks={true}
      />
    </div>
  ),
};

export const ImageViewerExample: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <ZoomSlider
        label="Image Zoom Control"
        defaultValue={1}
        min={0.1}
        max={10}
        step={0.1}
        showValue={true}
        showZoomButtons={true}
        showMarks={true}
        helperText="Use the slider or buttons to zoom in/out"
      />
      <div className="bg-muted p-4 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">
          Image preview area
        </p>
        <p className="text-xs text-muted-foreground mt-2">
          Zoom level affects the displayed image
        </p>
      </div>
    </div>
  ),
};

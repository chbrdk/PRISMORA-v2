import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Divider } from '@/components/ui/divider';

const meta: Meta<typeof Divider> = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine Divider-Komponente für visuelle Trennung von Inhalten mit verschiedenen Varianten und Orientierungen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'muted', 'prismora', 'dashed', 'dotted'],
      description: 'Die visuelle Variante des Dividers',
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'Die Orientierung des Dividers',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Die Größe des Dividers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Content Above</h3>
        <p className="text-muted-foreground">Some content here</p>
      </div>
      <Divider />
      <div className="text-center">
        <h3 className="text-lg font-semibold mb-2">Content Below</h3>
        <p className="text-muted-foreground">More content here</p>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Default Variant</h3>
        <div className="space-y-2">
          <p>Content above</p>
          <Divider variant="default" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Muted Variant</h3>
        <div className="space-y-2">
          <p>Content above</p>
          <Divider variant="muted" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">PRISMORA Variant</h3>
        <div className="space-y-2">
          <p>Content above</p>
          <Divider variant="prismora" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Dashed Variant</h3>
        <div className="space-y-2">
          <p>Content above</p>
          <Divider variant="dashed" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Dotted Variant</h3>
        <div className="space-y-2">
          <p>Content above</p>
          <Divider variant="dotted" />
          <p>Content below</p>
        </div>
      </div>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Size</h3>
        <div className="space-y-2">
          <p>Content above</p>
          <Divider size="sm" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Size (Default)</h3>
        <div className="space-y-2">
          <p>Content above</p>
          <Divider size="md" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Size</h3>
        <div className="space-y-2">
          <p>Content above</p>
          <Divider size="lg" />
          <p>Content below</p>
        </div>
      </div>
    </div>
  ),
};

export const Orientations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal (Default)</h3>
        <div className="space-y-2">
          <p>Content above</p>
          <Divider orientation="horizontal" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical</h3>
        <div className="flex items-center gap-4 h-20">
          <p>Content left</p>
          <Divider orientation="vertical" />
          <p>Content right</p>
        </div>
      </div>
    </div>
  ),
};

export const WithLabels: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Center Label (Default)</h3>
        <Divider label="oder" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Start Label</h3>
        <Divider label="Trennung" labelPosition="start" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">End Label</h3>
        <Divider label="Ende" labelPosition="end" />
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Different Variants with Labels</h3>
        <div className="space-y-4">
          <Divider label="PRISMORA" variant="prismora" />
          <Divider label="Dashed" variant="dashed" />
          <Divider label="Dotted" variant="dotted" />
        </div>
      </div>
    </div>
  ),
};

export const Spacing: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">No Spacing</h3>
        <div className="space-y-0">
          <p>Content above</p>
          <Divider spacing="none" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Extra Small Spacing</h3>
        <div className="space-y-0">
          <p>Content above</p>
          <Divider spacing="xs" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Small Spacing</h3>
        <div className="space-y-0">
          <p>Content above</p>
          <Divider spacing="sm" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Medium Spacing (Default)</h3>
        <div className="space-y-0">
          <p>Content above</p>
          <Divider spacing="md" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Large Spacing</h3>
        <div className="space-y-0">
          <p>Content above</p>
          <Divider spacing="lg" />
          <p>Content below</p>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Extra Large Spacing</h3>
        <div className="space-y-0">
          <p>Content above</p>
          <Divider spacing="xl" />
          <p>Content below</p>
        </div>
      </div>
    </div>
  ),
};

export const InForms: Story = {
  render: () => (
    <div className="max-w-md space-y-4">
      <h3 className="text-lg font-semibold">Form Sections</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Personal Information</label>
          <input 
            type="text" 
            placeholder="Name" 
            className="w-full p-2 border rounded"
          />
        </div>
        
        <Divider label="oder" />
        
        <div>
          <label className="block text-sm font-medium mb-2">Contact Information</label>
          <input 
            type="email" 
            placeholder="Email" 
            className="w-full p-2 border rounded"
          />
        </div>
        
        <Divider variant="dashed" />
        
        <div>
          <label className="block text-sm font-medium mb-2">Additional Information</label>
          <textarea 
            placeholder="Notes" 
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
      </div>
    </div>
  ),
};

export const InCards: Story = {
  render: () => (
    <div className="max-w-lg space-y-6">
      <div className="p-6 border rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Card Header</h3>
        <p className="text-muted-foreground mb-4">Some introductory content here.</p>
        
        <Divider />
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Card Content</h4>
          <p className="text-muted-foreground">Main content section with more details.</p>
        </div>
        
        <Divider variant="muted" />
        
        <div className="mt-4">
          <h4 className="font-medium mb-2">Card Footer</h4>
          <p className="text-muted-foreground">Footer content or actions.</p>
        </div>
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [variant, setVariant] = React.useState<'default' | 'muted' | 'prismora' | 'dashed' | 'dotted'>('default');
    const [size, setSize] = React.useState<'sm' | 'md' | 'lg'>('md');
    const [label, setLabel] = React.useState('Trennung');
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Variant</label>
            <select 
              value={variant} 
              onChange={(e) => setVariant(e.target.value as any)}
              className="p-2 border rounded"
            >
              <option value="default">Default</option>
              <option value="muted">Muted</option>
              <option value="prismora">PRISMORA</option>
              <option value="dashed">Dashed</option>
              <option value="dotted">Dotted</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <select 
              value={size} 
              onChange={(e) => setSize(e.target.value as any)}
              className="p-2 border rounded"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Label</label>
            <input 
              type="text" 
              value={label} 
              onChange={(e) => setLabel(e.target.value)}
              className="p-2 border rounded"
              placeholder="Enter label"
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <p>Content above</p>
          <Divider 
            variant={variant} 
            size={size} 
            label={label || undefined}
          />
          <p>Content below</p>
        </div>
      </div>
    );
  },
};

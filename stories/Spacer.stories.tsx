import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Spacer } from '@/components/ui/spacer';
import { Card, CardContent } from '@/components/ui/card';

const meta: Meta<typeof Spacer> = {
  title: 'Layout/Spacer',
  component: Spacer,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine Spacer-Komponente für flexible Abstände in Layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl'],
      description: 'Die Größe des Spacers',
    },
    axis: {
      control: { type: 'select' },
      options: ['x', 'y', 'both'],
      description: 'Die Achse des Spacers',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div className="flex items-center">
      <Card>
        <CardContent className="p-4">Card 1</CardContent>
      </Card>
      <Spacer />
      <Card>
        <CardContent className="p-4">Card 2</CardContent>
      </Card>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer size="xs" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
      
      <div className="flex items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer size="sm" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
      
      <div className="flex items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer size="md" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
      
      <div className="flex items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer size="lg" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
      
      <div className="flex items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer size="xl" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const Axes: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">X-Axis (Horizontal)</h3>
        <div className="flex items-center">
          <Card>
            <CardContent className="p-4">Left</CardContent>
          </Card>
          <Spacer axis="x" size="lg" />
          <Card>
            <CardContent className="p-4">Right</CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Y-Axis (Vertical)</h3>
        <div className="flex flex-col">
          <Card>
            <CardContent className="p-4">Top</CardContent>
          </Card>
          <Spacer axis="y" size="lg" />
          <Card>
            <CardContent className="p-4">Bottom</CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Both Axes</h3>
        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardContent className="p-4">Top Left</CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">Top Right</CardContent>
          </Card>
          <Spacer axis="both" size="lg" />
          <Card>
            <CardContent className="p-4">Bottom Left</CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">Bottom Right</CardContent>
          </Card>
        </div>
      </div>
    </div>
  ),
};

export const CustomWidth: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer width="100px" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
      
      <div className="flex items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer width="200px" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
      
      <div className="flex items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer width="50%" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const CustomHeight: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-col">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer height="50px" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer height="100px" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer height="200px" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const Responsive: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer responsive="mobile" size="lg" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
      
      <div className="flex flex-col md:flex-row items-center">
        <Card>
          <CardContent className="p-4">Card 1</CardContent>
        </Card>
        <Spacer responsive="tablet" size="xl" />
        <Card>
          <CardContent className="p-4">Card 2</CardContent>
        </Card>
      </div>
    </div>
  ),
};

export const InLayout: Story = {
  render: () => (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Header</h1>
        <Spacer />
        <button className="px-4 py-2 bg-blue-500 text-white rounded">Action</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Section 1</h3>
            <p className="text-muted-foreground">Content for section 1</p>
          </CardContent>
        </Card>
        
        <Spacer responsive="desktop" />
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Section 2</h3>
            <p className="text-muted-foreground">Content for section 2</p>
          </CardContent>
        </Card>
        
        <Spacer responsive="desktop" />
        
        <Card>
          <CardContent className="p-4">
            <h3 className="font-semibold mb-2">Section 3</h3>
            <p className="text-muted-foreground">Content for section 3</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex items-center">
        <span className="text-sm text-muted-foreground">Footer</span>
        <Spacer />
        <span className="text-sm text-muted-foreground">© 2024</span>
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [size, setSize] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
    const [axis, setAxis] = React.useState<'x' | 'y' | 'both'>('x');
    const [customWidth, setCustomWidth] = React.useState('100px');
    const [customHeight, setCustomHeight] = React.useState('50px');
    
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Size</label>
            <select 
              value={size} 
              onChange={(e) => setSize(e.target.value as any)}
              className="p-2 border rounded"
            >
              <option value="xs">Extra Small</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Axis</label>
            <select 
              value={axis} 
              onChange={(e) => setAxis(e.target.value as any)}
              className="p-2 border rounded"
            >
              <option value="x">X (Horizontal)</option>
              <option value="y">Y (Vertical)</option>
              <option value="both">Both</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Custom Width</label>
            <input 
              type="text" 
              value={customWidth} 
              onChange={(e) => setCustomWidth(e.target.value)}
              className="p-2 border rounded w-24"
              placeholder="100px"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Custom Height</label>
            <input 
              type="text" 
              value={customHeight} 
              onChange={(e) => setCustomHeight(e.target.value)}
              className="p-2 border rounded w-24"
              placeholder="50px"
            />
          </div>
        </div>
        
        <div className={axis === 'y' ? 'flex flex-col' : 'flex items-center'}>
          <Card>
            <CardContent className="p-4">Card 1</CardContent>
          </Card>
          <Spacer 
            size={size} 
            axis={axis}
            width={axis === 'x' || axis === 'both' ? customWidth : undefined}
            height={axis === 'y' || axis === 'both' ? customHeight : undefined}
          />
          <Card>
            <CardContent className="p-4">Card 2</CardContent>
          </Card>
        </div>
      </div>
    );
  },
};

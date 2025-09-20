import type { Meta, StoryObj } from '@storybook/react';
import { Container } from '@/components/ui/container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const meta: Meta<typeof Container> = {
  title: 'Layout/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Eine responsive Container-Komponente für Layout-Management mit verschiedenen Größen und Padding-Optionen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'fluid', 'narrow', 'wide', 'full'],
      description: 'Die Container-Variante',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'],
      description: 'Die maximale Breite des Containers',
    },
    padding: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Das horizontale Padding',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Standard Container</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dies ist ein Standard-Container mit mittlerer Breite und Padding.</p>
          </CardContent>
        </Card>
      </div>
    ),
  },
};

export const Narrow: Story = {
  args: {
    variant: 'narrow',
    children: (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Schmaler Container</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dies ist ein schmaler Container für fokussierte Inhalte.</p>
          </CardContent>
        </Card>
      </div>
    ),
  },
};

export const Wide: Story = {
  args: {
    variant: 'wide',
    children: (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Breiter Container</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dies ist ein breiter Container für umfangreiche Inhalte.</p>
          </CardContent>
        </Card>
      </div>
    ),
  },
};

export const Fluid: Story = {
  args: {
    variant: 'fluid',
    children: (
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Fluid Container</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Dies ist ein fluid Container ohne Padding für volle Breite.</p>
          </CardContent>
        </Card>
      </div>
    ),
  },
};

export const CustomSizes: Story = {
  render: () => (
    <div className="space-y-8">
      {(['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl'] as const).map((size) => (
        <Container key={size} size={size} className="border-2 border-dashed border-gray-300 p-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Size: {size}</h3>
            <p className="text-sm text-muted-foreground">
              Maximale Breite: {size === 'sm' ? '384px' : 
                              size === 'md' ? '448px' : 
                              size === 'lg' ? '512px' : 
                              size === 'xl' ? '576px' : 
                              size === '2xl' ? '672px' : 
                              size === '3xl' ? '768px' : 
                              size === '4xl' ? '896px' : 
                              size === '5xl' ? '1024px' : 
                              size === '6xl' ? '1152px' : '1280px'}
            </p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const PaddingVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(['none', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((padding) => (
        <Container key={padding} padding={padding} className="border-2 border-dashed border-gray-300">
          <div className="bg-gray-100 p-4 text-center">
            <h3 className="text-lg font-semibold mb-2">Padding: {padding}</h3>
            <p className="text-sm text-muted-foreground">
              Horizontales Padding: {padding === 'none' ? '0' : 
                                   padding === 'sm' ? '8px' : 
                                   padding === 'md' ? '16px' : 
                                   padding === 'lg' ? '24px' : 
                                   padding === 'xl' ? '32px' : '48px'}
            </p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

export const ResponsiveExample: Story = {
  render: () => (
    <Container className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Responsive Container</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-blue-100 p-4 rounded">
              <h4 className="font-semibold">Mobile</h4>
              <p className="text-sm">Volle Breite auf kleinen Bildschirmen</p>
            </div>
            <div className="bg-green-100 p-4 rounded">
              <h4 className="font-semibold">Tablet</h4>
              <p className="text-sm">Angepasste Breite auf mittleren Bildschirmen</p>
            </div>
            <div className="bg-purple-100 p-4 rounded">
              <h4 className="font-semibold">Desktop</h4>
              <p className="text-sm">Optimale Breite auf großen Bildschirmen</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Container>
  ),
};

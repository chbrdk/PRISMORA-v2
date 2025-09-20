import type { Meta, StoryObj } from '@storybook/react';
import { Grid, GridItem } from '@/components/ui/grid';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const meta: Meta<typeof Grid> = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine flexible Grid-Komponente für CSS Grid Layouts mit verschiedenen Spalten, Abständen und Ausrichtungen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    cols: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
      description: 'Anzahl der Spalten',
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Abstand zwischen Grid-Items',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Vertikale Ausrichtung',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Horizontale Ausrichtung',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const GridItemExample = ({ title, color }: { title: string; color: string }) => (
  <GridItem>
    <Card className={`bg-${color}-100 border-${color}-200`}>
      <CardHeader>
        <CardTitle className={`text-${color}-800`}>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={`text-${color}-700`}>Grid Item Inhalt</p>
      </CardContent>
    </Card>
  </GridItem>
);

export const Default: Story = {
  args: {
    cols: 3,
    gap: 'md',
    children: (
      <>
        <GridItemExample title="Item 1" color="blue" />
        <GridItemExample title="Item 2" color="green" />
        <GridItemExample title="Item 3" color="purple" />
        <GridItemExample title="Item 4" color="orange" />
        <GridItemExample title="Item 5" color="pink" />
        <GridItemExample title="Item 6" color="indigo" />
      </>
    ),
  },
};

export const ResponsiveGrid: Story = {
  args: {
    responsive: 'desktop',
    gap: 'lg',
    children: (
      <>
        <GridItemExample title="Mobile: 1 Spalte" color="blue" />
        <GridItemExample title="Tablet: 2-3 Spalten" color="green" />
        <GridItemExample title="Desktop: 4-6 Spalten" color="purple" />
        <GridItemExample title="Responsive Layout" color="orange" />
        <GridItemExample title="Automatische Anpassung" color="pink" />
        <GridItemExample title="Flexible Grid" color="indigo" />
      </>
    ),
  },
};

export const DifferentColumns: Story = {
  render: () => (
    <div className="space-y-8">
      {([1, 2, 3, 4, 6, 12] as const).map((cols) => (
        <div key={cols}>
          <h3 className="text-lg font-semibold mb-4">{cols} Spalte{cols > 1 ? 'n' : ''}</h3>
          <Grid cols={cols} gap="md">
            {Array.from({ length: Math.min(cols * 2, 12) }, (_, i) => (
              <GridItem key={i}>
                <Card className="bg-gray-50">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium">Item {i + 1}</p>
                  </CardContent>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const GapVariants: Story = {
  render: () => (
    <div className="space-y-8">
      {(['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'] as const).map((gap) => (
        <div key={gap}>
          <h3 className="text-lg font-semibold mb-4">Gap: {gap}</h3>
          <Grid cols={4} gap={gap}>
            {Array.from({ length: 4 }, (_, i) => (
              <GridItem key={i}>
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4 text-center">
                    <p className="font-medium">Item {i + 1}</p>
                  </CardContent>
                </Card>
              </GridItem>
            ))}
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const AlignmentExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
        <div key={align}>
          <h3 className="text-lg font-semibold mb-4">Align: {align}</h3>
          <Grid cols={3} gap="md" align={align} className="h-32">
            <GridItem>
              <Card className="bg-green-50 border-green-200 h-16">
                <CardContent className="p-2 text-center">
                  <p className="text-sm">Kurz</p>
                </CardContent>
              </Card>
            </GridItem>
            <GridItem>
              <Card className="bg-blue-50 border-blue-200 h-24">
                <CardContent className="p-2 text-center">
                  <p className="text-sm">Mittel</p>
                </CardContent>
              </Card>
            </GridItem>
            <GridItem>
              <Card className="bg-purple-50 border-purple-200 h-32">
                <CardContent className="p-2 text-center">
                  <p className="text-sm">Lang</p>
                </CardContent>
              </Card>
            </GridItem>
          </Grid>
        </div>
      ))}
    </div>
  ),
};

export const GridItemSpanning: Story = {
  render: () => (
    <Grid cols={12} gap="md">
      <GridItem span={12}>
        <Card className="bg-red-50 border-red-200">
          <CardContent className="p-4 text-center">
            <p className="font-medium">Span 12 (Volle Breite)</p>
          </CardContent>
        </Card>
      </GridItem>
      <GridItem span={6}>
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <p className="font-medium">Span 6 (Hälfte)</p>
          </CardContent>
        </Card>
      </GridItem>
      <GridItem span={6}>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="p-4 text-center">
            <p className="font-medium">Span 6 (Hälfte)</p>
          </CardContent>
        </Card>
      </GridItem>
      <GridItem span={4}>
        <Card className="bg-yellow-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <p className="font-medium">Span 4</p>
          </CardContent>
        </Card>
      </GridItem>
      <GridItem span={4}>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="p-4 text-center">
            <p className="font-medium">Span 4</p>
          </CardContent>
        </Card>
      </GridItem>
      <GridItem span={4}>
        <Card className="bg-pink-50 border-pink-200">
          <CardContent className="p-4 text-center">
            <p className="font-medium">Span 4</p>
          </CardContent>
        </Card>
      </GridItem>
    </Grid>
  ),
};

export const ComplexLayout: Story = {
  render: () => (
    <Grid cols={12} gap="lg">
      {/* Header */}
      <GridItem span={12}>
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader>
            <CardTitle>Header - Volle Breite</CardTitle>
          </CardHeader>
        </Card>
      </GridItem>
      
      {/* Sidebar */}
      <GridItem span={3}>
        <Card className="bg-blue-50 border-blue-200 h-64">
          <CardHeader>
            <CardTitle>Sidebar</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Navigation und Tools</p>
          </CardContent>
        </Card>
      </GridItem>
      
      {/* Main Content */}
      <GridItem span={6}>
        <Card className="bg-green-50 border-green-200 h-64">
          <CardHeader>
            <CardTitle>Hauptinhalt</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Wichtige Inhalte und Features</p>
          </CardContent>
        </Card>
      </GridItem>
      
      {/* Sidebar Right */}
      <GridItem span={3}>
        <Card className="bg-purple-50 border-purple-200 h-64">
          <CardHeader>
            <CardTitle>Sidebar</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Zusätzliche Informationen</p>
          </CardContent>
        </Card>
      </GridItem>
      
      {/* Footer */}
      <GridItem span={12}>
        <Card className="bg-gray-50 border-gray-200">
          <CardContent className="p-4 text-center">
            <p>Footer - Volle Breite</p>
          </CardContent>
        </Card>
      </GridItem>
    </Grid>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from '@/components/ui/stack';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Divider } from '@/components/ui/divider';

const meta: Meta<typeof Stack> = {
  title: 'Layout/Stack',
  component: Stack,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine flexible Stack-Komponente für vertikale und horizontale Stapelung mit verschiedenen Ausrichtungen und Abständen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal', 'verticalReverse', 'horizontalReverse'],
      description: 'Die Richtung der Stapelung',
    },
    align: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'stretch', 'baseline'],
      description: 'Die Ausrichtung der Items',
    },
    justify: {
      control: { type: 'select' },
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
      description: 'Die Justifizierung der Items',
    },
    gap: {
      control: { type: 'select' },
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Der Abstand zwischen Items',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const StackItem = ({ title, color }: { title: string; color: string }) => (
  <Card className={`bg-${color}-50 border-${color}-200 min-w-[200px]`}>
    <CardHeader>
      <CardTitle className={`text-${color}-800`}>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className={`text-${color}-700`}>Stack Item Inhalt</p>
    </CardContent>
  </Card>
);

export const Vertical: Story = {
  args: {
    direction: 'vertical',
    gap: 'md',
    children: (
      <>
        <StackItem title="Item 1" color="blue" />
        <StackItem title="Item 2" color="green" />
        <StackItem title="Item 3" color="purple" />
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    gap: 'md',
    children: (
      <>
        <StackItem title="Item 1" color="blue" />
        <StackItem title="Item 2" color="green" />
        <StackItem title="Item 3" color="purple" />
      </>
    ),
  },
};

export const AlignmentExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {(['start', 'center', 'end', 'stretch'] as const).map((align) => (
        <div key={align}>
          <h3 className="text-lg font-semibold mb-4">Align: {align}</h3>
          <Stack direction="horizontal" gap="md" align={align} className="h-32">
            <Card className="bg-green-50 border-green-200 h-16">
              <CardContent className="p-2 text-center">
                <p className="text-sm">Kurz</p>
              </CardContent>
            </Card>
            <Card className="bg-blue-50 border-blue-200 h-24">
              <CardContent className="p-2 text-center">
                <p className="text-sm">Mittel</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200 h-32">
              <CardContent className="p-2 text-center">
                <p className="text-sm">Lang</p>
              </CardContent>
            </Card>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const JustifyExamples: Story = {
  render: () => (
    <div className="space-y-8">
      {(['start', 'center', 'end', 'between', 'around', 'evenly'] as const).map((justify) => (
        <div key={justify}>
          <h3 className="text-lg font-semibold mb-4">Justify: {justify}</h3>
          <Stack direction="horizontal" gap="md" justify={justify} className="w-full border-2 border-dashed border-gray-300 p-4">
            <Card className="bg-blue-50 border-blue-200 w-24">
              <CardContent className="p-2 text-center">
                <p className="text-sm">Item 1</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200 w-24">
              <CardContent className="p-2 text-center">
                <p className="text-sm">Item 2</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200 w-24">
              <CardContent className="p-2 text-center">
                <p className="text-sm">Item 3</p>
              </CardContent>
            </Card>
          </Stack>
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
          <Stack direction="horizontal" gap={gap}>
            <Card className="bg-blue-50 border-blue-200 w-24">
              <CardContent className="p-2 text-center">
                <p className="text-sm">Item 1</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200 w-24">
              <CardContent className="p-2 text-center">
                <p className="text-sm">Item 2</p>
              </CardContent>
            </Card>
            <Card className="bg-purple-50 border-purple-200 w-24">
              <CardContent className="p-2 text-center">
                <p className="text-sm">Item 3</p>
              </CardContent>
            </Card>
          </Stack>
        </div>
      ))}
    </div>
  ),
};

export const WithDividers: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertical Stack mit Divider</h3>
        <Stack direction="vertical" gap="md" divider={<Divider />}>
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <p>Erster Abschnitt</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200">
            <CardContent className="p-4">
              <p>Zweiter Abschnitt</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200">
            <CardContent className="p-4">
              <p>Dritter Abschnitt</p>
            </CardContent>
          </Card>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontal Stack mit Divider</h3>
        <Stack direction="horizontal" gap="md" divider={<Divider orientation="vertical" />}>
          <Card className="bg-blue-50 border-blue-200 w-32">
            <CardContent className="p-4 text-center">
              <p>Links</p>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200 w-32">
            <CardContent className="p-4 text-center">
              <p>Mitte</p>
            </CardContent>
          </Card>
          <Card className="bg-purple-50 border-purple-200 w-32">
            <CardContent className="p-4 text-center">
              <p>Rechts</p>
            </CardContent>
          </Card>
        </Stack>
      </div>
    </div>
  ),
};

export const ButtonStack: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4">Vertikale Buttons</h3>
        <Stack direction="vertical" gap="sm">
          <Button variant="default">Primary Button</Button>
          <Button variant="secondary">Secondary Button</Button>
          <Button variant="outline">Outline Button</Button>
          <Button variant="ghost">Ghost Button</Button>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Horizontale Buttons</h3>
        <Stack direction="horizontal" gap="sm">
          <Button variant="default">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
        </Stack>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Responsive Button Stack</h3>
        <Stack direction="horizontal" gap="sm" wrap="wrap">
          <Button variant="default">Action 1</Button>
          <Button variant="secondary">Action 2</Button>
          <Button variant="outline">Action 3</Button>
          <Button variant="ghost">Action 4</Button>
          <Button variant="destructive">Delete</Button>
        </Stack>
      </div>
    </div>
  ),
};

export const FormLayout: Story = {
  render: () => (
    <Card className="w-96">
      <CardHeader>
        <CardTitle>Form Layout</CardTitle>
      </CardHeader>
      <CardContent>
        <Stack direction="vertical" gap="md">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input className="w-full p-2 border border-gray-300 rounded" placeholder="Vollständiger Name" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input className="w-full p-2 border border-gray-300 rounded" type="email" placeholder="email@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Nachricht</label>
            <textarea className="w-full p-2 border border-gray-300 rounded" rows={4} placeholder="Ihre Nachricht..." />
          </div>
          <Stack direction="horizontal" gap="sm" justify="end">
            <Button variant="outline">Abbrechen</Button>
            <Button variant="default">Senden</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  ),
};

export const NavigationBar: Story = {
  render: () => (
    <Card className="w-full">
      <CardContent className="p-4">
        <Stack direction="horizontal" gap="lg" align="center" justify="between">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-bold">Logo</h1>
            <Stack direction="horizontal" gap="md">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">About</Button>
              <Button variant="ghost">Services</Button>
              <Button variant="ghost">Contact</Button>
            </Stack>
          </div>
          <Stack direction="horizontal" gap="sm">
            <Button variant="outline">Login</Button>
            <Button variant="default">Sign Up</Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  ),
};

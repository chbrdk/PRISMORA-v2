import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Badge, BadgeWithIcon, BadgeGroup as BadgeGroupComponent } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, XCircle, Star, Heart, MessageCircle } from 'lucide-react';

const meta: Meta<typeof Badge> = {
  title: 'Feedback/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Badge-Komponenten für Status-Anzeigen, Labels und Zähler mit verschiedenen Varianten und Größen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary', 'destructive', 'outline', 'success', 'warning', 'info', 'prismora', 'online', 'offline', 'busy', 'away', 'low', 'medium', 'high', 'critical'],
      description: 'Die visuelle Variante der Badge',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg', 'xl'],
      description: 'Die Größe der Badge',
    },
    shape: {
      control: { type: 'select' },
      options: ['rounded', 'square', 'pill'],
      description: 'Die Form der Badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Badge',
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="destructive">Destructive</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="prismora">PRISMORA</Badge>
    </div>
  ),
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="online">Online</Badge>
      <Badge variant="offline">Offline</Badge>
      <Badge variant="busy">Beschäftigt</Badge>
      <Badge variant="away">Abwesend</Badge>
    </div>
  ),
};

export const PriorityBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="low">Niedrig</Badge>
      <Badge variant="medium">Mittel</Badge>
      <Badge variant="high">Hoch</Badge>
      <Badge variant="critical">Kritisch</Badge>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">Klein</Badge>
      <Badge size="default">Standard</Badge>
      <Badge size="lg">Groß</Badge>
      <Badge size="xl">Extra Groß</Badge>
    </div>
  ),
};

export const Shapes: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge shape="rounded">Rounded</Badge>
      <Badge shape="square">Square</Badge>
      <Badge shape="pill">Pill</Badge>
    </div>
  ),
};

export const WithDot: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge dot>Mit Punkt</Badge>
      <Badge dot dotColor="bg-green-500">Grüner Punkt</Badge>
      <Badge dot dotColor="bg-red-500">Roter Punkt</Badge>
      <Badge dot dotColor="bg-yellow-500">Gelber Punkt</Badge>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <BadgeWithIcon icon={CheckCircle}>Erfolgreich</BadgeWithIcon>
      <BadgeWithIcon icon={AlertCircle} variant="warning">Warnung</BadgeWithIcon>
      <BadgeWithIcon icon={XCircle} variant="destructive">Fehler</BadgeWithIcon>
      <BadgeWithIcon icon={Star} variant="prismora">Favorit</BadgeWithIcon>
      <BadgeWithIcon icon={Heart} variant="success">Geliebt</BadgeWithIcon>
      <BadgeWithIcon icon={MessageCircle} variant="info" iconPosition="right">Kommentar</BadgeWithIcon>
    </div>
  ),
};

export const BadgeGroup: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Standard Group</h4>
        <BadgeGroupComponent>
          <Badge variant="success">React</Badge>
          <Badge variant="info">TypeScript</Badge>
          <Badge variant="warning">JavaScript</Badge>
          <Badge variant="destructive">CSS</Badge>
        </BadgeGroupComponent>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Mit Icons</h4>
        <BadgeGroupComponent>
          <BadgeWithIcon icon={CheckCircle} variant="success">Erfolgreich</BadgeWithIcon>
          <BadgeWithIcon icon={AlertCircle} variant="warning">Warnung</BadgeWithIcon>
          <BadgeWithIcon icon={XCircle} variant="destructive">Fehler</BadgeWithIcon>
        </BadgeGroupComponent>
      </div>
      
      <div>
        <h4 className="text-sm font-medium mb-2">Ohne Wrap</h4>
        <BadgeGroupComponent wrap={false}>
          <Badge variant="success">React</Badge>
          <Badge variant="info">TypeScript</Badge>
          <Badge variant="warning">JavaScript</Badge>
          <Badge variant="destructive">CSS</Badge>
          <Badge variant="prismora">HTML</Badge>
        </BadgeGroupComponent>
      </div>
    </div>
  ),
};

export const NotificationBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="relative">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <MessageCircle className="h-5 w-5" />
        </div>
        <Badge className="absolute -top-1 -right-1" size="sm">3</Badge>
      </div>
      
      <div className="relative">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <Heart className="h-5 w-5" />
        </div>
        <Badge className="absolute -top-1 -right-1" size="sm" variant="destructive">12</Badge>
      </div>
      
      <div className="relative">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <Star className="h-5 w-5" />
        </div>
        <Badge className="absolute -top-1 -right-1" size="sm" variant="prismora">5</Badge>
      </div>
    </div>
  ),
};

export const UserStatus: Story = {
  render: () => (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <span>Max Mustermann</span>
        <Badge variant="online" dot>Online</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <span>Anna Schmidt</span>
        <Badge variant="away" dot>Abwesend</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <span>Tom Weber</span>
        <Badge variant="busy" dot>Beschäftigt</Badge>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
        <span>Lisa Müller</span>
        <Badge variant="offline" dot>Offline</Badge>
      </div>
    </div>
  ),
};

export const TaskPriority: Story = {
  render: () => (
    <div className="space-y-2">
      <div className="flex items-center justify-between p-2 border rounded">
        <span>Bug Fix implementieren</span>
        <Badge variant="critical">Kritisch</Badge>
      </div>
      
      <div className="flex items-center justify-between p-2 border rounded">
        <span>Dokumentation aktualisieren</span>
        <Badge variant="high">Hoch</Badge>
      </div>
      
      <div className="flex items-center justify-between p-2 border rounded">
        <span>Code Review</span>
        <Badge variant="medium">Mittel</Badge>
      </div>
      
      <div className="flex items-center justify-between p-2 border rounded">
        <span>Typos korrigieren</span>
        <Badge variant="low">Niedrig</Badge>
      </div>
    </div>
  ),
};

export const InteractiveExample: Story = {
  render: () => {
    const [selectedTags, setSelectedTags] = React.useState<string[]>([]);
    
    const tags = ['React', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 'Node.js', 'Next.js'];
    
    const toggleTag = (tag: string) => {
      setSelectedTags(prev => 
        prev.includes(tag) 
          ? prev.filter(t => t !== tag)
          : [...prev, tag]
      );
    };
    
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-medium">Tags auswählen:</h4>
        <BadgeGroupComponent>
          {tags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTags.includes(tag) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </BadgeGroupComponent>
        
        <div className="text-sm text-muted-foreground">
          Ausgewählte Tags: {selectedTags.length > 0 ? selectedTags.join(', ') : 'Keine'}
        </div>
      </div>
    );
  },
};

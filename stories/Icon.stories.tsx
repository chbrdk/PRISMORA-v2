import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { Icon, IconGroup, IconWithLabel, IconButton, iconNames } from '@/components/ui/icon';

const meta: Meta<typeof Icon> = {
  title: 'UI/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine umfassende Icon-Komponente basierend auf Lucide React mit verschiedenen Größen, Farben und Varianten.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: iconNames.slice(0, 50), // Show first 50 icons for demo
      description: 'Der Name des Lucide React Icons',
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Die Größe des Icons',
    },
    color: {
      control: { type: 'select' },
      options: ['default', 'muted', 'primary', 'prismora', 'success', 'warning', 'destructive', 'info'],
      description: 'Die Farbe des Icons',
    },
    weight: {
      control: { type: 'select' },
      options: ['thin', 'light', 'normal', 'medium', 'bold'],
      description: 'Die Strichstärke des Icons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Icon Stories
export const Default: Story = {
  args: {
    name: 'HomeIcon',
    size: 'md',
    color: 'default',
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
              <Icon name="HomeIcon" size="xs" />
        <Icon name="HomeIcon" size="sm" />
        <Icon name="HomeIcon" size="md" />
        <Icon name="HomeIcon" size="lg" />
        <Icon name="HomeIcon" size="xl" />
        <Icon name="HomeIcon" size="2xl" />
        <Icon name="HomeIcon" size="3xl" />
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="HeartIcon" color="default" />
      <Icon name="HeartIcon" color="muted" />
      <Icon name="HeartIcon" color="primary" />
      <Icon name="HeartIcon" color="prismora" />
      <Icon name="HeartIcon" color="success" />
      <Icon name="HeartIcon" color="warning" />
      <Icon name="HeartIcon" color="destructive" />
      <Icon name="HeartIcon" color="info" />
    </div>
  ),
};

export const Weights: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Icon name="StarIcon" weight="thin" />
      <Icon name="StarIcon" weight="light" />
      <Icon name="StarIcon" weight="normal" />
      <Icon name="StarIcon" weight="medium" />
      <Icon name="StarIcon" weight="bold" />
    </div>
  ),
};

// Icon Categories
export const NavigationIcons: Story = {
  render: () => (
    <IconGroup spacing="lg">
      <Icon name="HomeIcon" size="lg" />
      <Icon name="MagnifyingGlassIcon" size="lg" />
      <Icon name="CogIcon" size="lg" />
      <Icon name="UserIcon" size="lg" />
      <Icon name="Bars3Icon" size="lg" />
      <Icon name="ArrowRightIcon" size="lg" />
      <Icon name="ArrowLeftIcon" size="lg" />
      <Icon name="ChevronDownIcon" size="lg" />
    </IconGroup>
  ),
};

export const ActionIcons: Story = {
  render: () => (
    <IconGroup spacing="lg">
      <Icon name="PlusIcon" size="lg" />
      <Icon name="MinusIcon" size="lg" />
      <Icon name="CheckIcon" size="lg" />
      <Icon name="XMarkIcon" size="lg" />
      <Icon name="ChevronDownIcon" size="lg" />
      <Icon name="ChevronUpIcon" size="lg" />
      <Icon name="ChevronRightIcon" size="lg" />
      <Icon name="ChevronLeftIcon" size="lg" />
    </IconGroup>
  ),
};

export const StatusIcons: Story = {
  render: () => (
    <IconGroup spacing="lg">
      <Icon name="CheckIcon" size="lg" color="success" />
      <Icon name="XMarkIcon" size="lg" color="destructive" />
      <Icon name="BoltIcon" size="lg" color="warning" />
      <Icon name="BoltIcon" size="lg" color="info" />
      <Icon name="ClockIcon" size="lg" color="muted" />
      <Icon name="UserIcon" size="lg" color="primary" />
      <Icon name="HomeIcon" size="lg" color="success" />
      <Icon name="CogIcon" size="lg" color="warning" />
    </IconGroup>
  ),
};

export const SocialIcons: Story = {
  render: () => (
    <IconGroup spacing="lg">
      <Icon name="EnvelopeIcon" size="lg" />
      <Icon name="PhoneIcon" size="lg" />
      <Icon name="BoltIcon" size="lg" />
      <Icon name="HeartIcon" size="lg" />
      <Icon name="UserIcon" size="lg" />
      <Icon name="HomeIcon" size="lg" />
      <Icon name="StarIcon" size="lg" />
      <Icon name="CogIcon" size="lg" />
    </IconGroup>
  ),
};

// Icon Group Stories
export const IconGroupHorizontal: Story = {
  render: () => (
    <IconGroup spacing="md" direction="horizontal">
      <Icon name="HomeIcon" />
      <Icon name="UserIcon" />
      <Icon name="CogIcon" />
      <Icon name="MagnifyingGlassIcon" />
    </IconGroup>
  ),
};

export const IconGroupVertical: Story = {
  render: () => (
    <IconGroup spacing="md" direction="vertical">
      <Icon name="HomeIcon" />
      <Icon name="UserIcon" />
      <Icon name="CogIcon" />
      <Icon name="MagnifyingGlassIcon" />
    </IconGroup>
  ),
};

export const IconGroupWithSpacing: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Tight Spacing</h4>
        <IconGroup spacing="xs">
          <Icon name="HomeIcon" />
          <Icon name="UserIcon" />
          <Icon name="CogIcon" />
        </IconGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Normal Spacing</h4>
        <IconGroup spacing="md">
          <Icon name="HomeIcon" />
          <Icon name="UserIcon" />
          <Icon name="CogIcon" />
        </IconGroup>
      </div>
      <div>
        <h4 className="text-sm font-medium mb-2">Loose Spacing</h4>
        <IconGroup spacing="xl">
          <Icon name="HomeIcon" />
          <Icon name="UserIcon" />
          <Icon name="CogIcon" />
        </IconGroup>
      </div>
    </div>
  ),
};

// Icon with Label Stories
export const IconWithLabelHorizontal: Story = {
  render: () => (
    <div className="space-y-4">
      <IconWithLabel icon="HomeIcon" label="Home" />
      <IconWithLabel icon="UserIcon" label="Profile" />
      <IconWithLabel icon="CogIcon" label="Settings" />
      <IconWithLabel icon="MagnifyingGlassIcon" label="Search" />
    </div>
  ),
};

export const IconWithLabelVertical: Story = {
  render: () => (
    <div className="flex gap-4">
      <IconWithLabel icon="HomeIcon" label="Home" direction="vertical" />
      <IconWithLabel icon="UserIcon" label="Profile" direction="vertical" />
      <IconWithLabel icon="CogIcon" label="Settings" direction="vertical" />
      <IconWithLabel icon="MagnifyingGlassIcon" label="Search" direction="vertical" />
    </div>
  ),
};

export const IconWithLabelSizes: Story = {
  render: () => (
    <div className="space-y-4">
      <IconWithLabel icon="HomeIcon" label="Small" iconSize="sm" labelSize="sm" />
      <IconWithLabel icon="HomeIcon" label="Medium" iconSize="md" labelSize="md" />
      <IconWithLabel icon="HomeIcon" label="Large" iconSize="lg" labelSize="lg" />
      <IconWithLabel icon="HomeIcon" label="Extra Large" iconSize="xl" labelSize="xl" />
    </div>
  ),
};

export const IconWithLabelColors: Story = {
  render: () => (
    <div className="space-y-4">
      <IconWithLabel icon="CheckIcon" label="Success" iconColor="success" />
      <IconWithLabel icon="XMarkIcon" label="Error" iconColor="destructive" />
      <IconWithLabel icon="BoltIcon" label="Warning" iconColor="warning" />
      <IconWithLabel icon="BoltIcon" label="Info" iconColor="info" />
      <IconWithLabel icon="HeartIcon" label="PRISMORA" iconColor="prismora" />
    </div>
  ),
};

// Icon Button Stories
export const IconButtonSizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon="Plus" size="xs" />
      <IconButton icon="Plus" size="sm" />
      <IconButton icon="Plus" size="md" />
      <IconButton icon="Plus" size="lg" />
      <IconButton icon="Plus" size="xl" />
    </div>
  ),
};

export const IconButtonVariants: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon="Settings" variant="default" />
      <IconButton icon="Settings" variant="outline" />
      <IconButton icon="Settings" variant="ghost" />
      <IconButton icon="Trash" variant="destructive" />
      <IconButton icon="Heart" variant="prismora" />
    </div>
  ),
};

export const IconButtonColors: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <IconButton icon="Heart" variant="ghost" iconColor="default" />
      <IconButton icon="Heart" variant="ghost" iconColor="primary" />
      <IconButton icon="Heart" variant="ghost" iconColor="prismora" />
      <IconButton icon="Heart" variant="ghost" iconColor="success" />
      <IconButton icon="Heart" variant="ghost" iconColor="warning" />
      <IconButton icon="Heart" variant="ghost" iconColor="destructive" />
      <IconButton icon="Heart" variant="ghost" iconColor="info" />
    </div>
  ),
};

// Interactive Examples
export const InteractiveIconSelector: Story = {
  render: () => {
    const [selectedIcon, setSelectedIcon] = React.useState('HomeIcon');
    const [selectedSize, setSelectedSize] = React.useState<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'>('md');
    const [selectedColor, setSelectedColor] = React.useState<'default' | 'muted' | 'primary' | 'prismora' | 'success' | 'warning' | 'destructive' | 'info'>('default');

    const popularIcons = ['HomeIcon', 'UserIcon', 'CogIcon', 'MagnifyingGlassIcon', 'HeartIcon', 'StarIcon', 'EnvelopeIcon', 'PhoneIcon', 'CheckIcon', 'XMarkIcon', 'PlusIcon', 'MinusIcon', 'BoltIcon', 'ClockIcon', 'ArrowRightIcon', 'ChevronDownIcon'];

    return (
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-4">Icon Preview</h3>
          <div className="flex justify-center mb-4">
            <Icon 
              name={selectedIcon as any} 
              size={selectedSize} 
              color={selectedColor}
              className="border-2 border-dashed border-gray-300 p-4 rounded-lg"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Icon</label>
            <select 
              value={selectedIcon} 
              onChange={(e) => setSelectedIcon(e.target.value)}
              className="w-full p-2 border rounded-md"
            >
              {popularIcons.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Size</label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value as any)}
              className="w-full p-2 border rounded-md"
            >
              <option value="xs">Extra Small</option>
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
              <option value="xl">Extra Large</option>
              <option value="2xl">2XL</option>
              <option value="3xl">3XL</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <select 
              value={selectedColor} 
              onChange={(e) => setSelectedColor(e.target.value as any)}
              className="w-full p-2 border rounded-md"
            >
              <option value="default">Default</option>
              <option value="muted">Muted</option>
              <option value="primary">Primary</option>
              <option value="prismora">PRISMORA</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="destructive">Destructive</option>
              <option value="info">Info</option>
            </select>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Popular Icons</h4>
          <div className="grid grid-cols-8 gap-2">
            {popularIcons.map(icon => (
              <button
                key={icon}
                onClick={() => setSelectedIcon(icon)}
                className={`p-2 rounded-md border transition-colors ${
                  selectedIcon === icon 
                    ? 'bg-primary text-primary-foreground' 
                    : 'hover:bg-accent'
                }`}
              >
                <Icon name={icon as any} size="sm" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
};

export const IconGallery: Story = {
  render: () => {
    const categories = {
      'Navigation': ['HomeIcon', 'MagnifyingGlassIcon', 'CogIcon', 'UserIcon', 'Bars3Icon', 'ArrowRightIcon', 'ArrowLeftIcon', 'ChevronDownIcon'],
      'Actions': ['PlusIcon', 'MinusIcon', 'CheckIcon', 'XMarkIcon', 'ArrowRightIcon', 'ArrowLeftIcon', 'ChevronDownIcon', 'ChevronUpIcon'],
      'Status': ['CheckIcon', 'XMarkIcon', 'BoltIcon', 'StarIcon', 'ClockIcon', 'UserIcon', 'HomeIcon', 'CogIcon'],
      'Social': ['EnvelopeIcon', 'PhoneIcon', 'UserIcon', 'HeartIcon', 'StarIcon', 'CheckIcon', 'PlusIcon', 'MinusIcon'],
    };

    return (
      <div className="space-y-8">
        {Object.entries(categories).map(([category, icons]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold mb-4">{category}</h3>
            <div className="grid grid-cols-8 gap-4">
              {icons.map(icon => (
                <div key={icon} className="flex flex-col items-center p-3 border rounded-lg hover:bg-accent transition-colors">
                  <Icon name={icon as any} size="lg" />
                  <span className="text-xs mt-2 text-center">{icon}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  },
};

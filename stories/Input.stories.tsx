import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Input } from '@/components/ui/input';
import { Mail, Search, User, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

const meta: Meta<typeof Input> = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine vielseitige Input-Komponente mit verschiedenen Varianten, Größen und Icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'prismora'],
      description: 'Die visuelle Variante des Inputs',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe des Inputs',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deaktiviert den Input',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder Text',
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'Der Typ des Inputs',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your text...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    type: 'email',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username...',
    helperText: 'This will be your display name',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    type: 'email',
    error: 'Please enter a valid email address',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    type: 'email',
    success: 'Email address is valid',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Email Address',
    placeholder: 'Enter your email...',
    type: 'email',
    leftIcon: <Mail className="h-4 w-4" />,
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search...',
    type: 'search',
    rightIcon: <Search className="h-4 w-4" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Username',
    placeholder: 'Enter your username...',
    leftIcon: <User className="h-4 w-4" />,
    rightIcon: <Search className="h-4 w-4" />,
  },
};

export const PasswordInput: Story = {
  render: () => {
    const [showPassword, setShowPassword] = useState(false);
    
    return (
      <Input
        label="Password"
        placeholder="Enter your password..."
        type={showPassword ? 'text' : 'password'}
        leftIcon={<Lock className="h-4 w-4" />}
        rightIcon={
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        }
      />
    );
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Input',
    placeholder: 'Small input...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Input',
    placeholder: 'Large input...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true,
  },
};

export const PrismoraVariant: Story = {
  args: {
    label: 'PRISMORA Input',
    placeholder: 'PRISMORA themed input...',
    variant: 'prismora',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Default"
        placeholder="Default variant"
        variant="default"
      />
      <Input
        label="Error"
        placeholder="Error variant"
        variant="error"
        error="This field has an error"
      />
      <Input
        label="Success"
        placeholder="Success variant"
        variant="success"
        success="This field is valid"
      />
      <Input
        label="PRISMORA"
        placeholder="PRISMORA variant"
        variant="prismora"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Small"
        placeholder="Small size"
        size="sm"
      />
      <Input
        label="Default"
        placeholder="Default size"
        size="default"
      />
      <Input
        label="Large"
        placeholder="Large size"
        size="lg"
      />
    </div>
  ),
};

export const AllTypes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Text"
        placeholder="Text input"
        type="text"
      />
      <Input
        label="Email"
        placeholder="Email input"
        type="email"
      />
      <Input
        label="Password"
        placeholder="Password input"
        type="password"
      />
      <Input
        label="Number"
        placeholder="Number input"
        type="number"
      />
      <Input
        label="Tel"
        placeholder="Phone number"
        type="tel"
      />
      <Input
        label="URL"
        placeholder="Website URL"
        type="url"
      />
      <Input
        label="Search"
        placeholder="Search..."
        type="search"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input
        label="Full Name"
        placeholder="Enter your full name"
        leftIcon={<User className="h-4 w-4" />}
      />
      <Input
        label="Email Address"
        placeholder="Enter your email"
        type="email"
        leftIcon={<Mail className="h-4 w-4" />}
        helperText="We'll never share your email"
      />
      <Input
        label="Password"
        placeholder="Enter your password"
        type="password"
        leftIcon={<Lock className="h-4 w-4" />}
        error="Password must be at least 8 characters"
      />
    </div>
  ),
};

import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from '@/components/ui/checkbox';

const meta: Meta<typeof Checkbox> = {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine vielseitige Checkbox-Komponente mit verschiedenen Varianten und Größen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'prismora'],
      description: 'Die visuelle Variante der Checkbox',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe der Checkbox',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deaktiviert die Checkbox',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Checkbox ist ausgewählt',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Accept terms and conditions',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'We\'ll send you updates about new features',
  },
};

export const WithError: Story = {
  args: {
    label: 'Accept terms and conditions',
    error: 'You must accept the terms to continue',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Email verified',
    success: 'Your email has been verified',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small checkbox',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large checkbox',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked checkbox',
    disabled: true,
    checked: true,
  },
};

export const PrismoraVariant: Story = {
  args: {
    label: 'PRISMORA checkbox',
    variant: 'prismora',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Checkbox
        label="Default"
        variant="default"
      />
      <Checkbox
        label="Error"
        variant="error"
        error="This field has an error"
      />
      <Checkbox
        label="Success"
        variant="success"
        success="This field is valid"
      />
      <Checkbox
        label="PRISMORA"
        variant="prismora"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Checkbox
        label="Small"
        size="sm"
      />
      <Checkbox
        label="Default"
        size="default"
      />
      <Checkbox
        label="Large"
        size="lg"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Checkbox
        label="I agree to the Terms of Service"
        helperText="Please read the terms before accepting"
      />
      <Checkbox
        label="Subscribe to marketing emails"
        helperText="Receive updates about new features"
      />
      <Checkbox
        label="Enable two-factor authentication"
        success="Two-factor authentication enabled"
        checked={true}
      />
      <Checkbox
        label="Accept cookies"
        error="You must accept cookies to use this site"
      />
    </div>
  ),
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-sm font-medium">Notification Preferences</h3>
      <Checkbox
        label="Email notifications"
        helperText="Receive notifications via email"
      />
      <Checkbox
        label="Push notifications"
        helperText="Receive push notifications in browser"
      />
      <Checkbox
        label="SMS notifications"
        helperText="Receive notifications via SMS"
      />
      <Checkbox
        label="Weekly digest"
        helperText="Receive a weekly summary of activity"
      />
    </div>
  ),
};

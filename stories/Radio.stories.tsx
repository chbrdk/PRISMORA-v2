import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from '@/components/ui/radio';

const meta: Meta<typeof Radio> = {
  title: 'UI/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine vielseitige Radio-Komponente mit verschiedenen Varianten, Größen und Layouts.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'prismora'],
      description: 'Die visuelle Variante der Radio-Buttons',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe der Radio-Buttons',
    },
    layout: {
      control: { type: 'select' },
      options: ['vertical', 'horizontal'],
      description: 'Das Layout der Radio-Buttons',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
];

const planOptions = [
  { value: 'basic', label: 'Basic Plan' },
  { value: 'pro', label: 'Pro Plan' },
  { value: 'enterprise', label: 'Enterprise Plan' },
];

const notificationOptions = [
  { value: 'email', label: 'Email' },
  { value: 'sms', label: 'SMS' },
  { value: 'push', label: 'Push Notifications' },
  { value: 'none', label: 'No notifications', disabled: true },
];

export const Default: Story = {
  args: {
    name: 'gender',
    options: genderOptions,
    label: 'Gender',
  },
};

export const WithHelperText: Story = {
  args: {
    name: 'plan',
    options: planOptions,
    label: 'Select Plan',
    helperText: 'Choose the plan that best fits your needs',
  },
};

export const WithError: Story = {
  args: {
    name: 'gender',
    options: genderOptions,
    label: 'Gender',
    error: 'Please select your gender',
  },
};

export const WithSuccess: Story = {
  args: {
    name: 'plan',
    options: planOptions,
    label: 'Plan',
    success: 'Plan selected successfully',
  },
};

export const HorizontalLayout: Story = {
  args: {
    name: 'notification',
    options: notificationOptions,
    label: 'Notification Preference',
    layout: 'horizontal',
  },
};

export const Small: Story = {
  args: {
    name: 'gender',
    options: genderOptions,
    label: 'Gender',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    name: 'gender',
    options: genderOptions,
    label: 'Gender',
    size: 'lg',
  },
};

export const PrismoraVariant: Story = {
  args: {
    name: 'plan',
    options: planOptions,
    label: 'PRISMORA Plan',
    variant: 'prismora',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Radio
        name="variant1"
        options={genderOptions}
        label="Default"
        variant="default"
      />
      <Radio
        name="variant2"
        options={genderOptions}
        label="Error"
        variant="error"
        error="This field has an error"
      />
      <Radio
        name="variant3"
        options={genderOptions}
        label="Success"
        variant="success"
        success="This field is valid"
      />
      <Radio
        name="variant4"
        options={genderOptions}
        label="PRISMORA"
        variant="prismora"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Radio
        name="size1"
        options={genderOptions}
        label="Small"
        size="sm"
      />
      <Radio
        name="size2"
        options={genderOptions}
        label="Default"
        size="default"
      />
      <Radio
        name="size3"
        options={genderOptions}
        label="Large"
        size="lg"
      />
    </div>
  ),
};

export const AllLayouts: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Radio
        name="layout1"
        options={notificationOptions}
        label="Vertical Layout"
        layout="vertical"
      />
      <Radio
        name="layout2"
        options={notificationOptions}
        label="Horizontal Layout"
        layout="horizontal"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-6 w-80">
      <Radio
        name="gender"
        options={genderOptions}
        label="Gender"
        helperText="This information is optional"
      />
      <Radio
        name="plan"
        options={planOptions}
        label="Subscription Plan"
        error="Please select a plan to continue"
      />
      <Radio
        name="notification"
        options={notificationOptions}
        label="Notification Preference"
        layout="horizontal"
        success="Preferences saved successfully"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div className="space-y-4 w-80">
        <Radio
          name="controlled"
          options={genderOptions}
          label="Controlled Radio"
          value={value}
          onChange={setValue}
        />
        <p className="text-sm text-muted-foreground">
          Selected value: {value || 'None'}
        </p>
      </div>
    );
  },
};

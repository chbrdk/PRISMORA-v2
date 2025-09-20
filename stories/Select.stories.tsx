import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@/components/ui/select';
import { User, Globe, MapPin } from 'lucide-react';

const meta: Meta<typeof Select> = {
  title: 'UI/Select',
  component: Select,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine vielseitige Select-Komponente mit verschiedenen Varianten, Größen und Icons.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'prismora'],
      description: 'Die visuelle Variante des Selects',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe des Selects',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deaktiviert den Select',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder Text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const countryOptions = [
  { value: 'de', label: 'Germany' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'fr', label: 'France' },
  { value: 'es', label: 'Spain' },
  { value: 'it', label: 'Italy' },
];

const roleOptions = [
  { value: 'admin', label: 'Administrator' },
  { value: 'user', label: 'User' },
  { value: 'moderator', label: 'Moderator' },
  { value: 'guest', label: 'Guest', disabled: true },
];

const categoryOptions = [
  { value: 'technology', label: 'Technology' },
  { value: 'design', label: 'Design' },
  { value: 'marketing', label: 'Marketing' },
  { value: 'development', label: 'Development' },
  { value: 'business', label: 'Business' },
];

export const Default: Story = {
  args: {
    options: countryOptions,
    placeholder: 'Select a country...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'User Role',
    options: roleOptions,
    placeholder: 'Select a role...',
    helperText: 'This will determine your permissions',
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country...',
    error: 'Please select a country',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country...',
    success: 'Country selected successfully',
  },
};

export const WithLeftIcon: Story = {
  args: {
    label: 'Country',
    options: countryOptions,
    placeholder: 'Select a country...',
    leftIcon: <Globe className="h-4 w-4" />,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'User Role',
    options: roleOptions,
    placeholder: 'Select a role...',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Select',
    options: countryOptions,
    placeholder: 'Small select...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Select',
    options: countryOptions,
    placeholder: 'Large select...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Select',
    options: countryOptions,
    placeholder: 'This select is disabled',
    disabled: true,
  },
};

export const PrismoraVariant: Story = {
  args: {
    label: 'PRISMORA Select',
    options: categoryOptions,
    placeholder: 'PRISMORA themed select...',
    variant: 'prismora',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Select
        label="Default"
        options={countryOptions}
        placeholder="Default variant"
        variant="default"
      />
      <Select
        label="Error"
        options={countryOptions}
        placeholder="Error variant"
        variant="error"
        error="This field has an error"
      />
      <Select
        label="Success"
        options={countryOptions}
        placeholder="Success variant"
        variant="success"
        success="This field is valid"
      />
      <Select
        label="PRISMORA"
        options={countryOptions}
        placeholder="PRISMORA variant"
        variant="prismora"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Select
        label="Small"
        options={countryOptions}
        placeholder="Small size"
        size="sm"
      />
      <Select
        label="Default"
        options={countryOptions}
        placeholder="Default size"
        size="default"
      />
      <Select
        label="Large"
        options={countryOptions}
        placeholder="Large size"
        size="lg"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Select
        label="Country"
        options={countryOptions}
        placeholder="Select your country"
        leftIcon={<MapPin className="h-4 w-4" />}
        helperText="We'll use this for regional settings"
      />
      <Select
        label="User Role"
        options={roleOptions}
        placeholder="Select your role"
        leftIcon={<User className="h-4 w-4" />}
        error="Please select a valid role"
      />
      <Select
        label="Category"
        options={categoryOptions}
        placeholder="Select a category"
        success="Category selected successfully"
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('');
    
    return (
      <div className="space-y-4 w-80">
        <Select
          label="Controlled Select"
          options={countryOptions}
          placeholder="Select a country..."
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

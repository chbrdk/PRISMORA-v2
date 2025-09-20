import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from '@/components/ui/textarea';

const meta: Meta<typeof Textarea> = {
  title: 'UI/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine vielseitige Textarea-Komponente mit verschiedenen Varianten, Größen und Character-Counting.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'prismora'],
      description: 'Die visuelle Variante der Textarea',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe der Textarea',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deaktiviert die Textarea',
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder Text',
    },
    characterCount: {
      control: { type: 'boolean' },
      description: 'Zeigt Character-Count an',
    },
    maxLength: {
      control: { type: 'number' },
      description: 'Maximale Anzahl Zeichen',
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
    label: 'Description',
    placeholder: 'Enter your description...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    helperText: 'This will be displayed on your profile',
  },
};

export const WithError: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
    error: 'Description is required',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Description',
    placeholder: 'Enter your description...',
    success: 'Description saved successfully',
  },
};

export const WithCharacterCount: Story = {
  args: {
    label: 'Bio',
    placeholder: 'Tell us about yourself...',
    characterCount: true,
    maxLength: 280,
    defaultValue: 'Hello, I am a developer...',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small Textarea',
    placeholder: 'Small textarea...',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large Textarea',
    placeholder: 'Large textarea...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    placeholder: 'This textarea is disabled',
    disabled: true,
  },
};

export const PrismoraVariant: Story = {
  args: {
    label: 'PRISMORA Textarea',
    placeholder: 'PRISMORA themed textarea...',
    variant: 'prismora',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Textarea
        label="Default"
        placeholder="Default variant"
        variant="default"
      />
      <Textarea
        label="Error"
        placeholder="Error variant"
        variant="error"
        error="This field has an error"
      />
      <Textarea
        label="Success"
        placeholder="Success variant"
        variant="success"
        success="This field is valid"
      />
      <Textarea
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
      <Textarea
        label="Small"
        placeholder="Small size"
        size="sm"
      />
      <Textarea
        label="Default"
        placeholder="Default size"
        size="default"
      />
      <Textarea
        label="Large"
        placeholder="Large size"
        size="lg"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Textarea
        label="Project Description"
        placeholder="Describe your project..."
        helperText="Be as detailed as possible"
        characterCount={true}
        maxLength={500}
        defaultValue="This is a sample project description that demonstrates the textarea component..."
      />
      <Textarea
        label="Comments"
        placeholder="Add your comments..."
        error="Comments are required for this submission"
      />
    </div>
  ),
};

export const Resizable: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Textarea
        label="Resizable Textarea"
        placeholder="This textarea can be resized..."
        className="resize"
      />
      <Textarea
        label="Fixed Height"
        placeholder="This textarea has a fixed height..."
        className="resize-none"
      />
    </div>
  ),
};

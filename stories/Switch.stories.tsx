import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from '@/components/ui/switch';

const meta: Meta<typeof Switch> = {
  title: 'UI/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Eine vielseitige Switch/Toggle-Komponente mit verschiedenen Varianten und Größen.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'error', 'success', 'prismora'],
      description: 'Die visuelle Variante des Switches',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'default', 'lg'],
      description: 'Die Größe des Switches',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Deaktiviert den Switch',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Switch ist aktiviert',
    },
    leftLabel: {
      control: { type: 'boolean' },
      description: 'Label links vom Switch',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Enable notifications',
  },
};

export const Checked: Story = {
  args: {
    label: 'Enable notifications',
    checked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Dark mode',
    helperText: 'Switch between light and dark themes',
  },
};

export const WithError: Story = {
  args: {
    label: 'Enable two-factor authentication',
    error: 'Two-factor authentication is required',
  },
};

export const WithSuccess: Story = {
  args: {
    label: 'Email verified',
    success: 'Your email has been verified',
  },
};

export const LeftLabel: Story = {
  args: {
    label: 'Auto-save',
    leftLabel: true,
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Small switch',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Large switch',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled switch',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled checked switch',
    disabled: true,
    checked: true,
  },
};

export const PrismoraVariant: Story = {
  args: {
    label: 'PRISMORA switch',
    variant: 'prismora',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Switch
        label="Default"
        variant="default"
      />
      <Switch
        label="Error"
        variant="error"
        error="This field has an error"
      />
      <Switch
        label="Success"
        variant="success"
        success="This field is valid"
      />
      <Switch
        label="PRISMORA"
        variant="prismora"
      />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Switch
        label="Small"
        size="sm"
      />
      <Switch
        label="Default"
        size="default"
      />
      <Switch
        label="Large"
        size="lg"
      />
    </div>
  ),
};

export const FormExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Switch
        label="Email notifications"
        helperText="Receive notifications via email"
      />
      <Switch
        label="Push notifications"
        helperText="Receive push notifications in browser"
        checked={true}
      />
      <Switch
        label="Two-factor authentication"
        error="Two-factor authentication is required for security"
      />
      <Switch
        label="Dark mode"
        success="Theme preference saved"
        leftLabel={true}
      />
    </div>
  ),
};

export const SettingsExample: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <h3 className="text-sm font-medium">Account Settings</h3>
      <Switch
        label="Public profile"
        helperText="Make your profile visible to everyone"
      />
      <Switch
        label="Email notifications"
        helperText="Receive email updates"
        checked={true}
      />
      <Switch
        label="SMS notifications"
        helperText="Receive SMS updates"
      />
      <Switch
        label="Marketing emails"
        helperText="Receive promotional emails"
      />
      <Switch
        label="Two-factor authentication"
        success="Two-factor authentication enabled"
        checked={true}
      />
    </div>
  ),
};

export const Controlled: Story = {
  render: () => {
    const [checked, setChecked] = React.useState(false);
    
    return (
      <div className="space-y-4 w-80">
        <Switch
          label="Controlled Switch"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
        />
        <p className="text-sm text-muted-foreground">
          Switch is {checked ? 'ON' : 'OFF'}
        </p>
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    const [isChecked, setIsChecked] = React.useState(false);
    
    return (
      <div className="space-y-4 w-80">
        <div className="p-4 border rounded-lg">
          <h3 className="text-sm font-medium mb-2">Interaktiver Switch</h3>
          <Switch
            label="Toggle me"
            checked={isChecked}
            onChange={(e) => {
              console.log('Switch clicked:', e.target.checked);
              setIsChecked(e.target.checked);
            }}
            variant="prismora"
          />
          <p className="text-xs text-gray-500 mt-2">
            Status: {isChecked ? 'Aktiviert' : 'Deaktiviert'}
          </p>
          <p className="text-xs text-blue-500 mt-1">
            Klicke auf den Switch und schaue in die Console
          </p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h3 className="text-sm font-medium mb-2">Animation Demo</h3>
          <div className="flex items-center gap-4">
            <Switch
              label="Links (OFF)"
              checked={false}
              variant="prismora"
            />
            <Switch
              label="Rechts (ON)"
              checked={true}
              variant="prismora"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Der Kreis bewegt sich von links nach rechts
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h3 className="text-sm font-medium mb-2">Verschiedene Varianten</h3>
          <div className="space-y-2">
            <Switch
              label="Default Variant"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            <Switch
              label="PRISMORA Variant"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              variant="prismora"
            />
            <Switch
              label="Success Variant"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              variant="success"
            />
          </div>
        </div>
      </div>
    );
  },
};

export const DirectionVariant: Story = {
  render: () => {
    const [isChecked, setIsChecked] = React.useState(false);
    
    return (
      <div className="space-y-4 w-80">
        <div className="p-4 border rounded-lg">
          <h3 className="text-sm font-medium mb-2">Direction Switch</h3>
          <Switch
            label="Richtung ändern"
            checked={isChecked}
            onChange={(e) => {
              console.log('Direction switch clicked:', e.target.checked);
              setIsChecked(e.target.checked);
            }}
            variant="direction"
          />
          <p className="text-xs text-gray-500 mt-2">
            Richtung: {isChecked ? 'Vorwärts (→)' : 'Rückwärts (←)'}
          </p>
        </div>
        
        <div className="p-4 border rounded-lg">
          <h3 className="text-sm font-medium mb-2">Vergleich</h3>
          <div className="space-y-2">
            <Switch
              label="Normaler Switch"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              variant="prismora"
            />
            <Switch
              label="Direction Switch"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              variant="direction"
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Der Direction Switch behält die Hintergrundfarbe und zeigt einen Pfeil
          </p>
        </div>
      </div>
    );
  },
};

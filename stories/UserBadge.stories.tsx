import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserBadge } from '@/components/ui/user-badge';

const meta: Meta<typeof UserBadge> = {
  title: 'Board/UserBadge',
  component: UserBadge,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: 'Wiederverwendbares Avatar/Initialien-Badge mit States: default, presenting (Highlight/Ping), inactive (ausgegraut nach 5min). Tooltip zeigt den Namen.',
      },
    },
  },
  argTypes: {
    name: { control: 'text', description: 'Angezeigter Name (auch im Tooltip)' },
    avatarUrl: { control: 'text', description: 'Optionales Avatar-Bild' },
    colorToken: { control: 'color', description: 'Akzentfarbe / Ringfarbe' },
    size: { control: { type: 'select' }, options: ['xs','sm','md','lg'], description: 'Badge-Größe' },
    state: { control: { type: 'select' }, options: ['default','presenting','inactive'], description: 'Visual State' },
    lastActiveAt: { control: 'text', description: 'ISO-Zeitstempel. >5min => automatisch inactive' },
    showTooltip: { control: 'boolean', description: 'Tooltip anzeigen' },
  }
};
export default meta;

type Story = StoryObj<typeof UserBadge>;

export const Default: Story = {
  args: { name: 'User Doe', size: 'md', state: 'default', showTooltip: true, colorToken: '#0ea5e9' },
  parameters: {
    docs: {
      description: {
        story: 'Standard-Badge. `size` steuert die Dimension (xs/sm/md/lg), `colorToken` den Akzent/Ring. `showTooltip` zeigt den Namen unterhalb des Badges.',
      },
    },
  },
};

export const Presenting: Story = {
  args: { name: 'Presenter', state: 'presenting', colorToken: '#0ea5e9', size: 'md' },
  parameters: {
    docs: {
      description: {
        story: 'Presenter-Modus: Pulsierender Ring + kleines "LIVE"-Badge oben rechts. Tipp: Nutze eine deutlich sichtbare `colorToken`, z. B. Marken-Primärfarbe.',
      },
    },
  },
};

export const Inactive: Story = {
  args: { name: 'Inactive User', state: 'inactive', size: 'md' },
  parameters: {
    docs: {
      description: {
        story: 'Inactive-Zustand: Badge ist ausgegraut. Kann manuell via `state="inactive"` gesetzt werden oder automatisch über `lastActiveAt` (>5min).',
      },
    },
  },
};

export const TimedInactive: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 12 }}>
      <UserBadge name="Live" lastActiveAt={new Date().toISOString()} />
      <UserBadge name="Idle" lastActiveAt={new Date(Date.now() - 6 * 60 * 1000).toISOString()} />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Zeitbasierter Inaktivitätsnachweis: Der rechte Badge wird automatisch als inactive dargestellt, da `lastActiveAt` älter als 5 Minuten ist.',
      },
    },
  },
};

export const Playground: Story = {
  args: {
    name: 'Playground User',
    avatarUrl: '',
    colorToken: '#0ea5e9',
    size: 'md',
    state: 'default',
    showTooltip: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Playground mit Controls: Passe `name`, `size`, `state`, `colorToken`, `showTooltip` interaktiv an. Nützlich zur visuellen Feinabstimmung.',
      },
    },
  },
};



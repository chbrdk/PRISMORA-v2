import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { UserToolbar } from '@/components/board/user-toolbar';

const meta: Meta<typeof UserToolbar> = {
  title: 'Board/UserToolbar',
  component: UserToolbar,
  parameters: {
    docs: {
      description: {
        component: 'Kompakte User-Toolbar mit Presenter-Mode und Follow-me. Name/Avatar werden über ein Settings-Dialog (Gear) editiert.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof UserToolbar>;

export const Minimal: Story = {
  render: () => (
    <div style={{ padding: 16 }}>
      <UserToolbar
        displayName="User"
        onChangeName={() => {}}
        onChangeAvatar={() => {}}
        variant="default"
      />
    </div>
  ),
};

export const Compact: Story = {
  render: () => (
    <div style={{ padding: 16 }}>
      <UserToolbar
        displayName="User"
        onChangeName={() => {}}
        onChangeAvatar={() => {}}
        variant="compact"
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Kompakt: zeigt nur Avatar + Settings (Gear). Presenter/Follow toggles sind ausgeblendet.',
      },
    },
  },
};



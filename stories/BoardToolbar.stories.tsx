import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BoardToolbar } from '@/components/board/board-toolbar';

const meta: Meta<typeof BoardToolbar> = {
  title: 'Board/BoardToolbar',
  component: BoardToolbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Toolbar für Board-Controls: Zoom In/Out/Reset sowie Presenter/Follow.\n' +
          '\n' +
          'Usage:\n' +
          '1) Present: Broadcastet die lokale View (Pan/Zoom) als Presenter.\n' +
          '2) Follow: Folgt der Presenter-View (Pan/Zoom werden übernommen).\n' +
          '3) Zoom/Reset: Steuert die Canvas-Ansicht.\n' +
          '\n' +
          'Hinweis: In der Board-Demo wird die Toolbar als Overlay oben links angezeigt.',
      },
    },
  },
};
export default meta;

type Story = StoryObj<typeof BoardToolbar>;

export const Default: Story = {
  render: () => (
    <div style={{ position: 'relative', width: 600, height: 200, border: '1px dashed #ddd' }}>
      <div style={{ position: 'absolute', top: 16, left: 16 }}>
        <BoardToolbar />
      </div>
      <div style={{ position: 'absolute', bottom: 16, left: 16, color: '#666', fontSize: 12 }}>
        Die Buttons ändern den globalen Store-Zustand (Presenter/Follow, Zoom/Pan).
      </div>
    </div>
  ),
};

// Removed duplicate meta block and legacy variants

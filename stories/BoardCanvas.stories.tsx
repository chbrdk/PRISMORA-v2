import React, { useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { BoardCanvas } from '@/components/board/board-canvas';
import { BoardToolbar } from '@/components/board/board-toolbar';
import { UserToolbar } from '@/components/board/user-toolbar';
import { useBoardStore } from '@/stores/board-store';
import { PresenceList } from '@/components/board/presence-list';
import { Prismion, Connection, Board, Presence } from '@/types/prismora';

const meta: Meta<typeof BoardCanvas> = {
  title: 'Board/BoardCanvas',
  component: BoardCanvas,
  argTypes: {
    background: { control: { type: 'select' }, options: ['plain','dots','grid'], description: 'Hintergrundmuster' },
    backgroundColor: { control: 'color', description: 'Hintergrundfarbe' },
    patternColor: { control: 'color', description: 'Musterfarbe (Grid/Dots)' },
    patternSize: { control: { type: 'number', min: 8, max: 64, step: 1 }, description: 'Mustergröße in px' },
  },
};
export default meta;

type Story = StoryObj<typeof BoardCanvas>;

const DemoInitializer: React.FC = () => {
  const set = useBoardStore((s) => s);
  useEffect(() => {
    const now = new Date().toISOString();
    const p1: Prismion = {
      id: 'p1',
      boardId: 'b1',
      title: 'Prompt',
      prompt: 'Wie skalieren wir das System?',
      colorToken: '#0ea5e9',
      tags: [],
      position: { x: 80, y: 80, zIndex: 1 },
      size: { w: 320, h: 180, minW: 240, minH: 120 },
      ports: {
        top: { id: 'p1-top', side: 'top', capacity: 'multi' },
        right: { id: 'p1-right', side: 'right', capacity: 'multi' },
        bottom: { id: 'p1-bottom', side: 'bottom', capacity: 'multi' },
        left: { id: 'p1-left', side: 'left', capacity: 'multi' },
      },
      state: 'active',
      createdBy: 'u1',
      createdAt: now,
      updatedAt: now,
      revision: 1,
      kind: 'prompt',
      content: { type: 'prompt', prompt: 'Wie skalieren wir das System?' },
    };

    const p2: Prismion = {
      id: 'p2',
      boardId: 'b1',
      title: 'Result Text',
      prompt: '—',
      colorToken: '#0ea5e9',
      tags: [],
      position: { x: 520, y: 220, zIndex: 1 },
      size: { w: 480, h: 300, minW: 240, minH: 120 },
      ports: {
        top: { id: 'p2-top', side: 'top', capacity: 'multi' },
        right: { id: 'p2-right', side: 'right', capacity: 'multi' },
        bottom: { id: 'p2-bottom', side: 'bottom', capacity: 'multi' },
        left: { id: 'p2-left', side: 'left', capacity: 'multi' },
      },
      state: 'active',
      createdBy: 'u1',
      createdAt: now,
      updatedAt: now,
      revision: 1,
      kind: 'result.text',
      content: { type: 'result.text', text: 'Skalierungsideen...\n\n1) Services entkoppeln...\n2) Caching Layer...' },
    };

    const c1: Connection = {
      id: 'c1',
      boardId: 'b1',
      fromPrismionId: 'p1',
      toPrismionId: 'p2',
      fromPort: 'right',
      toPort: 'left',
      label: 'flows to',
      color: '#0ea5e9',
      createdBy: 'u1',
      createdAt: now,
    };

    set.setPrismions([p1, p2]);
    set.setConnections([c1]);
  }, []);
  return null;
};

export const Interactive: Story = {
  args: {
    board: {
      id: 'b1',
      shareId: 'demo',
      title: 'Demo Board',
      description: 'Storybook preview',
      isPublic: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      canvasSettings: {
        backgroundColor: '#ffffff',
        patternColor: '#e5e7eb',
        patternSize: 24,
        background: 'grid',
      },
    } as Board,
    prismions: [],
    connections: [],
    participants: [],
  },
  render: (args) => (
    <div style={{ width: '100%', height: '600px', position: 'relative' }}>
      <DemoInitializer />
      <div style={{ position: 'absolute', top: 12, left: 12, zIndex: 50 }}>
        <BoardToolbar />
      </div>
      <PresenceListWrapper />
      <div style={{ position: 'absolute', top: 12, right: 12, zIndex: 50 }}>
        <UserToolbarWrapper />
      </div>
      <BoardCanvas {...args} />
    </div>
  ),
};

const UserToolbarWrapper: React.FC = () => {
  const [profile, setProfile] = React.useState({
    displayName: 'Demo User',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  });
  
  return (
    <UserToolbar
      displayName={profile.displayName}
      avatarUrl={profile.avatarUrl}
      onChangeName={(name) => setProfile(prev => ({ ...prev, displayName: name }))}
      onChangeAvatar={(url) => setProfile(prev => ({ ...prev, avatarUrl: url }))}
      variant="compact"
    />
  );
};

const PresenceListWrapper: React.FC = () => {
  const [presences] = React.useState<Presence[]>([
    { userId: 'U', boardId: 'b1', cursor: { x: 200, y: 160 }, selectedPrismionIds: [], colorToken: '#0ea5e9', lastActiveAt: new Date().toISOString() },
    { userId: 'A', boardId: 'b1', cursor: { x: 420, y: 300 }, selectedPrismionIds: [], colorToken: '#10b981', lastActiveAt: new Date(Date.now() - 1000).toISOString() },
    { userId: 'B', boardId: 'b1', cursor: { x: 640, y: 120 }, selectedPrismionIds: [], colorToken: '#f59e0b', lastActiveAt: new Date(Date.now() - 2000).toISOString() },
    { userId: 'C', boardId: 'b1', cursor: { x: 520, y: 420 }, selectedPrismionIds: [], colorToken: '#ef4444', lastActiveAt: new Date(Date.now() - 3000).toISOString() },
    { userId: 'D', boardId: 'b1', cursor: { x: 320, y: 240 }, selectedPrismionIds: [], colorToken: '#6366f1', lastActiveAt: new Date(Date.now() - 4000).toISOString() },
    { userId: 'E', boardId: 'b1', cursor: { x: 280, y: 360 }, selectedPrismionIds: [], colorToken: '#14b8a6', lastActiveAt: new Date(Date.now() - 5000).toISOString() },
  ]);
  
  return (
    <div style={{ position: 'absolute', top: 12, left: 220, zIndex: 50 }}>
      <PresenceList presences={presences} />
    </div>
  );
};


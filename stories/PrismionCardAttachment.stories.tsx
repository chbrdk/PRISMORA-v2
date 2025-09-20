import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { PrismionCard } from '@/components/board/prismion-card';
import { Prismion } from '@/types/prismora';

const meta: Meta<typeof PrismionCard> = {
  title: 'Board/PrismionCard/Attachment Image',
  component: PrismionCard,
  parameters: { layout: 'padded' },
  argTypes: {
    onUploadAttachment: { action: 'attachment:upload' },
    onDelete: { action: 'card:delete' },
    onLockToggle: { action: 'card:lock-toggle' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

const attachmentImageEmpty: Prismion = {
  id: 'attach-img-1',
  boardId: 'demo-board',
  title: 'Image Attachment',
  prompt: 'Drop or upload an image',
  colorToken: 'hsl(var(--primary))',
  tags: [],
  position: { x: 0, y: 0, zIndex: 1 },
  size: { w: 320, h: 220, minW: 240, minH: 160 },
  ports: {
    top: { id: 'port_top', side: 'top', capacity: 'multi' },
    right: { id: 'port_right', side: 'right', capacity: 'multi' },
    bottom: { id: 'port_bottom', side: 'bottom', capacity: 'multi' },
    left: { id: 'port_left', side: 'left', capacity: 'multi' },
  },
  state: 'active',
  createdBy: 'user_1',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  revision: 1,
  kind: 'attachment.image',
  // content intentionally undefined to show dropzone
};

const attachmentImageWithContent: Prismion = {
  ...attachmentImageEmpty,
  id: 'attach-img-2',
  title: 'Image Attachment (preview)',
  content: { type: 'attachment.image', url: 'https://picsum.photos/560/320', name: 'example.jpg', sizeBytes: 150_000 },
};

export const EmptyDropzone: Story = {
  args: {
    prismion: attachmentImageEmpty,
    selected: true,
  },
};

export const WithImage: Story = {
  args: {
    prismion: attachmentImageWithContent,
    selected: false,
  },
};



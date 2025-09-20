import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import PrismionPorts, { PrismionPortsProps } from '@/components/board/prismion-ports';
import { PortSide } from '@/types/prismora';

const meta: Meta<typeof PrismionPorts> = {
  title: 'Board/PrismionPorts',
  component: PrismionPorts,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onConnectorClick: { action: 'connector:click' },
    onConnectorDrag: { action: 'connector:drag' },
    onCreatePrismion: { action: 'radial:create-prismion' },
    onAttachToExisting: { action: 'radial:attach-to-existing' },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

function CardMock({ children }: { children?: React.ReactNode }) {
  return (
    <div className="relative w-[220px] h-[140px] rounded-xl border bg-white shadow-sm group">
      <div className="absolute inset-0 rounded-xl" />
      {children}
    </div>
  );
}

function ShowPorts({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        .sb-show-ports [data-port-container] > div { opacity: 1 !important; }
      `}</style>
      <div className="sb-show-ports">{children}</div>
    </>
  );
}

export const Default: Story = {
  render: (args) => (
    <ShowPorts>
      <CardMock>
        <PrismionPorts {...args} />
      </CardMock>
    </ShowPorts>
  ),
};

export const AllPorts: Story = {
  render: (args) => (
    <ShowPorts>
      <div className="grid grid-cols-2 gap-6">
        <CardMock>
          <PrismionPorts {...args} />
        </CardMock>
        <CardMock>
          <PrismionPorts {...args} />
        </CardMock>
        <CardMock>
          <PrismionPorts {...args} />
        </CardMock>
        <CardMock>
          <PrismionPorts {...args} />
        </CardMock>
      </div>
    </ShowPorts>
  ),
};

export const RadialMenuActions: Story = {
  name: 'Radial menu actions (see Actions panel)',
  render: (args) => (
    <ShowPorts>
      <CardMock>
        <PrismionPorts {...args} />
      </CardMock>
    </ShowPorts>
  ),
};


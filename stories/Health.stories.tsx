// Minimal health-check story to verify Storybook boots
import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const meta: Meta = {
  title: 'Health/Check',
};

export default meta;
type Story = StoryObj;

export const Works: Story = {
  render: () => (
    <div style={{ padding: 16 }}>
      <h3>Storybook läuft ✅</h3>
      <p>Dies ist eine minimalistische Story zum Health-Check.</p>
    </div>
  ),
};


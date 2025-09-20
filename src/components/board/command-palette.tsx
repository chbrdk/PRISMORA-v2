'use client';

import React from 'react';
import { useBoardStore } from '@/stores/board-store';

export function CommandPalette() {
  const { ui, setCommandPaletteOpen } = useBoardStore();
  const { commandPaletteOpen } = ui;

  if (!commandPaletteOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm"
      onClick={() => setCommandPaletteOpen(false)}
    >
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-[35px] shadow-xl p-4 min-w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-sm text-muted-foreground mb-2">Command Palette</div>
        <div className="text-xs text-muted-foreground">Coming soon...</div>
      </div>
    </div>
  );
}

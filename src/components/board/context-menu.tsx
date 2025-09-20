'use client';

import React from 'react';
import { useBoardStore } from '@/stores/board-store';

export function ContextMenu() {
  const { ui, setContextMenu } = useBoardStore();
  const { contextMenu } = ui;

  if (!contextMenu.open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50"
      onClick={() => setContextMenu({ open: false, x: 0, y: 0 })}
    >
      <div
        className="absolute bg-background border border-border rounded-[35px] shadow-lg p-2 min-w-48"
        style={{
          left: contextMenu.x,
          top: contextMenu.y,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-sm text-muted-foreground px-3 py-2">
          Context Menu
        </div>
      </div>
    </div>
  );
}

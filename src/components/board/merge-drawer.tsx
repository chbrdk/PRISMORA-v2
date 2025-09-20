'use client';

import React from 'react';
import { useBoardStore } from '@/stores/board-store';

export function MergeDrawer() {
  const { ui, setMergeDrawerOpen } = useBoardStore();
  const { mergeDrawerOpen } = ui;

  if (!mergeDrawerOpen) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 h-96 bg-background border-t border-border shadow-lg z-40">
      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-2">Merge Drawer</div>
        <div className="text-xs text-muted-foreground">Coming soon...</div>
      </div>
    </div>
  );
}

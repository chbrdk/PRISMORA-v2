'use client';

import React from 'react';
import { useBoardStore } from '@/stores/board-store';

export function InspectorPanel() {
  const { ui, setInspectorOpen } = useBoardStore();
  const { inspectorOpen } = ui;

  if (!inspectorOpen) {
    return null;
  }

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-background border-l border-border shadow-lg z-40">
      <div className="p-4">
        <div className="text-sm text-muted-foreground mb-2">Inspector Panel</div>
        <div className="text-xs text-muted-foreground">Coming soon...</div>
      </div>
    </div>
  );
}

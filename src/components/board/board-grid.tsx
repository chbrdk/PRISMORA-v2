'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface BoardGridProps {
  visible: boolean;
  snapToGrid: boolean;
  zoom: number;
  className?: string;
}

export function BoardGrid({ visible, snapToGrid, zoom, className }: BoardGridProps) {
  if (!visible) {
    return null;
  }

  const gridSize = 20 * zoom;

  return (
    <div
      className={cn("absolute inset-0 pointer-events-none", className)}
      style={{
        backgroundImage: `
          linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px),
          linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)
        `,
        backgroundSize: `${gridSize}px ${gridSize}px`,
        opacity: 0.3,
      }}
    />
  );
}

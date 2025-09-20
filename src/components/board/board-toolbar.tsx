'use client';

import React from 'react';
import { useBoardStore } from '@/stores/board-store';
import { cn } from '@/lib/utils';

/**
 * BoardToolbar
 *
 * Minimal-Toolbar für Board-Controls:
 * - Zoom In/Out + Reset
 * - Presenter starten/stoppen (broadcast der lokalen View)
 * - Follow/Unfollow (folgt Presenter-View)
 *
 * Hinweis: Dieses UI-Element ist als Overlay gedacht und sollte nicht pannen.
 */
export interface BoardToolbarProps {
  className?: string;
}

export function BoardToolbar({ className }: BoardToolbarProps) {
  const { canvas, ui, setZoom, setPan, setPresenterMode, setPresenterUser, setPresenterView, setFollowingPresenter } = useBoardStore();

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-xl border bg-white/90 backdrop-blur px-2 py-1 shadow-md',
        className
      )}
      style={{ pointerEvents: 'auto' }}
    >
      <button
        className="w-8 h-8 rounded-md border text-sm font-semibold hover:bg-gray-50"
        onClick={() => setZoom(Math.min(3, canvas.zoom * 1.2))}
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        className="w-8 h-8 rounded-md border text-sm font-semibold hover:bg-gray-50"
        onClick={() => setZoom(Math.max(0.1, canvas.zoom * 0.8))}
        aria-label="Zoom out"
      >
        −
      </button>
      <button
        className="h-8 px-2 rounded-md border text-xs font-medium hover:bg-gray-50"
        onClick={() => { setZoom(1); setPan({ x: 0, y: 0 }); }}
        aria-label="Reset view"
      >
        Reset
      </button>
      <div className="w-px h-6 bg-gray-200 mx-1" />
      <button
        className="h-8 px-2 rounded-md border text-xs font-medium hover:bg-gray-50"
        onClick={() => {
          setPresenterMode(!ui.presenterMode);
          setPresenterUser('u-local');
        }}
      >
        {ui.presenterMode ? 'Stop Present' : 'Present'}
      </button>
      <button
        className="h-8 px-2 rounded-md border text-xs font-medium hover:bg-gray-50"
        onClick={() => setFollowingPresenter(!ui.followingPresenter)}
      >
        {ui.followingPresenter ? 'Unfollow' : 'Follow'}
      </button>
      <span className="ml-1 text-xs text-gray-500 select-none">{Math.round(canvas.zoom * 100)}%</span>
    </div>
  );
}

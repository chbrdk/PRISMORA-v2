'use client';

import React from 'react';
import { Presence } from '@/types/prismora';
import { UserBadge } from '@/components/ui/user-badge';
import { useBoardStore } from '@/stores/board-store';
import { cn } from '@/lib/utils';

/**
 * PresenceList
 *
 * Überlappende Liste von User-Badges (mit +N Overflow),
 * Presenter-Highlight und Click-to-Jump zum Cursor.
 */
export interface PresenceListProps {
  presences: Presence[];
  maxVisible?: number;
  className?: string;
}

export function PresenceList({ presences, maxVisible = 5, className }: PresenceListProps) {
  const { ui } = useBoardStore();
  // Deduplicate by userId and sort by lastActiveAt desc
  const uniqueByUser = Array.from(new Map(presences.map(p => [p.userId, p])).values())
    .sort((a, b) => new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime());

  const visible = uniqueByUser.slice(0, maxVisible);
  const extra = uniqueByUser.length - visible.length;

  return (
    <div className={cn('flex items-center', className)} style={{ pointerEvents: 'auto' }}>
      <div className="flex -space-x-2">
        {visible.map((p) => (
          <div
            key={p.userId}
            className="ring-2 ring-white rounded-full cursor-pointer"
            onClick={() => {
              const state = (useBoardStore as any).getState();
              const start = { ...state.canvas.pan } as { x: number; y: number };
              const zoom = state.canvas.zoom as number;
              const vw = window.innerWidth;
              const vh = window.innerHeight;
              const target = { x: vw / 2 - zoom * p.cursor.x, y: vh / 2 - zoom * p.cursor.y };
              const duration = 300;
              const startTime = performance.now();
              const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
              const step = (now: number) => {
                const t = Math.min(1, (now - startTime) / duration);
                const k = easeOutCubic(t);
                state.setPan({ x: start.x + (target.x - start.x) * k, y: start.y + (target.y - start.y) * k });
                if (t < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            }}
            title={`Jump to ${p.userId}`}
          >
            <UserBadge
              name={p.userId}
              colorToken={p.colorToken}
              size="md"
              lastActiveAt={p.lastActiveAt}
              showTooltip
              state={ui.presenterUserId === p.userId ? 'presenting' : 'default'}
            />
          </div>
        ))}
        {extra > 0 && (
          <div className="h-8 w-8 rounded-full ring-2 ring-white border border-dashed bg-white text-xs text-gray-600 flex items-center justify-center select-none">
            +{extra}
          </div>
        )}
      </div>
    </div>
  );
}



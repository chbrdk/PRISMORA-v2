'use client';

import React, { useEffect, useRef } from 'react';
import { useBoardStore } from '@/stores/board-store';
import { UserBadge } from '@/components/ui/user-badge';
import { Presence } from '@/types/prismora';
import { cn } from '@/lib/utils';

/**
 * PresenceLayer
 *
 * Zeichnet Cursors der Nutzer auf dem Board.
 * - Lokaler Cursor via mousemove (Badge + Name)
 * - Externe Presences aus Store als Badges
 * - Presenter-Status wird als UserBadge 'presenting' angezeigt
 */
export interface PresenceCursorProps {
  className?: string;
}

export function PresenceCursor({ className }: PresenceCursorProps) {
  const { profile, canvas, ui } = useBoardStore();
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!cursorRef.current) return;
      const el = cursorRef.current;
      // Translate client coords into canvas coordinates (inverse of pan/zoom)
      const x = (e.clientX - canvas.pan.x) / canvas.zoom;
      const y = (e.clientY - canvas.pan.y) / canvas.zoom;
      el.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, [canvas.pan.x, canvas.pan.y, canvas.zoom]);

  return (
    <div className={className} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <div
        ref={cursorRef}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          transform: 'translate(-9999px, -9999px)',
          willChange: 'transform',
          transition: 'transform 0.04s linear',
        }}
      >
        <div className="flex items-center gap-1">
          <UserBadge
            name={profile.displayName || 'User'}
            avatarUrl={profile.avatarUrl}
            colorToken={profile.colorToken}
            size="sm"
            showTooltip={false}
            state={ui.presenterUserId === profile.userId ? 'presenting' : 'default'}
          />
          <span className="text-[10px] px-1 py-0.5 rounded bg-white/90 border shadow-sm text-gray-700">
            {profile.displayName}
          </span>
        </div>
      </div>
    </div>
  );
}

export interface PresenceLayerProps {
  presences: Presence[];
  className?: string;
}

export function PresenceLayer({ presences, className }: PresenceLayerProps) {
  const { ui } = useBoardStore();
  return (
    <div className={cn("absolute inset-0 pointer-events-none", className)}>
      {/* Local user cursor badge */}
      <PresenceCursor />
      {presences.map((presence) => (
        <div
          key={`${presence.userId}_${presence.boardId}`}
          className="absolute"
          style={{ left: presence.cursor.x, top: presence.cursor.y, transform: 'translate(-50%, -50%)' }}
        >
          <UserBadge
            name={presence.userId}
            colorToken={presence.colorToken}
            size="sm"
            lastActiveAt={presence.lastActiveAt}
            showTooltip
            state={ui.presenterUserId === presence.userId ? 'presenting' : 'default'}
          />
        </div>
      ))}
    </div>
  );
}

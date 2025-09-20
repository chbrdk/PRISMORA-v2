'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';

export interface PrismionToolbarProps {
  className?: string;
  onBranch?: () => void;
  onMerge?: () => void;
  onLockToggle?: () => void;
  onArchive?: () => void;
  onDelete?: () => void;
  locked?: boolean;
  variant?: 'bar' | 'radial';
}

export function PrismionToolbar({
  className,
  onBranch,
  onMerge,
  onLockToggle,
  onArchive,
  onDelete,
  locked = false,
  variant = 'radial',
}: PrismionToolbarProps) {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const blockMouseDown = useCallback((e: React.MouseEvent) => { e.stopPropagation(); e.preventDefault(); }, []);
  const [entered, setEntered] = useState(false);

  const toggle = useCallback(() => {
    setOpen(v => {
      const next = !v
      console.log('[PrismionToolbar] toggle', { next })
      return next
    })
  }, []);

  // Close on outside / ESC
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      // Close only if click is outside the whole toolbar (button + overlay)
      if (wrapperRef.current && wrapperRef.current.contains(target)) {
        return;
      }
      setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown, true);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onDown, true);
    };
  }, [open]);

  // Manage entrance animation per open cycle
  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [open]);

  const actions: { key: string; label: string; icon: string; onClick?: () => void; colorClass?: string }[] = [
    { key: 'branch', label: 'Branch', icon: 'BranchIcon', onClick: onBranch, colorClass: '' },
    { key: 'merge', label: 'Merge', icon: 'ArrowRightIcon', onClick: onMerge, colorClass: '' },
    { key: 'lock', label: locked ? 'Unlock' : 'Lock', icon: locked ? 'LockOpenIcon' : 'LockClosedIcon', onClick: onLockToggle, colorClass: '' },
    { key: 'archive', label: 'Archive', icon: 'ArchiveBoxIcon', onClick: onArchive, colorClass: '' },
    { key: 'delete', label: 'Delete', icon: 'TrashIcon', onClick: onDelete, colorClass: 'text-red-600 hover:text-red-700' },
  ];

  return (
    <div className={cn('relative select-none', className)}>
      <div ref={wrapperRef} className="relative inline-flex items-center justify-center overflow-visible" data-open={open ? 'true' : 'false'}>
        {/* Toggle Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={toggle}
          ref={btnRef}
          onMouseDown={blockMouseDown}
          className={cn('h-8 w-8 rounded-full p-0 shadow-sm bg-background/80 backdrop-blur border border-border', open && 'ring-2 ring-primary')}
          title={open ? 'Toolbar ausblenden' : 'Toolbar anzeigen'}
        >
          <Icon name={open ? 'XMarkIcon' : 'EllipsisHorizontalIcon'} size="sm" />
        </Button>

        {variant === 'bar' && (
          // Animated horizontal bar under button
          <div
            className="absolute left-1/2 top-full -translate-x-1/2 mt-2 overflow-hidden"
            style={{ pointerEvents: open ? 'auto' : 'none' }}
          >
            <div
              className={cn(
                'origin-top scale-95 opacity-0 translate-y-[-4px] transition-all duration-200 ease-out',
                open && 'scale-100 opacity-100 translate-y-0'
              )}
            >
              <div className="flex items-center gap-1 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-full px-2 py-1 shadow-lg">
                {actions.map((a) => (
                  <Button
                    key={a.key}
                    size="sm"
                    variant="ghost"
                    className={cn('h-8 px-2', a.key === 'delete' && 'text-red-600 hover:text-red-700')}
                    onClick={a.onClick}
                    onMouseDown={blockMouseDown}
                    title={a.label}
                  >
                    <Icon name={a.icon} size="sm" className="mr-1" /> {a.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {variant === 'radial' && open && (
          // Radial fan-out anchored to wrapper (no viewport drift)
          <div
            className="absolute left-1/2 top-1/2"
            style={{
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              pointerEvents: 'auto',
            }}
          >
            {actions.map((a, idx) => {
              const count = actions.length;
              const spanDeg = 160;
              const startDeg = -120;
              const step = count > 1 ? spanDeg / (count - 1) : 0;
              const angleDeg = startDeg + idx * step;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 64;
              const tx = Math.cos(angleRad) * radius;
              const ty = Math.sin(angleRad) * radius;
              const delay = `${idx * 0.06}s`;
              return (
                <button
                  key={a.key}
                  onClick={(e) => { e.stopPropagation(); a.onClick?.(); }}
                  onMouseDown={blockMouseDown}
                  title={a.label}
                  className={cn(
                    'absolute h-9 w-9 -ml-[18px] -mt-[18px] rounded-full bg-white/95 border border-gray-200 shadow-md flex items-center justify-center pointer-events-auto transition-all ease-out',
                    a.key === 'delete' && 'text-red-600 hover:text-red-700'
                  )}
                  style={{
                    transform: `translate(${tx}px, ${ty}px) scale(${entered ? 1 : 0.85})`,
                    opacity: entered ? 1 : 0,
                    transitionDuration: '220ms',
                    transitionProperty: 'transform, opacity',
                    transitionDelay: delay,
                  }}
                >
                  <Icon name={a.icon} size="sm" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default PrismionToolbar;



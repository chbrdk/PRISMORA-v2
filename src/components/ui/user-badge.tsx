'use client';

import React from 'react';
import { AvatarWithFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export type UserBadgeSize = 'xs' | 'sm' | 'md' | 'lg';
export type UserBadgeState = 'default' | 'presenting' | 'inactive';

export interface UserBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  avatarUrl?: string;
  colorToken?: string; // optional ring/accent color
  size?: UserBadgeSize;
  state?: UserBadgeState;
  lastActiveAt?: string; // ISO string; if provided, overrides state to inactive after 5min
  showTooltip?: boolean;
}

const sizeMap: Record<UserBadgeSize, { wrapper: string; avatar: 'xs' | 'sm' | 'default' | 'lg'; } > = {
  xs: { wrapper: 'h-5 w-5', avatar: 'xs' },
  sm: { wrapper: 'h-6 w-6', avatar: 'sm' },
  md: { wrapper: 'h-8 w-8', avatar: 'default' },
  lg: { wrapper: 'h-10 w-10', avatar: 'lg' },
};

/**
 * UserBadge
 *
 * Wiederverwendbares Avatar/Initialien-Badge mit:
 * - States: default, presenting (Puls + LIVE), inactive (ausgegraut)
 * - Timed-Inactive via lastActiveAt (>5min)
 * - Tooltip mit Namen (unterhalb)
 * - Größen: xs/sm/md/lg
 */
export function UserBadge({
  name,
  avatarUrl,
  colorToken = '#0ea5e9',
  size = 'md',
  state = 'default',
  lastActiveAt,
  showTooltip = true,
  className,
  ...rest
}: UserBadgeProps) {
  const [hover, setHover] = React.useState(false);

  // Derive inactive state from lastActiveAt if provided
  const isInactiveTimed = React.useMemo(() => {
    if (!lastActiveAt) return false;
    const diff = Date.now() - new Date(lastActiveAt).getTime();
    return diff >= 5 * 60 * 1000;
  }, [lastActiveAt]);

  const effectiveState: UserBadgeState = isInactiveTimed ? 'inactive' : state;

  return (
    <div
      className={cn('relative inline-flex items-center justify-center', className)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      title={name}
      {...rest}
    >
      <div
        className={cn(
          'rounded-full ring-2 ring-white border shadow-sm overflow-hidden flex items-center justify-center',
          sizeMap[size].wrapper,
          effectiveState === 'inactive' && 'opacity-60 grayscale',
        )}
        style={{ borderColor: colorToken }}
      >
        <AvatarWithFallback
          size={sizeMap[size].avatar}
          variant="outline"
          fallback={(name?.[0] || 'U').toUpperCase()}
          src={avatarUrl}
        />
      </div>

      {effectiveState === 'presenting' && (
        <span
          className="absolute inset-0 rounded-full animate-ping"
          style={{ boxShadow: `0 0 0 2px ${colorToken}33`, border: `2px solid ${colorToken}` }}
        />
      )}

      {effectiveState === 'presenting' && (
        <div
          className="absolute -top-2 -right-2 bg-red-600 text-white text-[9px] font-semibold rounded px-1 py-[1px] shadow"
          style={{ pointerEvents: 'none' }}
        >
          LIVE
        </div>
      )}

      {showTooltip && hover && (
        <div
          className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white/95 border rounded px-2 py-1 text-[11px] shadow-md pointer-events-none"
        >
          {name}
        </div>
      )}
    </div>
  );
}



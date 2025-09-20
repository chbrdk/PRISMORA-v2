'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Settings, X } from 'lucide-react';
import { AvatarWithFallback } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { useBoardStore } from '@/stores/board-store';

/**
 * UserToolbar
 *
 * Kompakte Toolbar für User-Einstellungen und Presenter/Follow Controls.
 * - Variant 'compact': Avatar + Gear (Dialog)
 * - Variant 'default': + Presenter/Follow Toggles
 */
export interface UserToolbarProps {
  displayName: string;
  avatarUrl?: string;
  onChangeName: (name: string) => void;
  onChangeAvatar: (url: string) => void;
  onToggleFollow?: (enabled: boolean) => void;
  variant?: 'default' | 'compact';
  className?: string;
}

export function UserToolbar({ displayName, avatarUrl, onChangeName, onChangeAvatar, onToggleFollow, variant = 'default', className }: UserToolbarProps) {
  const { ui, setPresenterMode } = useBoardStore();
  const [localFollow, setLocalFollow] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [nameDraft, setNameDraft] = React.useState(displayName);
  const [avatarDraft, setAvatarDraft] = React.useState(avatarUrl || '');

  return (
    <div
      className={cn(
        'inline-flex items-center gap-3 rounded-xl border bg-white/90 backdrop-blur px-3 py-2 shadow-md',
        className
      )}
      style={{ pointerEvents: 'auto' }}
    >
      <AvatarWithFallback size="sm" variant="outline" fallback={displayName?.[0]?.toUpperCase() || 'U'} src={avatarUrl} />
      {/* Settings gear opens dialog for name/avatar */}
      <button
        className="p-1 rounded-md hover:bg-gray-100 transition-colors"
        aria-label="Open settings"
        onClick={() => { setNameDraft(displayName); setAvatarDraft(avatarUrl || ''); setOpen(true); }}
      >
        <Settings className="w-4 h-4 text-gray-600" />
      </button>
      {variant === 'default' && (
        <>
          <div className="w-px h-6 bg-gray-200" />
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Presenter</span>
            <Switch
              checked={ui.presenterMode}
              onChange={(e) => setPresenterMode(e.target.checked)}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">Follow me</span>
            <Switch
              checked={localFollow}
              onChange={(e) => {
                setLocalFollow(e.target.checked);
                onToggleFollow?.(e.target.checked);
              }}
            />
          </div>
        </>
      )}
      {/* Settings Dialog */}
      {open && (
        <div
          className="fixed inset-0 z-[9999]"
          style={{ pointerEvents: 'auto' }}
          onMouseDown={() => setOpen(false)}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 min-w-[360px] max-w-[90vw] rounded-xl border bg-white p-4 shadow-xl"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                <h3 className="text-sm font-semibold">User Settings</h3>
              </div>
              <button 
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                aria-label="Close settings" 
                onClick={() => setOpen(false)}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-xs text-gray-600">Display name</label>
                <Input className="mt-1" value={nameDraft} onChange={(e) => setNameDraft(e.target.value)} placeholder="Your name" />
              </div>
              <div>
                <label className="text-xs text-gray-600">Avatar URL</label>
                <Input className="mt-1" value={avatarDraft} onChange={(e) => setAvatarDraft(e.target.value)} placeholder="https://..." />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button className="h-8 px-3 rounded-md border text-xs hover:bg-gray-50" onClick={() => setOpen(false)}>Cancel</button>
              <button
                className="h-8 px-3 rounded-md bg-primary text-white text-xs hover:opacity-90"
                onClick={() => { onChangeName(nameDraft.trim()); onChangeAvatar(avatarDraft.trim()); setOpen(false); }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



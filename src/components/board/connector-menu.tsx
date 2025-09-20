'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { MessageSquare, FileText, Image, Video, Link, X } from 'lucide-react';

export interface ConnectorMenuProps {
  isOpen: boolean;
  position: { x: number; y: number };
  port: 'top' | 'right' | 'bottom' | 'left'; // Port direction for menu orientation
  onClose: () => void;
  onCreatePrismion: (type: 'prompt' | 'file' | 'image' | 'video' | 'link') => void;
  onAttachToExisting: (type: 'file' | 'image' | 'video' | 'link') => void;
  className?: string;
}

export function ConnectorMenu({ 
  isOpen, 
  position, 
  port,
  onClose, 
  onCreatePrismion, 
  onAttachToExisting, 
  className 
}: ConnectorMenuProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(false);
  const blockMouseDown = useCallback((e: React.MouseEvent) => { 
    e.stopPropagation(); 
    e.preventDefault(); 
  }, []);

  // Close on outside / ESC (same logic as PrismionToolbar)
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (wrapperRef.current && wrapperRef.current.contains(target)) {
        return;
      }
      onClose();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('mousedown', onDown, true);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('mousedown', onDown, true);
    };
  }, [isOpen, onClose]);

  // Manage entrance animation per open cycle (same as PrismionToolbar)
  useEffect(() => {
    if (!isOpen) {
      setEntered(false);
      return;
    }
    const id = requestAnimationFrame(() => setEntered(true));
    return () => cancelAnimationFrame(id);
  }, [isOpen]);

  if (!isOpen) return null;

  // Actions in radial layout (like PrismionToolbar)
  const actions = [
    { 
      key: 'prompt', 
      label: 'Prompt', 
      icon: MessageSquare, 
      onClick: () => { onCreatePrismion('prompt'); onClose(); },
      colorClass: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' 
    },
    { 
      key: 'file', 
      label: 'Dokument', 
      icon: FileText, 
      onClick: () => { onAttachToExisting('file'); onClose(); },
      colorClass: 'text-gray-600 hover:text-gray-700 hover:bg-gray-50' 
    },
    { 
      key: 'image', 
      label: 'Bild', 
      icon: Image, 
      onClick: () => { onAttachToExisting('image'); onClose(); },
      colorClass: 'text-green-600 hover:text-green-700 hover:bg-green-50' 
    },
    { 
      key: 'video', 
      label: 'Video', 
      icon: Video, 
      onClick: () => { onAttachToExisting('video'); onClose(); },
      colorClass: 'text-purple-600 hover:text-purple-700 hover:bg-purple-50' 
    },
    { 
      key: 'link', 
      label: 'Link', 
      icon: Link, 
      onClick: () => { onAttachToExisting('link'); onClose(); },
      colorClass: 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' 
    },
  ];

  return (
    <div className={cn('relative z-50 select-none', className)}>
      <div 
        ref={wrapperRef} 
        className="relative inline-flex items-center justify-center overflow-visible"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        {/* Center Button (like PrismionToolbar toggle) */}
        <button
          onClick={onClose}
          onMouseDown={blockMouseDown}
          className="h-10 w-10 rounded-full bg-white/95 backdrop-blur border-2 border-primary shadow-lg flex items-center justify-center ring-2 ring-primary/20"
          title="Schließen"
        >
          <X className="w-5 h-5 text-primary" />
        </button>

        {/* Radial fan-out (exactly like PrismionToolbar) */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            pointerEvents: 'auto',
          }}
        >
          {actions.map((action, idx) => {
            const count = actions.length;
            const spanDeg = 160; // Fan span
            const radius = 70;
            
            // Adjust start angle based on port direction
            let startDeg: number;
            switch (port) {
              case 'top':
                startDeg = -260; // Fan upwards (270° - 10°)
                break;
              case 'right':
                startDeg = -80; // Fan to the right (0° - 80°)
                break;
              case 'bottom':
                startDeg = 10; // Fan downwards (90° - 80°)
                break;
              case 'left':
                startDeg = 100; // Fan to the left (180° - 80°)
                break;
            }
            
            const step = count > 1 ? spanDeg / (count - 1) : 0;
            const angleDeg = startDeg + idx * step;
            const angleRad = (angleDeg * Math.PI) / 180;
            const tx = Math.cos(angleRad) * radius;
            const ty = Math.sin(angleRad) * radius;
            const delay = `${idx * 0.08}s`;

            const IconComponent = action.icon;

            return (
              <button
                key={action.key}
                onClick={(e) => { 
                  e.stopPropagation(); 
                  action.onClick(); 
                }}
                onMouseDown={blockMouseDown}
                title={action.label}
                className={cn(
                  'absolute h-11 w-11 -ml-[22px] -mt-[22px] rounded-full bg-white/95 border-2 border-gray-200 shadow-lg flex items-center justify-center pointer-events-auto transition-all ease-out hover:scale-110 hover:shadow-xl',
                  action.colorClass
                )}
                style={{
                  transform: `translate(${tx}px, ${ty}px) scale(${entered ? 1 : 0.85})`,
                  opacity: entered ? 1 : 0,
                  transitionDuration: '250ms',
                  transitionProperty: 'transform, opacity, box-shadow',
                  transitionDelay: delay,
                }}
              >
                <IconComponent className="w-5 h-5" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

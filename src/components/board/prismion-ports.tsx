'use client';

import React, { useCallback, useState, useEffect } from 'react';
import { PortSide } from '@/types/prismora';
import { Plus, MessageSquare, FileText, Image, Video, Link, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PrismionPortsProps {
  className?: string;
  onConnectorClick?: (port: PortSide, event: React.MouseEvent) => void;
  onConnectorDrag?: (port: PortSide, event: React.MouseEvent) => void;
  onCreatePrismion?: (port: PortSide, type: 'prompt' | 'file' | 'image' | 'video' | 'link') => void;
  onAttachToExisting?: (port: PortSide, type: 'file' | 'image' | 'video' | 'link') => void;
}

export function PrismionPorts({ className, onConnectorClick, onConnectorDrag, onCreatePrismion, onAttachToExisting }: PrismionPortsProps) {
  const [activePort, setActivePort] = useState<PortSide | null>(null);
  const [entered, setEntered] = useState(false);

  // Close menu when clicking outside
  useEffect(() => {
    if (!activePort) return;
    
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      // Check if click is outside any port element
      if (!target.closest('[data-port-container]')) {
        setActivePort(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside, true);
    return () => document.removeEventListener('mousedown', handleClickOutside, true);
  }, [activePort]);

  // Manage entrance animation per open cycle
  useEffect(() => {
    if (!activePort) {
      setEntered(false);
      return;
    }
    // Reset and restart animation for each port change
    setEntered(false);
    const timeoutId = setTimeout(() => setEntered(true), 10);
    return () => clearTimeout(timeoutId);
  }, [activePort]);

  const handleClick = useCallback((side: PortSide, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    
    // If clicking on the same port, toggle (close)
    if (activePort === side) {
      setActivePort(null);
    } else {
      // If clicking on a different port, close current first, then open new one
      if (activePort && activePort !== side) {
        setActivePort(null);
        // Wait for close animation, then open new port
        setTimeout(() => setActivePort(side), 150);
      } else {
        // No port active, open directly
        setActivePort(side);
      }
    }
    
    // Also call the original callback for backwards compatibility
    onConnectorClick?.(side, e);
  }, [activePort, onConnectorClick]);

  const handleMouseDown = useCallback((side: PortSide, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Only start drag if this port is not currently active (no radial menu open)
    if (activePort !== side) {
      onConnectorDrag?.(side, e);
    }
  }, [onConnectorDrag, activePort]);

  // Radial menu actions
  const actions = [
    { 
      key: 'prompt', 
      label: 'Prompt', 
      icon: MessageSquare, 
      onClick: (port: PortSide) => { onCreatePrismion?.(port, 'prompt'); setActivePort(null); },
      colorClass: 'text-blue-600 hover:text-blue-700 hover:bg-blue-50' 
    },
    { 
      key: 'file', 
      label: 'Dokument', 
      icon: FileText, 
      onClick: (port: PortSide) => { onCreatePrismion?.(port, 'file'); setActivePort(null); },
      colorClass: 'text-gray-600 hover:text-gray-700 hover:bg-gray-50' 
    },
    { 
      key: 'image', 
      label: 'Bild', 
      icon: Image, 
      onClick: (port: PortSide) => { onCreatePrismion?.(port, 'file'); setActivePort(null); },
      colorClass: 'text-green-600 hover:text-green-700 hover:bg-green-50' 
    },
    { 
      key: 'video', 
      label: 'Video', 
      icon: Video, 
      onClick: (port: PortSide) => { onCreatePrismion?.(port, 'file'); setActivePort(null); },
      colorClass: 'text-purple-600 hover:text-purple-700 hover:bg-purple-50' 
    },
    { 
      key: 'link', 
      label: 'Link', 
      icon: Link, 
      onClick: (port: PortSide) => { onAttachToExisting?.(port, 'link'); setActivePort(null); },
      colorClass: 'text-orange-600 hover:text-orange-700 hover:bg-orange-50' 
    },
  ];

  // Render a single port with radial menu capability
  const renderPort = (side: PortSide, style: React.CSSProperties) => {
    const isActive = activePort === side;
    
    return (
      <div
        key={side}
        className="absolute"
        style={style}
        data-port-container
      >
        {/* Main Port Button */}
        <div
          className={cn(
            "w-8 h-8 bg-primary rounded-full border-2 border-background cursor-pointer pointer-events-auto transition-all duration-200 ease-out shadow-sm opacity-0 group-hover:opacity-100 hover:opacity-100",
            // Original hover effects restored
            side === 'top' && "group-hover:scale-125 group-hover:-translate-y-6 hover:scale-125 hover:-translate-y-6",
            side === 'right' && "group-hover:scale-125 group-hover:translate-x-6 hover:scale-125 hover:translate-x-6",
            side === 'bottom' && "group-hover:scale-125 group-hover:translate-y-6 hover:scale-125 hover:translate-y-6",
            side === 'left' && "group-hover:scale-125 group-hover:-translate-x-6 hover:scale-125 hover:-translate-x-6",
            // Active state
            isActive && "scale-125 ring-2 ring-primary/20"
          )}
          onClick={(e) => handleClick(side, e)}
          onMouseDown={(e) => handleMouseDown(side, e)}
          title={isActive ? "Schließen" : "Click: Create new prismion | Drag: Connect to existing"}
        >
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 hover:opacity-100 transition-opacity duration-200">
            <Plus className="w-4 h-4 text-background" />
          </div>
        </div>

        {/* Radial Menu */}
        {isActive && (
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
            {actions.map((action, idx) => {
              const count = actions.length;
              const spanDeg = 160;
              let startDeg: number;
              
              switch (side) {
                case 'top':
                  startDeg = -170; // Nach oben (12 Uhr) - CSS-Koordinaten: -180° = oben
                  break;
                case 'right':
                  startDeg = -80; // Nach rechts - war korrekt
                  break;
                case 'bottom':
                  startDeg = 10; // Nach unten - war korrekt
                  break;
                case 'left':
                  startDeg = 100; // Nach links - war korrekt
                  break;
              }
              
              const step = count > 1 ? spanDeg / (count - 1) : 0;
              const angleDeg = startDeg + idx * step;
              const angleRad = (angleDeg * Math.PI) / 180;
              const radius = 60;
              const tx = Math.cos(angleRad) * radius;
              const ty = Math.sin(angleRad) * radius;
              const delay = `${idx * 0.06}s`;

              const IconComponent = action.icon;

              return (
                <button
                  key={action.key}
                  onClick={(e) => { 
                    e.stopPropagation(); 
                    action.onClick(side); 
                  }}
                  title={action.label}
                  className={cn(
                    'absolute h-9 w-9 -ml-[18px] -mt-[18px] rounded-full bg-white/95 border-2 border-gray-200 shadow-lg flex items-center justify-center pointer-events-auto transition-all ease-out hover:scale-110 hover:shadow-xl',
                    action.colorClass
                  )}
                  style={{
                    transform: `translate(${tx}px, ${ty}px) scale(${entered ? 1 : 0.85})`,
                    opacity: entered ? 1 : 0,
                    transitionDuration: '220ms',
                    transitionProperty: 'transform, opacity',
                    transitionDelay: delay,
                  }}
                >
                  <IconComponent className="w-4 h-4" />
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn('absolute inset-0 pointer-events-none', className)} style={{ zIndex: 30 }}>
      {/* Top Port */}
      {renderPort('top', { 
        top: '-14px', 
        left: '50%', 
        transform: 'translateX(-50%)'
      })}

      {/* Right Port */}
      {renderPort('right', { 
        right: '-14px', 
        top: '50%', 
        transform: 'translateY(-50%)'
      })}

      {/* Bottom Port */}
      {renderPort('bottom', { 
        bottom: '-14px', 
        left: '50%', 
        transform: 'translateX(-50%)'
      })}

      {/* Left Port */}
      {renderPort('left', { 
        left: '-14px', 
        top: '50%', 
        transform: 'translateY(-50%)'
      })}
    </div>
  );
}

export default PrismionPorts;



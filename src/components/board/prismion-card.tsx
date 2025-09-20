'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Prismion, Position, Size, PortSide } from '@/types/prismora';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { AvatarWithFallback } from '@/components/ui/avatar';
import { ChevronDown, ChevronUp, Edit3, Plus, X, Image, Play, Link, FileText, Check, Trash, ArrowRight, Clock } from 'lucide-react';
import { PrismionPorts } from '@/components/board/prismion-ports';
import { PrismionToolbar } from '@/components/board/prismion-toolbar';
import { PrismionResult, PrismionResultItem } from '@/components/board/prismion-result';
import { cn } from '@/lib/utils';

// ===== PRISMION CARD COMPONENT =====

export interface PrismionCardProps {
  prismion: Prismion;
  selected?: boolean;
  onSelect?: (multiSelect?: boolean) => void;
  onMove?: (position: Position) => void;
  onResize?: (size: Size) => void;
  onStartConnector?: (port: PortSide) => void;
  onOpenMerge?: () => void;
  onPromptSubmit?: (prompt: string) => void;
  onConnectorClick?: (port: PortSide) => void; // New: Create new prismion
  onConnectorCreatePrismion?: (port: PortSide, type: 'prompt' | 'file' | 'image' | 'video' | 'link') => void; // For menu integration
  onConnectorDrag?: (port: PortSide, event: React.MouseEvent) => void; // New: Connect to existing
  onConnectorDrop?: (fromConnectorId: string, targetPort: PortSide) => void; // New: Handle connector drops
  isConnectorDragTarget?: boolean; // New: Visual feedback when being targeted
  className?: string;
  onLockToggle?: () => void;
  onDelete?: () => void;
  results?: PrismionResultItem[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  mediaSize?: 'sm' | 'md' | 'lg'; // for image/video kinds
  onAddTag?: (label: string) => void;
  onUpdateTag?: (tagId: string, label: string) => void;
  onDeleteTag?: (tagId: string) => void;
  onBranchFromSelection?: (selectedText: string) => void;
  onUploadAttachment?: (file: File) => void; // For attachment.* kinds
}

export function PrismionCard({
  prismion,
  selected = false,
  onSelect,
  onMove,
  onResize,
  onStartConnector,
  onOpenMerge,
  onPromptSubmit,
  onConnectorClick,
  onConnectorCreatePrismion,
  onConnectorDrag,
  onConnectorDrop,
  isConnectorDragTarget = false,
  className,
  onLockToggle,
  onDelete,
  results,
  collapsed = false,
  onToggleCollapse,
  mediaSize = 'md',
  onAddTag,
  onUpdateTag,
  onDeleteTag,
  onBranchFromSelection,
  onUploadAttachment,
}: PrismionCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(prismion.title);
  const [editPrompt, setEditPrompt] = useState(prismion.prompt);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDropTarget, setIsDropTarget] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isKindContent = !!prismion.kind && !!(prismion as any).content;
  const autoSize = (results && results.length > 0) || isKindContent;
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [newTagLabel, setNewTagLabel] = useState('');
  const [editingTagId, setEditingTagId] = useState<string | null>(null);
  const [editingLabel, setEditingLabel] = useState('');
  const longPressTimer = useRef<number | null>(null);
  const [showSelectionMenu, setShowSelectionMenu] = useState(false);
  const [selectionText, setSelectionText] = useState('');
  const [menuPos, setMenuPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isFileDragActive, setIsFileDragActive] = useState(false);
  

  // ===== HELPER FUNCTIONS =====

  // Get port position relative to PrismionCard (for ConnectorMenu positioning)
  const getPortRelativePosition = (port: PortSide): { x: number; y: number } => {
    const cardWidth = prismion.size.w;
    const cardHeight = prismion.size.h;
    
    switch (port) {
      case 'top':
        return { x: cardWidth / 2, y: 70 }; // Oberhalb der Karte
      case 'right':
        return { x: cardWidth - 70, y: cardHeight / 2 }; // Rechts der Karte
      case 'bottom':
        return { x: cardWidth / 2, y: cardHeight - 70 }; // Unterhalb der Karte
      case 'left':
        return { x: 70, y: cardHeight / 2 }; // Links der Karte
    }
  };

  // ===== EVENT HANDLERS =====

  const handleClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    onSelect?.(event.shiftKey);
  }, [onSelect]);

  const handleDoubleClick = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent) => {
    if (isEditing) return;
    // Prevent drag start when clicking inside content (to allow text selection)
    const target = event.target as Node;
    const tag = (target as HTMLElement)?.tagName;
    if (
      (contentRef.current && contentRef.current.contains(target)) ||
      tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A'
    ) {
      return;
    }
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
    setDragOffset({ x: 0, y: 0 });
  }, [isEditing]);

  const handleMouseMove = useCallback((event: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    
    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;
    
    setDragOffset({ x: deltaX, y: deltaY });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback((event: React.MouseEvent) => {
    if (!isDragging || !dragStart) return;
    
    setIsDragging(false);
    
    if (onMove) {
      const newPosition = {
        x: prismion.position.x + dragOffset.x,
        y: prismion.position.y + dragOffset.y,
        zIndex: prismion.position.zIndex,
      };
      
      console.log('🎯 Drag end position calculation:', {
        prismionId: prismion.id,
        oldPosition: prismion.position,
        dragOffset,
        newPosition
      });
      
      onMove(newPosition);
    }
    
    setDragStart(null);
    setDragOffset({ x: 0, y: 0 });
  }, [isDragging, dragStart, dragOffset, onMove, prismion.position]);

  const handleResizeStart = useCallback(() => {
    setIsResizing(true);
  }, []);

  const handleResizeEnd = useCallback((newSize: Size) => {
    setIsResizing(false);
    if (onResize) {
      onResize(newSize);
    }
  }, [onResize]);

  const handleTitleSave = useCallback(() => {
    // TODO: Update prismion title
    setIsEditing(false);
  }, []);

  const handlePromptSave = useCallback(() => {
    // TODO: Update prismion prompt
    setIsEditing(false);
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handleTitleSave();
    }
    if (event.key === 'Escape') {
      setIsEditing(false);
      setEditTitle(prismion.title);
      setEditPrompt(prismion.prompt);
    }
  }, [handleTitleSave, prismion.title, prismion.prompt]);

  const handlePromptSubmit = useCallback(() => {
    if (promptInput.trim()) {
      onPromptSubmit?.(promptInput.trim());
      setPromptInput('');
    }
  }, [promptInput, onPromptSubmit]);

  const handlePromptKeyDown = useCallback((event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      handlePromptSubmit();
    }
  }, [handlePromptSubmit]);

  // ===== PORT HANDLERS =====

  const handlePortClick = useCallback((port: PortSide, event: React.MouseEvent) => {
    event.stopPropagation();
    
    // Port button now handles its own menu - just call external callback
    console.log('🎯 PrismionCard: Port clicked:', port);
    onConnectorClick?.(port);
  }, [onConnectorClick]);

  const handlePortDragStart = useCallback((port: PortSide, event: React.MouseEvent) => {
    event.stopPropagation();
    onConnectorDrag?.(port, event); // Connect to existing prismion
  }, [onConnectorDrag]);

  // Handle drag over events for connector drops
  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDropTarget(true);
  }, []);

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDropTarget(false);
  }, []);

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    setIsDropTarget(false);
    
    // Get the connector ID from the drag data
    const fromConnectorId = event.dataTransfer.getData('application/connector-id');
    if (fromConnectorId && onConnectorDrop) {
      // Calculate which port based on drop position
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        const relativeX = (event.clientX - rect.left) / rect.width;
        const relativeY = (event.clientY - rect.top) / rect.height;
        
        let targetPort: PortSide;
        if (relativeY < 0.3) {
          targetPort = 'top';
        } else if (relativeY > 0.7) {
          targetPort = 'bottom';
        } else if (relativeX < 0.3) {
          targetPort = 'left';
        } else {
          targetPort = 'right';
        }
        
        onConnectorDrop(fromConnectorId, targetPort);
      }
    }
  }, [onConnectorDrop]);

  // File drop for attachment.* kinds inside content area
  const handleFileDragOver = useCallback((event: React.DragEvent) => {
    if (prismion.kind && prismion.kind.startsWith('attachment.')) {
      event.preventDefault();
      setIsFileDragActive(true);
    }
  }, [prismion.kind]);

  const handleFileDragLeave = useCallback((event: React.DragEvent) => {
    if (prismion.kind && prismion.kind.startsWith('attachment.')) {
      event.preventDefault();
      setIsFileDragActive(false);
    }
  }, [prismion.kind]);

  const handleFileDrop = useCallback((event: React.DragEvent) => {
    if (!(prismion.kind && prismion.kind.startsWith('attachment.'))) return;
    event.preventDefault();
    setIsFileDragActive(false);
    const file = event.dataTransfer?.files?.[0];
    if (file) {
      onUploadAttachment?.(file);
    }
  }, [onUploadAttachment, prismion.kind]);

  const handleFileInputChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUploadAttachment?.(file);
      // Reset input to allow re-upload same file name
      event.currentTarget.value = '';
    }
  }, [onUploadAttachment]);

  // Selection context menu
  const handleContentContextMenu = useCallback((e: React.MouseEvent) => {
    const sel = window.getSelection()?.toString() ?? '';
    if (sel && sel.trim().length > 0) {
      e.preventDefault();
      e.stopPropagation();
      setSelectionText(sel.trim());
      const rect = cardRef.current?.getBoundingClientRect();
      if (rect) {
        setMenuPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      } else {
        setMenuPos({ x: e.clientX, y: e.clientY });
      }
      setShowSelectionMenu(true);
    }
  }, []);

  const closeSelectionMenu = useCallback(() => {
    setShowSelectionMenu(false);
    setSelectionText('');
  }, []);

  // ===== TAG HANDLERS =====
  const startLongPress = useCallback((tagId: string, currentLabel: string) => {
    if (longPressTimer.current) window.clearTimeout(longPressTimer.current);
    // 600ms long press threshold
    longPressTimer.current = window.setTimeout(() => {
      setEditingTagId(tagId);
      setEditingLabel(currentLabel);
    }, 600) as unknown as number;
  }, []);

  const cancelLongPress = useCallback(() => {
    if (longPressTimer.current) {
      window.clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }, []);

  const submitNewTag = useCallback(() => {
    const label = newTagLabel.trim();
    if (!label) return;
    onAddTag?.(label);
    setNewTagLabel('');
    setIsAddingTag(false);
  }, [newTagLabel, onAddTag]);

  const submitEditTag = useCallback(() => {
    if (!editingTagId) return;
    const label = editingLabel.trim();
    if (!label) return;
    onUpdateTag?.(editingTagId, label);
    setEditingTagId(null);
    setEditingLabel('');
  }, [editingTagId, editingLabel, onUpdateTag]);

  // ===== RENDER =====

  // Determine if this is an initial/empty prismion
  const isInitialState = !prismion.prompt || prismion.prompt.trim() === '';
  const firstResultType = results?.[0]?.type;
  const isTextResult = firstResultType === 'text' || firstResultType === 'richtext';
  const isTextKind = (prismion as any).content?.type === 'result.text' || (prismion as any).content?.type === 'result.richtext';
  const isAttachmentKind = !!prismion.kind && prismion.kind.startsWith('attachment.');

  // Calculate current position including drag offset
  const currentPosition = {
    x: prismion.position.x + dragOffset.x,
    y: prismion.position.y + dragOffset.y,
  };

  // Auto-size observer for long results
  useEffect(() => {
    if (!autoSize || !cardRef.current || !onResize) return;
    const el = cardRef.current;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const cr = entry.contentRect;
        const w = Math.max(prismion.size.minW, Math.round(cr.width));
        const h = Math.max(prismion.size.minH, Math.round(cr.height));
        if (w !== prismion.size.w || h !== prismion.size.h) {
          onResize({ w, h });
        }
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [autoSize, onResize, prismion.size.h, prismion.size.minH, prismion.size.minW, prismion.size.w]);

  return (
    <div
      ref={cardRef}
      data-prismion-id={prismion.id}
      className={cn(
        "absolute bg-card border rounded-[35px] shadow-lg group",
        "hover:shadow-xl transition-all duration-200",
        selected && "ring-2 ring-primary ring-offset-2",
        prismion.state === 'locked' && "opacity-90 grayscale-[0.1]",
        prismion.state === 'archived' && "opacity-70 grayscale",
        prismion.state === 'merged' && "border-green-400",
        isDragging && "z-50 cursor-grabbing",
        !isEditing && !isDragging && "cursor-grab",
        isDropTarget && "ring-2 ring-green-500 ring-offset-2 bg-green-50/50",
        isConnectorDragTarget && "ring-2 ring-blue-500 ring-offset-2 bg-blue-50/50",
        className
      )}
      style={{
        left: currentPosition.x,
        top: currentPosition.y,
        display: 'inline-block',
        width: autoSize ? 'auto' as any : prismion.size.w,
        maxWidth: autoSize ? (isTextKind || isTextResult ? 800 : undefined) : undefined,
        height: collapsed ? 60 : (autoSize ? 'auto' : (isInitialState ? 'auto' : prismion.size.h)),
        minHeight: collapsed
          ? 60
          : (
            prismion.kind && prismion.kind.startsWith('attachment.')
              ? Math.max(prismion.size.h, 260)
              : (isInitialState ? '120px' : (autoSize ? '120px' : prismion.size.h))
          ),
        zIndex: Math.max(prismion.position.zIndex, 1),
        transform: isDragging ? 'scale(1.05) rotate(2deg)' : 'scale(1)',
        transition: isDragging ? 'none' : 'transform 0.2s ease-out',
      }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Ports */}
      <PrismionPorts
        onConnectorClick={handlePortClick}
        onConnectorDrag={handlePortDragStart}
        onCreatePrismion={(port, type) => {
          console.log('Create prismion:', type, 'from port:', port);
          onConnectorCreatePrismion?.(port, type);
        }}
        onAttachToExisting={(port, type) => {
          console.log('Attach to existing:', type, 'from port:', port);
          // TODO: Implement attachment functionality
        }}
      />

      {/* Content */}
      <div className="relative h-full p-4 flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0 flex items-center gap-2">
            {/* Kind icon when collapsed */}
            {collapsed && (
              <div className="h-8 w-12 rounded-full bg-primary text-white flex items-center justify-center border border-primary/80">
                {prismion.kind?.startsWith('result.') ? (
                  prismion.kind === 'result.image' ? <Image className="w-4 h-4" />
                  : prismion.kind === 'result.video' ? <Play className="w-4 h-4" />
                  : prismion.kind === 'result.link' ? <Link className="w-4 h-4" />
                  : <FileText className="w-4 h-4" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
              </div>
            )}
            {isEditing ? (
              <Input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleTitleSave}
                className="text-lg font-semibold bg-transparent border-none p-0 focus:ring-0"
                autoFocus
              />
            ) : (
              <h3 className="text-lg font-semibold text-card-foreground truncate">
                {prismion.title}
              </h3>
            )}
          </div>

          {/* State Badge (hidden when collapsed or for attachment kinds) */}
          {!collapsed && !isAttachmentKind && (
            <Badge 
              variant={prismion.state === 'active' ? 'default' : 'secondary'}
              className="ml-2 text-xs"
            >
              {prismion.state}
            </Badge>
          )}
          <button
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
            onClick={(e) => { e.stopPropagation(); onToggleCollapse?.(); }}
            aria-label={collapsed ? 'Expand' : 'Collapse'}
          >
            {collapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          </button>
        </div>

        {/* Tags (hidden for attachment kinds) */}
        {!collapsed && !isAttachmentKind && (
          <div className="flex items-center flex-wrap gap-1 mb-3">
            {prismion.tags.map((tag) => (
              <div key={tag.id} className="relative">
                {editingTagId === tag.id ? (
                  <div className="flex items-center gap-1">
                    <Input
                      value={editingLabel}
                      onChange={(e) => setEditingLabel(e.target.value)}
                      className="h-7 py-0 px-2 text-xs w-32"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') submitEditTag();
                        if (e.key === 'Escape') { setEditingTagId(null); setEditingLabel(''); }
                      }}
                      autoFocus
                    />
                    <button className="p-1 rounded-md hover:bg-gray-100" onClick={submitEditTag}>
                      <Check className="w-3 h-3" />
                    </button>
                    <button className="p-1 rounded-md hover:bg-gray-100" onClick={() => onDeleteTag?.(tag.id)}>
                      <Trash className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <Badge
                    variant="outline"
                    className="text-xs select-none"
                    style={{ borderColor: tag.colorToken, color: tag.colorToken }}
                    onMouseDown={() => startLongPress(tag.id, tag.label)}
                    onMouseUp={cancelLongPress}
                    onMouseLeave={cancelLongPress}
                  >
                    {tag.label}
                  </Badge>
                )}
              </div>
            ))}
            {isAddingTag ? (
              <div className="flex items-center gap-1">
                <Input
                  value={newTagLabel}
                  onChange={(e) => setNewTagLabel(e.target.value)}
                  className="h-7 py-0 px-2 text-xs w-32"
                  placeholder="New tag"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') submitNewTag();
                    if (e.key === 'Escape') { setIsAddingTag(false); setNewTagLabel(''); }
                  }}
                  autoFocus
                />
                <button className="p-1 rounded-md hover:bg-gray-100" onClick={submitNewTag}>
                  <Check className="w-3 h-3" />
                </button>
                <button className="p-1 rounded-md hover:bg-gray-100" onClick={() => { setIsAddingTag(false); setNewTagLabel(''); }}>
                  <X className="w-3 h-3" />
                </button>
              </div>
            ) : (
              <button
                className="p-1 rounded-md hover:bg-gray-100 transition-colors"
                onClick={() => setIsAddingTag(true)}
                aria-label="Add tag"
              >
                <Plus className="w-3 h-3" />
              </button>
            )}
          </div>
        )}

        {/* Content Area */}
        {!collapsed && (
        <div ref={contentRef} className="flex-1 min-h-0" onContextMenu={handleContentContextMenu} onDragOver={handleFileDragOver} onDragLeave={handleFileDragLeave} onDrop={handleFileDrop}>
          {isInitialState ? (
            /* Initial State - Simple Input and Button */
            <div className="flex items-center gap-2 h-full">
              <div className="flex-1">
                <Input
                  value={promptInput}
                  onChange={(e) => setPromptInput(e.target.value)}
                  onKeyDown={handlePromptKeyDown}
                  placeholder="Enter your prompt..."
                  className="w-full"
                />
              </div>
              <button
                className="p-2 rounded-md hover:bg-blue-50 transition-colors text-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handlePromptSubmit}
                disabled={!promptInput.trim()}
                aria-label="Submit prompt"
              >
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          ) : (
            /* Normal State - kind-specific vs prompt */
            prismion.kind?.startsWith('result.') && prismion.content ? (
              <div className="mt-1">
                {prismion.content.type === 'result.text' && (
                  <div className="prose prose-sm max-w-none whitespace-pre-wrap text-sm text-foreground/90">
                    {prismion.content.text}
                  </div>
                )}
                {prismion.content.type === 'result.richtext' && (
                  <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: prismion.content.html }} />
                )}
                {prismion.content.type === 'result.image' && (
                  <img
                    src={prismion.content.url}
                    alt={prismion.title}
                    className={cn(
                      'h-auto rounded-md border',
                      mediaSize === 'sm' && 'w-[360px]',
                      mediaSize === 'md' && 'w-[560px]',
                      mediaSize === 'lg' && 'w-[800px]'
                    )}
                  />
                )}
                {prismion.content.type === 'result.video' && (
                  <video
                    src={prismion.content.url}
                    poster={prismion.content.poster}
                    controls
                    className={cn(
                      'rounded-md border',
                      mediaSize === 'sm' && 'w-[360px]',
                      mediaSize === 'md' && 'w-[560px]',
                      mediaSize === 'lg' && 'w-[800px]'
                    )}
                  />
                )}
                {prismion.content.type === 'result.link' && (
                  <a href={prismion.content.url} target="_blank" rel="noreferrer" className="text-primary underline">
                    {prismion.content.label ?? prismion.content.url}
                  </a>
                )}
              </div>
            ) : prismion.kind === 'attachment.file' ? (
              prismion.content && prismion.content.type === 'attachment.file' && prismion.content.url ? (
                <div className="mt-1 text-sm">
                  <a href={prismion.content.url} target="_blank" rel="noreferrer" className="text-primary underline">
                    {prismion.content.name ?? 'Attachment'}
                  </a>
                  {typeof prismion.content.sizeBytes === 'number' && (
                    <span className="ml-2 text-muted-foreground">({Math.round(prismion.content.sizeBytes / 1024)} KB)</span>
                  )}
                </div>
              ) : (
                <div className={cn('mt-1 h-[140px] rounded-md border-2 border-dashed flex flex-col items-center justify-center gap-2 text-sm', isFileDragActive ? 'border-blue-400 bg-blue-50/40' : 'border-muted-foreground/30')}>
                  <div className="text-muted-foreground">Datei hierher ziehen oder hochladen</div>
                  <div className="flex items-center gap-2">
                    <label className="px-3 py-1.5 rounded-md bg-primary text-white cursor-pointer hover:opacity-90">
                      Upload File
                      <input type="file" className="hidden" onChange={handleFileInputChange} />
                    </label>
                    <span className="text-xs text-muted-foreground">oder per Drag & Drop</span>
                  </div>
                </div>
              )
            ) : prismion.kind === 'attachment.image' ? (
              (prismion.content && (prismion.content as any).type === 'attachment.image' && (prismion.content as any).url) ? (
                <div className="mt-1">
                  <img
                    src={(prismion.content as any).url}
                    alt={(prismion.content as any).alt ?? prismion.title}
                    className={cn(
                      'h-auto rounded-md border',
                      mediaSize === 'sm' && 'w-[360px]',
                      mediaSize === 'md' && 'w-[560px]',
                      mediaSize === 'lg' && 'w-[800px]'
                    )}
                  />
                </div>
              ) : (
                <div className={cn('mt-1 h-[140px] rounded-md border-2 border-dashed flex flex-col items-center justify-center gap-2 text-sm', isFileDragActive ? 'border-blue-400 bg-blue-50/40' : 'border-muted-foreground/30')}>
                  <div className="text-muted-foreground">Bild hierher ziehen oder hochladen</div>
                  <div className="flex items-center gap-2">
                    <label className="px-3 py-1.5 rounded-md bg-primary text-white cursor-pointer hover:opacity-90">
                      Upload Image
                      <input type="file" accept="image/*" className="hidden" onChange={handleFileInputChange} />
                    </label>
                    <span className="text-xs text-muted-foreground">oder per Drag & Drop</span>
                  </div>
                </div>
              )
            ) : (
              isEditing ? (
                <Textarea
                  value={editPrompt}
                  onChange={(e) => setEditPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  onBlur={handlePromptSave}
                  className="resize-none bg-transparent border-none p-0 focus:ring-0 text-sm"
                  placeholder="Enter your prompt..."
                  autoFocus
                />
              ) : (
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {prismion.prompt}
                </p>
              )
            )
          )}

          {/* Results */}
          {results && results.length > 0 && (
            <div className="mt-3">
              <PrismionResult items={results} />
            </div>
          )}
        </div>
        )}

        {/* Footer - Show for non-initial or attachment kinds */}
        {(!isInitialState || (prismion.kind && prismion.kind.startsWith('attachment.'))) && !collapsed && (
          <div className="relative overflow-visible flex items-center justify-between mt-3 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Clock className="w-4 h-4 text-muted-foreground" />
              <span>{new Date(prismion.updatedAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-2">
              <AvatarWithFallback size="sm" variant="outline" fallback={prismion.createdBy} />
              <PrismionToolbar
                locked={prismion.state === 'locked'}
                onBranch={() => onOpenMerge?.()}
                onMerge={() => onOpenMerge?.()}
                onLockToggle={() => onLockToggle?.()}
                onArchive={() => { /* TODO: archive */ }}
                onDelete={() => onDelete?.()}
              />
            </div>
          </div>
        )}
      </div>

      {/* Selection Context Menu */}
      {showSelectionMenu && (
        <div
          className="absolute z-[9999] bg-white border rounded-md shadow-lg p-2 text-sm"
          style={{ left: menuPos.x, top: menuPos.y }}
          onMouseDown={(e) => { e.stopPropagation(); e.preventDefault(); }}
        >
          <button
            className="px-2 py-1 hover:bg-muted rounded w-full text-left"
            onClick={(e) => {
              e.stopPropagation();
              onBranchFromSelection?.(selectionText);
              closeSelectionMenu();
            }}
          >
            New Prismion with this content
          </button>
          <button
            className="px-2 py-1 hover:bg-muted rounded w-full text-left"
            onClick={(e) => { e.stopPropagation(); closeSelectionMenu(); }}
          >
            Cancel
          </button>
        </div>
      )}

      {/* Resize Handles */}
      {selected && (
        <>
          <div
            className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
            onMouseDown={handleResizeStart}
          />
          <div
            className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
            onMouseDown={handleResizeStart}
          />
          <div
            className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
            onMouseDown={handleResizeStart}
          />
          <div
            className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
            onMouseDown={handleResizeStart}
          />
        </>
      )}

    </div>
  );
}

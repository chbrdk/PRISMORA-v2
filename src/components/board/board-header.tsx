'use client';

import { useState } from 'react';
import { Board, BoardParticipant } from '@/types/prismora';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Check, X, Share2, Settings, Info, Copy } from 'lucide-react';
import { Avatar, AvatarGroup } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Stack } from '@/components/ui/stack';
import { Modal } from '@/components/ui/modal';
import { generateBoardUrl } from '@/lib/board-utils';

interface BoardHeaderProps {
  board: Board;
  participants: BoardParticipant[];
}

export function BoardHeader({ board, participants }: BoardHeaderProps) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [title, setTitle] = useState(board.title);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const boardUrl = generateBoardUrl(board.shareId);

  const handleTitleSave = () => {
    // TODO: Update board title via API
    setIsEditingTitle(false);
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(boardUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const activeParticipants = participants.filter(p => p.isActive);

  return (
    <>
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Left: Board Title */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-500">PRISMORA</span>
            </div>
            
            <div className="h-6 w-px bg-gray-300" />
            
            {isEditingTitle ? (
              <Stack direction="row" gap="sm" align="center">
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleTitleSave();
                    if (e.key === 'Escape') {
                      setTitle(board.title);
                      setIsEditingTitle(false);
                    }
                  }}
                  className="text-lg font-semibold min-w-[200px]"
                  autoFocus
                />
                <Button size="sm" onClick={handleTitleSave}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => {
                    setTitle(board.title);
                    setIsEditingTitle(false);
                  }}
                >
                  <X className="w-4 h-4" />
                </Button>
              </Stack>
            ) : (
              <button
                onClick={() => setIsEditingTitle(true)}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {board.title}
              </button>
            )}
          </div>

          {/* Right: Participants & Actions */}
          <Stack direction="row" gap="md" align="center">
            {/* Participants */}
            {activeParticipants.length > 0 && (
              <Stack direction="row" gap="sm" align="center">
                <AvatarGroup 
                  size="sm" 
                  max={5}
                  avatars={activeParticipants.map((participant) => ({
                    id: participant.id,
                    fallback: participant.userName.charAt(0).toUpperCase(),
                    style: { backgroundColor: participant.userColor || '#6b7280' }
                  }))}
                />
                <Badge variant="secondary" className="text-xs">
                  {activeParticipants.length} online
                </Badge>
              </Stack>
            )}

            {/* Share Button */}
            <Button
              onClick={() => setIsShareModalOpen(true)}
              variant="outline"
              size="sm"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Teilen
            </Button>

            {/* Board Settings */}
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
          </Stack>
        </div>
      </header>

      {/* Share Modal */}
      <Modal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        title="Board teilen"
      >
        <Stack direction="column" gap="lg">
          <div>
            <p className="text-sm text-gray-600 mb-3">
              Teile diesen Link, damit andere deinem Board beitreten können:
            </p>
            <Stack direction="row" gap="sm">
              <Input
                value={boardUrl}
                readOnly
                className="flex-1 font-mono text-sm"
              />
              <Button onClick={handleCopyLink} variant="outline">
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Kopiert!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Kopieren
                  </>
                )}
              </Button>
            </Stack>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <Stack direction="row" gap="sm" align="start">
              <Info className="w-5 h-5 text-blue-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900 mb-1">
                  Öffentlicher Zugang
                </p>
                <p className="text-blue-700">
                  Jeder mit diesem Link kann dem Board beitreten und mitarbeiten. 
                  Du kannst die Berechtigung in den Board-Einstellungen ändern.
                </p>
              </div>
            </Stack>
          </div>

          <Stack direction="row" gap="sm" justify="end">
            <Button 
              variant="outline" 
              onClick={() => setIsShareModalOpen(false)}
            >
              Schließen
            </Button>
          </Stack>
        </Stack>
      </Modal>
    </>
  );
}

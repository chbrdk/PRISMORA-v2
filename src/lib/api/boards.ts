/**
 * Board API Functions
 */

import { Board, Prismion, Connection, BoardParticipant } from '@/types/prismora';

const API_BASE = '/api/boards';

export interface CreateBoardRequest {
  title?: string;
  description?: string;
  isPublic?: boolean;
  canvasSettings?: any;
}

export interface CreateBoardResponse {
  board: Board;
}

export interface GetBoardResponse {
  board: Board;
  prismions: Prismion[];
  connections: Connection[];
  participants: BoardParticipant[];
}

export interface UpdateBoardRequest {
  title?: string;
  description?: string;
  isPublic?: boolean;
  canvasSettings?: any;
}

/**
 * Create a new board
 */
export async function createBoard(data: CreateBoardRequest): Promise<CreateBoardResponse> {
  const response = await fetch(API_BASE, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create board: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Get board by share ID
 */
export async function getBoardByShareId(shareId: string): Promise<GetBoardResponse> {
  const response = await fetch(`${API_BASE}/${shareId}`, {
    method: 'GET',
  });

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('Board not found');
    }
    throw new Error(`Failed to load board: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update board
 */
export async function updateBoard(shareId: string, data: UpdateBoardRequest): Promise<{ board: Board }> {
  const response = await fetch(`${API_BASE}/${shareId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update board: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Delete board
 */
export async function deleteBoard(shareId: string): Promise<void> {
  const response = await fetch(`${API_BASE}/${shareId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete board: ${response.statusText}`);
  }
}

/**
 * Join board as participant
 */
export async function joinBoard(shareId: string, userName?: string): Promise<{ participant: BoardParticipant }> {
  const response = await fetch(`${API_BASE}/${shareId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userName }),
  });

  if (!response.ok) {
    throw new Error(`Failed to join board: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Update participant presence
 */
export async function updatePresence(
  shareId: string, 
  participantId: string, 
  presence: { cursorX?: number; cursorY?: number; isActive?: boolean }
): Promise<void> {
  const response = await fetch(`${API_BASE}/${shareId}/presence/${participantId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(presence),
  });

  if (!response.ok) {
    throw new Error(`Failed to update presence: ${response.statusText}`);
  }
}

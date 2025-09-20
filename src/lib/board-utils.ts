/**
 * Board utility functions
 */

/**
 * Generate a board URL from share ID
 */
export function generateBoardUrl(shareId: string, baseUrl?: string): string {
  const base = baseUrl || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:7001');
  return `${base}/board/${shareId}`;
}

/**
 * Validate board share ID format
 */
export function isValidBoardShareId(shareId: string): boolean {
  // Check if it's a valid nanoid (12 characters, alphanumeric)
  return /^[A-Za-z0-9_-]{12}$/.test(shareId);
}

/**
 * Extract share ID from board URL
 */
export function extractShareIdFromUrl(url: string): string | null {
  const match = url.match(/\/board\/([A-Za-z0-9_-]{12})/);
  return match ? match[1] : null;
}

/**
 * Generate a random color token for boards/prismions
 */
export function generateColorToken(): string {
  const colors = [
    'prismora.blue.500',
    'prismora.purple.500',
    'prismora.green.500',
    'prismora.orange.500',
    'prismora.red.500',
    'prismora.pink.500',
    'prismora.indigo.500',
    'prismora.teal.500'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

/**
 * Generate a random position for new prismions
 */
export function generateRandomPosition(): { x: number; y: number; zIndex: number } {
  return {
    x: Math.random() * 800 + 100, // Random x between 100-900
    y: Math.random() * 600 + 100, // Random y between 100-700
    zIndex: Math.floor(Math.random() * 1000) + 1 // Random z-index
  };
}

/**
 * Generate default board settings
 */
export function getDefaultBoardSettings() {
  return {
    backgroundColor: '#ffffff',
    patternColor: '#e5e7eb',
    patternSize: 20,
    background: 'dots' as const
  };
}

/**
 * Generate default prismion settings
 */
export function getDefaultPrismionSettings() {
  return {
    colorToken: generateColorToken(),
    position: generateRandomPosition(),
    size: {
      w: 300,
      h: 200,
      minW: 200,
      minH: 100
    },
    state: 'active' as const
  };
}

/**
 * Canvas defaults
 */
export const CANVAS_DEFAULTS = {
  zoom: 1,
  pan: { x: 0, y: 0 },
  backgroundColor: '#ffffff',
  patternColor: '#e5e7eb',
  patternSize: 20,
  background: 'dots' as const
};
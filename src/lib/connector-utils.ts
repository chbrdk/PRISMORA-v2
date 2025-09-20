import { Prismion, Connection } from '@/types/prismora';

/**
 * Find optimal ports for connecting two prismions
 */
export function findOptimalPorts(
  fromPrismion: Prismion,
  toPrismion: Prismion
): { fromPort: 'top' | 'right' | 'bottom' | 'left'; toPort: 'top' | 'right' | 'bottom' | 'left' } {
  const fromCenter = {
    x: fromPrismion.position.x + fromPrismion.size.w / 2,
    y: fromPrismion.position.y + fromPrismion.size.h / 2
  };
  
  const toCenter = {
    x: toPrismion.position.x + toPrismion.size.w / 2,
    y: toPrismion.position.y + toPrismion.size.h / 2
  };

  const dx = toCenter.x - fromCenter.x;
  const dy = toCenter.y - fromCenter.y;

  // Determine optimal ports based on relative positions
  let fromPort: 'top' | 'right' | 'bottom' | 'left';
  let toPort: 'top' | 'right' | 'bottom' | 'left';

  if (Math.abs(dx) > Math.abs(dy)) {
    // Horizontal connection
    if (dx > 0) {
      fromPort = 'right';
      toPort = 'left';
    } else {
      fromPort = 'left';
      toPort = 'right';
    }
  } else {
    // Vertical connection
    if (dy > 0) {
      fromPort = 'bottom';
      toPort = 'top';
    } else {
      fromPort = 'top';
      toPort = 'bottom';
    }
  }

  return { fromPort, toPort };
}

/**
 * Calculate port position on a prismion
 */
export function calculatePortPosition(
  prismion: Prismion,
  port: 'top' | 'right' | 'bottom' | 'left'
): { x: number; y: number } {
  const { x, y } = prismion.position;
  const { w, h } = prismion.size;

  switch (port) {
    case 'top':
      return { x: x + w / 2, y };
    case 'right':
      return { x: x + w, y: y + h / 2 };
    case 'bottom':
      return { x: x + w / 2, y: y + h };
    case 'left':
      return { x, y: y + h / 2 };
  }
}

/**
 * Generate SVG path for connection
 */
export function generateConnectionPath(
  fromPos: { x: number; y: number },
  toPos: { x: number; y: number },
  fromPort: 'top' | 'right' | 'bottom' | 'left',
  toPort: 'top' | 'right' | 'bottom' | 'left'
): string {
  // Calculate control points for smooth curves
  const controlOffset = 50;
  
  let cp1x = fromPos.x;
  let cp1y = fromPos.y;
  let cp2x = toPos.x;
  let cp2y = toPos.y;

  // Adjust control points based on port directions
  switch (fromPort) {
    case 'top':
      cp1y -= controlOffset;
      break;
    case 'right':
      cp1x += controlOffset;
      break;
    case 'bottom':
      cp1y += controlOffset;
      break;
    case 'left':
      cp1x -= controlOffset;
      break;
  }

  switch (toPort) {
    case 'top':
      cp2y -= controlOffset;
      break;
    case 'right':
      cp2x += controlOffset;
      break;
    case 'bottom':
      cp2y += controlOffset;
      break;
    case 'left':
      cp2x -= controlOffset;
      break;
  }

  return `M ${fromPos.x} ${fromPos.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${toPos.x} ${toPos.y}`;
}

/**
 * Check if a connection already exists between two prismions
 */
export function connectionExists(
  connections: Connection[],
  fromPrismionId: string,
  toPrismionId: string
): boolean {
  return connections.some(conn => 
    (conn.fromPrismionId === fromPrismionId && conn.toPrismionId === toPrismionId) ||
    (conn.fromPrismionId === toPrismionId && conn.toPrismionId === fromPrismionId)
  );
}

// Types for path finding
export interface Point {
  x: number;
  y: number;
}

export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
}

/**
 * Find path avoiding obstacles (simplified version)
 */
export function findPathAvoidingObstacles(
  from: Point,
  to: Point,
  obstacles: Obstacle[],
  excludeIds: string[],
  fromPort: 'top' | 'right' | 'bottom' | 'left',
  toPort: 'top' | 'right' | 'bottom' | 'left'
): Point[] {
  // For now, return a simple direct path
  // In a real implementation, this would calculate a path avoiding obstacles
  return [from, to];
}

/**
 * Get connector bounds
 */
export function getConnectorBounds(
  from: Point,
  to: Point,
  path: Point[]
): { x: number; y: number; width: number; height: number } {
  const minX = Math.min(from.x, to.x) - 10;
  const minY = Math.min(from.y, to.y) - 10;
  const maxX = Math.max(from.x, to.x) + 10;
  const maxY = Math.max(from.y, to.y) + 10;
  
  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}
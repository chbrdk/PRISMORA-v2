import { Prismion } from '@/types/prismora';

/**
 * Check if two rectangles overlap
 */
export function rectanglesOverlap(
  rect1: { x: number; y: number; w: number; h: number },
  rect2: { x: number; y: number; w: number; h: number }
): boolean {
  return !(
    rect1.x + rect1.w < rect2.x ||
    rect2.x + rect2.w < rect1.x ||
    rect1.y + rect1.h < rect2.y ||
    rect2.y + rect2.h < rect1.y
  );
}

/**
 * Resolve overlaps between prismions by moving them
 */
export function resolveOverlaps(prismions: Prismion[]): Prismion[];
export function resolveOverlaps(prismions: Record<string, Prismion>, targetId?: string, options?: { maxIterations?: number; snapToGrid?: number; padding?: number }): Record<string, Prismion>;
export function resolveOverlaps(
  prismions: Prismion[] | Record<string, Prismion>, 
  targetId?: string, 
  options?: { maxIterations?: number; snapToGrid?: number; padding?: number }
): Prismion[] | Record<string, Prismion> {
  // Handle Record<string, Prismion> case
  if (typeof prismions === 'object' && !Array.isArray(prismions)) {
    const prismionArray = Object.values(prismions);
    const resolvedArray = resolveOverlapsArray(prismionArray, targetId, options);
    
    // Convert back to Record format
    const result: Record<string, Prismion> = {};
    resolvedArray.forEach(prismion => {
      result[prismion.id] = prismion;
    });
    return result;
  }
  
  // Handle Prismion[] case
  return resolveOverlapsArray(prismions as Prismion[], targetId, options);
}

function resolveOverlapsArray(prismions: Prismion[], targetId?: string, options?: { maxIterations?: number; snapToGrid?: number; padding?: number }): Prismion[] {
  const resolved: Prismion[] = [];
  const padding = options?.padding || 20; // Minimum distance between prismions
  const maxIterations = options?.maxIterations || 100;
  const snapToGrid = options?.snapToGrid || 0;

  for (const prismion of prismions) {
    let newPosition = { ...prismion.position };
    let attempts = 0;
    const maxAttempts = maxIterations;

    while (attempts < maxAttempts) {
      const currentRect = {
        x: newPosition.x,
        y: newPosition.y,
        w: prismion.size.w + padding,
        h: prismion.size.h + padding
      };

      // Check for overlaps with already resolved prismions
      const hasOverlap = resolved.some(resolvedPrismion => {
        const resolvedRect = {
          x: resolvedPrismion.position.x,
          y: resolvedPrismion.position.y,
          w: resolvedPrismion.size.w + padding,
          h: resolvedPrismion.size.h + padding
        };
        return rectanglesOverlap(currentRect, resolvedRect);
      });

      if (!hasOverlap) {
        break;
      }

      // Try different positions
      const offset = 10 + attempts * 5; // Increasing offset
      const angle = (attempts * 45) % 360; // Rotate around
      const radians = (angle * Math.PI) / 180;
      
      newPosition.x += Math.cos(radians) * offset;
      newPosition.y += Math.sin(radians) * offset;
      attempts++;
    }

    // Apply snap to grid if enabled
    if (snapToGrid > 0) {
      newPosition.x = Math.round(newPosition.x / snapToGrid) * snapToGrid;
      newPosition.y = Math.round(newPosition.y / snapToGrid) * snapToGrid;
    }

    resolved.push({
      ...prismion,
      position: newPosition
    });
  }

  return resolved;
}

/**
 * Calculate distance between two points
 */
export function calculateDistance(
  point1: { x: number; y: number },
  point2: { x: number; y: number }
): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Find the closest prismion to a given point
 */
export function findClosestPrismion(
  point: { x: number; y: number },
  prismions: Prismion[]
): Prismion | null {
  if (prismions.length === 0) return null;

  let closest = prismions[0];
  let minDistance = calculateDistance(point, {
    x: closest.position.x + closest.size.w / 2,
    y: closest.position.y + closest.size.h / 2
  });

  for (let i = 1; i < prismions.length; i++) {
    const prismion = prismions[i];
    const center = {
      x: prismion.position.x + prismion.size.w / 2,
      y: prismion.position.y + prismion.size.h / 2
    };
    const distance = calculateDistance(point, center);

    if (distance < minDistance) {
      minDistance = distance;
      closest = prismion;
    }
  }

  return closest;
}
import { 
  Prismion, 
  DiffPayload, 
  MergeStrategy, 
  MergeResult, 
  Tag, 
  Attachment,
  MergeContext 
} from '@/types/prismora';

// ===== MERGE UTILITIES =====

/**
 * Erstellt einen Diff zwischen zwei Prismions
 */
export function createDiff(source: Prismion, target: Prismion): DiffPayload {
  const diff: DiffPayload = {};

  // Title diff
  if (source.title !== target.title) {
    diff.title = { from: target.title, to: source.title };
  }

  // Prompt diff
  if (source.prompt !== target.prompt) {
    diff.prompt = { from: target.prompt, to: source.prompt };
  }

  // Tags diff
  const sourceTagIds = new Set(source.tags.map(t => t.id));
  const targetTagIds = new Set(target.tags.map(t => t.id));
  
  const addedTags = source.tags.filter(t => !targetTagIds.has(t.id));
  const removedTags = target.tags.filter(t => !sourceTagIds.has(t.id));
  
  if (addedTags.length > 0 || removedTags.length > 0) {
    diff.tags = { add: addedTags, remove: removedTags };
  }

  return diff;
}

/**
 * Wendet einen Diff mit der angegebenen Strategie an
 */
export function applyMerge(
  target: Prismion, 
  diff: DiffPayload, 
  strategy: MergeStrategy
): MergeResult {
  try {
    let mergedPrismion: Prismion;

    switch (strategy) {
      case 'replace':
        mergedPrismion = applyReplaceStrategy(target, diff);
        break;
      case 'append':
        mergedPrismion = applyAppendStrategy(target, diff);
        break;
      case 'patch':
        mergedPrismion = applyPatchStrategy(target, diff);
        break;
      case 'custom':
        mergedPrismion = applyCustomStrategy(target, diff);
        break;
      default:
        throw new Error(`Unknown merge strategy: ${strategy}`);
    }

    return {
      success: true,
      mergedPrismion,
      auditLog: {
        id: `audit_${Date.now()}`,
        boardId: target.boardId,
        actorId: target.createdBy,
        type: 'MergeAccepted',
        payload: { strategy, diff },
        createdAt: new Date().toISOString(),
      },
    };
  } catch (error) {
    return {
      success: false,
      conflicts: [error instanceof Error ? error.message : 'Unknown error'],
    };
  }
}

/**
 * Replace Strategy: Komplett überschreiben
 */
function applyReplaceStrategy(target: Prismion, diff: DiffPayload): Prismion {
  return {
    ...target,
    title: diff.title?.to ?? target.title,
    prompt: diff.prompt?.to ?? target.prompt,
    tags: diff.tags ? mergeTagsReplace(target.tags, diff.tags) : target.tags,
    updatedAt: new Date().toISOString(),
    revision: target.revision + 1,
  };
}

/**
 * Append Strategy: Inhalt anhängen
 */
function applyAppendStrategy(target: Prismion, diff: DiffPayload): Prismion {
  const newPrompt = diff.prompt?.to 
    ? `${target.prompt}\n\n---\n\n${diff.prompt.to}`
    : target.prompt;

  return {
    ...target,
    title: diff.title?.to ?? target.title,
    prompt: newPrompt,
    tags: diff.tags ? mergeTagsAppend(target.tags, diff.tags) : target.tags,
    updatedAt: new Date().toISOString(),
    revision: target.revision + 1,
  };
}

/**
 * Patch Strategy: Feldweise mergen
 */
function applyPatchStrategy(target: Prismion, diff: DiffPayload): Prismion {
  const updates: Partial<Prismion> = {};

  if (diff.title?.to) {
    updates.title = diff.title.to;
  }

  if (diff.prompt?.to) {
    updates.prompt = diff.prompt.to;
  }

  if (diff.tags) {
    updates.tags = mergeTagsPatch(target.tags, diff.tags);
  }

  return {
    ...target,
    ...updates,
    updatedAt: new Date().toISOString(),
    revision: target.revision + 1,
  };
}

/**
 * Custom Strategy: Domänenspezifisch (z.B. LLM-Zusammenfassung)
 */
function applyCustomStrategy(target: Prismion, diff: DiffPayload): Prismion {
  // Hier könnte eine LLM-Zusammenfassung implementiert werden
  // Für jetzt verwenden wir eine intelligente Kombination
  
  const combinedPrompt = diff.prompt?.to 
    ? `${target.prompt}\n\n**Merged Content:**\n${diff.prompt.to}`
    : target.prompt;

  const combinedTags = diff.tags 
    ? mergeTagsIntelligent(target.tags, diff.tags)
    : target.tags;

  return {
    ...target,
    title: diff.title?.to ?? target.title,
    prompt: combinedPrompt,
    tags: combinedTags,
    updatedAt: new Date().toISOString(),
    revision: target.revision + 1,
  };
}

// ===== TAG MERGE FUNCTIONS =====

/**
 * Tags komplett ersetzen
 */
function mergeTagsReplace(currentTags: Tag[], diff: DiffPayload['tags']): Tag[] {
  if (!diff) return currentTags;
  
  const currentTagIds = new Set(currentTags.map(t => t.id));
  const removedTagIds = new Set(diff.remove.map(t => t.id));
  
  // Entferne gelöschte Tags
  const filteredTags = currentTags.filter(t => !removedTagIds.has(t.id));
  
  // Füge neue Tags hinzu
  const newTags = diff.add.filter(t => !currentTagIds.has(t.id));
  
  return [...filteredTags, ...newTags];
}

/**
 * Tags anhängen (keine Duplikate)
 */
function mergeTagsAppend(currentTags: Tag[], diff: DiffPayload['tags']): Tag[] {
  if (!diff) return currentTags;
  
  const currentTagIds = new Set(currentTags.map(t => t.id));
  const newTags = diff.add.filter(t => !currentTagIds.has(t.id));
  
  return [...currentTags, ...newTags];
}

/**
 * Tags intelligent patchen
 */
function mergeTagsPatch(currentTags: Tag[], diff: DiffPayload['tags']): Tag[] {
  if (!diff) return currentTags;
  
  const currentTagIds = new Set(currentTags.map(t => t.id));
  const removedTagIds = new Set(diff.remove.map(t => t.id));
  
  // Entferne gelöschte Tags
  const filteredTags = currentTags.filter(t => !removedTagIds.has(t.id));
  
  // Füge neue Tags hinzu
  const newTags = diff.add.filter(t => !currentTagIds.has(t.id));
  
  return [...filteredTags, ...newTags];
}

/**
 * Intelligente Tag-Kombination
 */
function mergeTagsIntelligent(currentTags: Tag[], diff: DiffPayload['tags']): Tag[] {
  if (!diff) return currentTags;
  
  // Kombiniere Tags basierend auf Label (nicht ID)
  const currentTagLabels = new Set(currentTags.map(t => t.label.toLowerCase()));
  const newTags = diff.add.filter(t => !currentTagLabels.has(t.label.toLowerCase()));
  
  // Entferne Tags basierend auf Label
  const removedTagLabels = new Set(diff.remove.map(t => t.label.toLowerCase()));
  const filteredTags = currentTags.filter(t => !removedTagLabels.has(t.label.toLowerCase()));
  
  return [...filteredTags, ...newTags];
}

// ===== VALIDATION FUNCTIONS =====

/**
 * Validiert einen Diff
 */
export function validateDiff(diff: DiffPayload): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Title validation
  if (diff.title?.to) {
    if (diff.title.to.length < 1) {
      errors.push('Title cannot be empty');
    }
    if (diff.title.to.length > 80) {
      errors.push('Title cannot exceed 80 characters');
    }
  }

  // Prompt validation
  if (diff.prompt?.to) {
    if (diff.prompt.to.length > 10000) {
      errors.push('Prompt cannot exceed 10,000 characters');
    }
  }

  // Tags validation
  if (diff.tags) {
    const totalTags = (diff.tags.add?.length || 0) + (diff.tags.remove?.length || 0);
    if (totalTags > 8) {
      errors.push('Cannot have more than 8 tags');
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Prüft auf Konflikte zwischen zwei Prismions
 */
export function checkConflicts(source: Prismion, target: Prismion): string[] {
  const conflicts: string[] = [];

  // Revision conflict
  if (target.revision > source.revision) {
    conflicts.push('Target has been updated since source was created');
  }

  // State conflicts
  if (target.state === 'locked') {
    conflicts.push('Target is locked and cannot be modified');
  }

  if (target.state === 'deleted') {
    conflicts.push('Target has been deleted');
  }

  return conflicts;
}

// ===== UTILITY FUNCTIONS =====

/**
 * Erstellt einen Merge-Kontext
 */
export function createMergeContext(
  source: Prismion, 
  target: Prismion, 
  strategy: MergeStrategy
): MergeContext {
  const diff = createDiff(source, target);
  
  return {
    source,
    target,
    strategy,
    diff,
  };
}

/**
 * Formatiert einen Diff für die Anzeige
 */
export function formatDiff(diff: DiffPayload): string {
  const parts: string[] = [];

  if (diff.title) {
    parts.push(`Title: "${diff.title.from}" → "${diff.title.to}"`);
  }

  if (diff.prompt) {
    const promptDiff = diff.prompt.from !== diff.prompt.to ? 'Modified' : 'Unchanged';
    parts.push(`Prompt: ${promptDiff}`);
  }

  if (diff.tags) {
    const addedCount = diff.tags.add.length;
    const removedCount = diff.tags.remove.length;
    if (addedCount > 0 || removedCount > 0) {
      parts.push(`Tags: +${addedCount} -${removedCount}`);
    }
  }

  return parts.join(', ');
}

/**
 * Berechnet die Ähnlichkeit zwischen zwei Prismions
 */
export function calculateSimilarity(source: Prismion, target: Prismion): number {
  let similarity = 0;
  let totalChecks = 0;

  // Title similarity
  if (source.title === target.title) {
    similarity += 1;
  }
  totalChecks += 1;

  // Prompt similarity (simple word overlap)
  const sourceWords = new Set(source.prompt.toLowerCase().split(/\s+/));
  const targetWords = new Set(target.prompt.toLowerCase().split(/\s+/));
  const intersection = new Set([...sourceWords].filter(x => targetWords.has(x)));
  const union = new Set([...sourceWords, ...targetWords]);
  
  if (union.size > 0) {
    similarity += intersection.size / union.size;
  }
  totalChecks += 1;

  // Tag similarity
  const sourceTagLabels = new Set(source.tags.map(t => t.label.toLowerCase()));
  const targetTagLabels = new Set(target.tags.map(t => t.label.toLowerCase()));
  const tagIntersection = new Set([...sourceTagLabels].filter(x => targetTagLabels.has(x)));
  const tagUnion = new Set([...sourceTagLabels, ...targetTagLabels]);
  
  if (tagUnion.size > 0) {
    similarity += tagIntersection.size / tagUnion.size;
  }
  totalChecks += 1;

  return totalChecks > 0 ? similarity / totalChecks : 0;
}

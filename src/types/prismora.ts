// ===== PRISMORA TYPE DEFINITIONS =====
// Basierend auf der Spezifikation v1.0

// ===== ID TYPES =====
export type ID = string; // cuid/uuid
export type UserID = ID;
export type BoardID = ID;
export type PrismionID = ID;
export type ConnectorID = ID;

// ===== ROLES & PERMISSIONS =====
export type Role = 'owner' | 'editor' | 'commenter' | 'viewer';

export interface Member {
  userId: UserID;
  role: Role;
  displayName: string;
  avatarUrl?: string;
}

// ===== BOARD & SETTINGS =====
export interface BoardSettings {
  gridVisible: boolean;
  snapToGrid: boolean;
  background: 'dots' | 'grid' | 'plain';
  theme: 'light' | 'dark' | 'system';
}

export interface CanvasSettings {
  backgroundColor: string;
  patternColor: string;
  patternSize: number;
  background: 'dots' | 'grid' | 'plain';
}

export interface Board {
  id: BoardID;
  shareId: string; // Public share ID for links
  title: string;
  description?: string;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  canvasSettings?: CanvasSettings;
  // Relations loaded separately
  prismions?: Prismion[];
  connections?: Connection[];
  participants?: BoardParticipant[];
}

// ===== BOARD PARTICIPANT =====
export type ParticipantRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface BoardParticipant {
  id: string;
  boardId: string;
  userId?: string; // Can be anonymous
  userName: string;
  userColor?: string;
  isActive: boolean;
  lastActiveAt: string;
  cursorX?: number;
  cursorY?: number;
  role: ParticipantRole;
  joinedAt: string;
}

// ===== PRISMION TYPES =====
export type PrismionState = 'draft' | 'active' | 'locked' | 'merged' | 'archived' | 'deleted';

export interface Tag {
  id: ID;
  label: string;
  colorToken: string;
}

export interface Port {
  id: ID;
  side: 'top' | 'right' | 'bottom' | 'left';
  capacity: 'single' | 'multi';
}

export interface Prismion {
  id: PrismionID;
  boardId: BoardID;
  title: string; // kurzer Titel
  prompt: string; // initialer Prompt (Markdown erlaubt)
  colorToken: string; // z.B. 'prismora.purple.500'
  tags: Tag[];
  position: { x: number; y: number; zIndex: number };
  size: { w: number; h: number; minW: number; minH: number };
  ports: { top: Port; right: Port; bottom: Port; left: Port };
  state: PrismionState;
  createdBy: UserID;
  createdAt: string;
  updatedAt: string;
  revision: number; // für Optimistic Concurrency
  branchMeta?: BranchMeta; // falls Start eines Sub-Threads
  mergeMeta?: MergeMeta; // Infos zu Merges in Mainline
  // Kind-spezifische Darstellung von Karten (optional, rückwärtskompatibel)
  kind?: PrismionKind;
  content?: PrismionContent;
}

// ===== CONNECTOR TYPES =====
export interface Connector {
  id: ConnectorID;
  boardId: BoardID;
  from: { prismionId: PrismionID; port: 'top' | 'right' | 'bottom' | 'left' };
  to: { prismionId: PrismionID; port: 'top' | 'right' | 'bottom' | 'left' };
  label?: string;
  createdBy: UserID;
  createdAt: string;
}

// ===== CONNECTION TYPES (Database Model) =====
export interface Connection {
  id: string;
  boardId: string;
  fromPrismionId: string;
  toPrismionId: string;
  fromPort?: string; // "top", "right", "bottom", "left"
  toPort?: string;   // "top", "right", "bottom", "left"
  label?: string;
  color?: string;
  strokeWidth: number;
  pathData?: any; // SVG path data for complex curves
  createdAt: string;
  updatedAt: string;
}

// ===== BRANCH & MERGE TYPES =====
export interface BranchMeta {
  parentPrismionId: PrismionID; // Quelle der Abzweigung
  branchId: ID; // logische Gruppierung von Sub-Prismions
  participants: UserID[];
}

export interface MergeMeta {
  mergedIntoPrismionId?: PrismionID; // Ziel im Hauptstrang
  lastMergeAt?: string;
  lastMergeBy?: UserID;
  strategy?: MergeStrategy;
}

export type MergeStrategy = 'replace' | 'append' | 'patch' | 'custom';

export interface MergeProposal {
  id: ID;
  boardId: BoardID;
  sourcePrismionId: PrismionID;
  targetPrismionId: PrismionID; // Ziel = Mainline Node
  createdBy: UserID;
  createdAt: string;
  diff: DiffPayload; // vorgeschlagene Änderungen
  status: 'open' | 'accepted' | 'rejected' | 'superseded';
  reviewers: {
    userId: UserID;
    decision?: 'accept' | 'reject';
    comment?: string;
    decidedAt?: string;
  }[];
}

export interface DiffPayload {
  title?: { from: string; to: string };
  prompt?: { from: string; to: string };
  tags?: { add: Tag[]; remove: Tag[] };
  attachments?: { add: Attachment[]; remove: ID[] };
}

export interface Attachment {
  id: ID;
  type: 'text' | 'image' | 'video' | 'file' | 'link';
  url?: string;
  content?: string;
  meta?: Record<string, any>;
}

// ===== PRESENCE & COLLABORATION =====
export interface Presence {
  userId: UserID;
  boardId: BoardID;
  cursor: { x: number; y: number };
  selectedPrismionIds: PrismionID[];
  colorToken: string;
  lastActiveAt: string;
}

// ===== AUDIT & EVENTS =====
export interface AuditLog {
  id: ID;
  boardId: BoardID;
  actorId: UserID;
  type: AuditEventType;
  payload: Record<string, any>;
  createdAt: string;
}

export type AuditEventType =
  | 'PrismionCreated'
  | 'PrismionUpdated'
  | 'PrismionMoved'
  | 'PrismionTagged'
  | 'ConnectorCreated'
  | 'ConnectorDeleted'
  | 'BranchStarted'
  | 'BranchJoined'
  | 'MergeProposed'
  | 'MergeAccepted'
  | 'MergeRejected'
  | 'BoardSettingsChanged';

// ===== UI STATE TYPES =====
export interface CanvasState {
  zoom: number;
  pan: { x: number; y: number };
  selectedPrismionIds: PrismionID[];
  selectedConnectorIds: ConnectorID[];
  isDragging: boolean;
  isConnecting: boolean;
  connectingFrom?: { prismionId: PrismionID; port: 'top' | 'right' | 'bottom' | 'left' };
}

export interface UIState {
  canvas: CanvasState;
  inspectorOpen: boolean;
  mergeDrawerOpen: boolean;
  contextMenu: {
    open: boolean;
    x: number;
    y: number;
    targetId?: ID;
    targetType?: 'prismion' | 'connector' | 'canvas';
  };
  commandPaletteOpen: boolean;
  presenterMode: boolean;
  presenterUserId?: UserID | null;
  presenterView?: { pan: { x: number; y: number }; zoom: number };
  followingPresenter?: boolean;
}

// ===== VALIDATION TYPES =====
export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// ===== REALTIME EVENT TYPES =====
export type ClientToServerEvent =
  | 'presence:update'
  | 'prismion:create'
  | 'prismion:update'
  | 'prismion:move'
  | 'prismion:delete'
  | 'connector:create'
  | 'connector:delete'
  | 'merge:propose'
  | 'merge:review'
  | 'merge:accept'
  | 'merge:reject';

export type ServerToClientEvent =
  | 'presence:sync'
  | 'prismion:created'
  | 'prismion:updated'
  | 'prismion:moved'
  | 'prismion:deleted'
  | 'connector:created'
  | 'connector:deleted'
  | 'merge:proposed'
  | 'merge:updated';

// ===== UTILITY TYPES =====
export type Position = { x: number; y: number };
export type Size = { w: number; h: number };
export type PortSide = 'top' | 'right' | 'bottom' | 'left';

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  errors?: ValidationError[];
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    cursor?: string;
    hasMore: boolean;
    total: number;
  };
}

// ===== MERGE UTILITY TYPES =====
export interface MergeContext {
  source: Prismion;
  target: Prismion;
  strategy: MergeStrategy;
  diff: DiffPayload;
}

export interface MergeResult {
  success: boolean;
  mergedPrismion?: Prismion;
  conflicts?: string[];
  auditLog?: AuditLog;
}

// ===== PRISMION KIND TYPES =====
export type PrismionKind =
  | 'prompt'
  | 'result.text'
  | 'result.richtext'
  | 'result.image'
  | 'result.video'
  | 'result.link'
  | 'attachment.file'
  | 'attachment.image';

export type PrismionContent =
  | { type: 'prompt'; prompt: string }
  | { type: 'result.text'; text: string }
  | { type: 'result.richtext'; html: string }
  | { type: 'result.image'; url: string; alt?: string }
  | { type: 'result.video'; url: string; poster?: string }
  | { type: 'result.link'; url: string; label?: string }
  | { type: 'attachment.file'; url: string; name?: string; sizeBytes?: number }
  | { type: 'attachment.image'; url: string; name?: string; sizeBytes?: number; alt?: string };

// (Redundant bottom re-exports removed. All types above are already exported.)

import { create } from 'zustand';
import { Board, Prismion, Connection, BoardParticipant, CanvasState, UIState } from '@/types/prismora';

interface BoardStore {
  // Board Slice
  currentBoard: Board | null;
  boards: Record<string, Board>;
  
  // Prismion Slice
  prismions: Record<string, Prismion>;
  
  // Connector Slice
  connectors: Record<string, Connection>;
  
  // Presence Slice
  presences: Record<string, BoardParticipant>;
  
  // Canvas Slice
  canvas: CanvasState;
  
  // UI Slice
  ui: UIState;
  
  // Actions
  setCurrentBoard: (board: Board | null) => void;
  setPrismions: (prismions: Prismion[]) => void;
  setConnections: (connections: Connection[]) => void;
  setParticipants: (participants: BoardParticipant[]) => void;
  
  // Canvas Actions
  setPan: (pan: { x: number; y: number }) => void;
  setZoom: (zoom: number) => void;
  setSelectedPrismionIds: (ids: string[]) => void;
  setSelectedConnectorIds: (ids: string[]) => void;
  setIsDragging: (isDragging: boolean) => void;
  setIsConnecting: (isConnecting: boolean) => void;
  setConnectingFrom: (from: { prismionId: string; port: 'top' | 'right' | 'bottom' | 'left' } | null) => void;
  
  // UI Actions
  setInspectorOpen: (open: boolean) => void;
  setMergeDrawerOpen: (open: boolean) => void;
  setContextMenu: (menu: UIState['contextMenu']) => void;
  setCommandPaletteOpen: (open: boolean) => void;
  setPresenterMode: (enabled: boolean) => void;
  setPresenterUser: (userId: string | null) => void;
  setPresenterView: (view: { pan: { x: number; y: number }; zoom: number } | null) => void;
  setFollowingPresenter: (enabled: boolean) => void;
}

const initialCanvasState: CanvasState = {
  zoom: 1,
  pan: { x: 0, y: 0 },
  selectedPrismionIds: [],
  selectedConnectorIds: [],
  isDragging: false,
  isConnecting: false,
  connectingFrom: null
};

const initialUIState: UIState = {
  canvas: initialCanvasState,
  inspectorOpen: false,
  mergeDrawerOpen: false,
  contextMenu: {
    open: false,
    x: 0,
    y: 0
  },
  commandPaletteOpen: false,
  presenterMode: false,
  presenterUserId: null,
  presenterView: null,
  followingPresenter: false
};

export const useBoardStore = create<BoardStore>((set, get) => ({
  // Initial State
  currentBoard: null,
  boards: {},
  prismions: {},
  connectors: {},
  presences: {},
  canvas: initialCanvasState,
  ui: initialUIState,
  
  // Actions
  setCurrentBoard: (board) => set({ currentBoard: board }),
  
  setPrismions: (prismions) => {
    const prismionMap = prismions.reduce((acc, prismion) => {
      acc[prismion.id] = prismion;
      return acc;
    }, {} as Record<string, Prismion>);
    set({ prismions: prismionMap });
  },
  
  setConnections: (connections) => {
    const connectionMap = connections.reduce((acc, connection) => {
      acc[connection.id] = connection;
      return acc;
    }, {} as Record<string, Connection>);
    set({ connectors: connectionMap });
  },
  
  setParticipants: (participants) => {
    const presenceMap = participants.reduce((acc, participant) => {
      acc[participant.id] = participant;
      return acc;
    }, {} as Record<string, BoardParticipant>);
    set({ presences: presenceMap });
  },
  
  // Canvas Actions
  setPan: (pan) => set((state) => ({
    canvas: { ...state.canvas, pan }
  })),
  
  setZoom: (zoom) => set((state) => ({
    canvas: { ...state.canvas, zoom }
  })),
  
  setSelectedPrismionIds: (selectedPrismionIds) => set((state) => ({
    canvas: { ...state.canvas, selectedPrismionIds }
  })),
  
  setSelectedConnectorIds: (selectedConnectorIds) => set((state) => ({
    canvas: { ...state.canvas, selectedConnectorIds }
  })),
  
  setIsDragging: (isDragging) => set((state) => ({
    canvas: { ...state.canvas, isDragging }
  })),
  
  setIsConnecting: (isConnecting) => set((state) => ({
    canvas: { ...state.canvas, isConnecting }
  })),
  
  setConnectingFrom: (connectingFrom) => set((state) => ({
    canvas: { ...state.canvas, connectingFrom }
  })),
  
  // UI Actions
  setInspectorOpen: (inspectorOpen) => set((state) => ({
    ui: { ...state.ui, inspectorOpen }
  })),
  
  setMergeDrawerOpen: (mergeDrawerOpen) => set((state) => ({
    ui: { ...state.ui, mergeDrawerOpen }
  })),
  
  setContextMenu: (contextMenu) => set((state) => ({
    ui: { ...state.ui, contextMenu }
  })),
  
  setCommandPaletteOpen: (commandPaletteOpen) => set((state) => ({
    ui: { ...state.ui, commandPaletteOpen }
  })),
  
  setPresenterMode: (presenterMode) => set((state) => ({
    ui: { ...state.ui, presenterMode }
  })),
  
  setPresenterUser: (presenterUserId) => set((state) => ({
    ui: { ...state.ui, presenterUserId }
  })),
  
  setPresenterView: (presenterView) => set((state) => ({
    ui: { ...state.ui, presenterView }
  })),
  
  setFollowingPresenter: (followingPresenter) => set((state) => ({
    ui: { ...state.ui, followingPresenter }
  }))
}));
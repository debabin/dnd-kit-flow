import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';

import type { AppState } from './types';
import { initialNodes, initialEdges } from './data';

const useStore = create<AppState>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  currentDragNode: undefined,
  currentDragOverNode: undefined,

  setNodeEntities: (nodeId, entities) => {
    set({
      nodes: get().nodes.map((node) =>
        node.id === nodeId ? { ...node, data: { ...node.data, entities } } : node
      )
    });
  },

  clearCurrentDragNode: () => {
    set({ currentDragNode: undefined });
  },

  clearCurrentDragOverNode: () => {
    set({ currentDragOverNode: undefined });
  },

  setCurrentDragNode: (position, type) => {
    set({ currentDragNode: { position, type } });
  },

  setCurrentDragOverNode: (overNode) => {
    set({ currentDragOverNode: overNode });
  },

  onNodesChange: (changes) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes)
    });
  },
  onEdgesChange: (changes) => {
    set({
      edges: applyEdgeChanges(changes, get().edges)
    });
  },
  onConnect: (connection) => {
    set({
      edges: addEdge(connection, get().edges)
    });
  },
  setNodes: (nodes) => {
    set({ nodes });
  },
  setEdges: (edges) => {
    set({ edges });
  }
}));

export default useStore;

export * from './types';

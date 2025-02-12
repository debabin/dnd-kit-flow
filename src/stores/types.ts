import type { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from '@xyflow/react';

export interface TextEntity {
  id: number;
  label: string;
  type: 'text';
}

export interface ImageEntity {
  id: number;
  src: string;
  type: 'image';
}

export interface GhostEntity {
  id: number;
  type: 'ghost';
}

export type Entity = GhostEntity | ImageEntity | TextEntity;

export type EntityCardNodeType = Node<
  {
    id: number;
    title: string;
    entities: Entity[];
  },
  'entityCard'
>;

export type AppNode = EntityCardNodeType;

export interface AppState {
  currentDragNode: { position: { x: number; y: number }; type: Entity['type'] } | undefined;
  currentDragOverNode: EntityCardNodeType | undefined;
  edges: Edge[];
  nodes: AppNode[];
  onConnect: OnConnect;
  onEdgesChange: OnEdgesChange;
  onNodesChange: OnNodesChange<AppNode>;
  clearCurrentDragNode: () => void;
  clearCurrentDragOverNode: () => void;
  setCurrentDragNode: (position: { x: number; y: number }, type: Entity['type']) => void;
  setCurrentDragOverNode: (overNode: EntityCardNodeType) => void;
  setEdges: (edges: Edge[]) => void;
  setNodeEntities: (nodeId: string, entities: Entity[]) => void;
  setNodes: (nodes: AppNode[]) => void;
}

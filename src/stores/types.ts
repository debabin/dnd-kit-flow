import type { Edge, Node, OnConnect, OnEdgesChange, OnNodesChange } from '@xyflow/react';

export interface TextEntity {
  id: number;
  type: 'text';
  label: string;
}

export interface ImageEntity {
  id: number;
  type: 'image';
  src: string;
}

export interface GhostEntity {
  id: number;
  type: 'ghost';
}

export type Entity = TextEntity | ImageEntity | GhostEntity;

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
  nodes: AppNode[];
  edges: Edge[];
  currentDragOverNode: EntityCardNodeType | undefined;
  currentDragNode: { position: { x: number; y: number }; type: Entity['type'] } | undefined;
  setCurrentDragNode: (position: { x: number; y: number }, type: Entity['type']) => void;
  clearCurrentDragNode: () => void;
  clearCurrentDragOverNode: () => void;
  setNodeEntities: (nodeId: string, entities: Entity[]) => void;
  setCurrentDragOverNode: (overNode: EntityCardNodeType) => void;
  onNodesChange: OnNodesChange<AppNode>;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  setNodes: (nodes: AppNode[]) => void;
  setEdges: (edges: Edge[]) => void;
}

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

export interface ButtonEntity {
  id: number;
  label: string;
  type: 'button';
}

export type Entity = ButtonEntity | ImageEntity | TextEntity;

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
  edges: Edge[];
  nodes: AppNode[];
  onConnect: OnConnect;
  deleteNode: (nodeId: string) => void;
  onEdgesChange: OnEdgesChange;
  onNodesChange: OnNodesChange<AppNode>;
  setEdges: (edges: Edge[]) => void;
  setNodeEntities: (nodeId: string, entities: Entity[]) => void;
  setNodes: (nodes: AppNode[]) => void;
}

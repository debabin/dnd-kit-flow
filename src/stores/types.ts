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

type Entity = TextEntity | ImageEntity;

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
    onNodesChange: OnNodesChange<AppNode>;
    onEdgesChange: OnEdgesChange;
    onConnect: OnConnect;
    setNodes: (nodes: AppNode[]) => void;
    setEdges: (edges: Edge[]) => void;
}

import { Edge } from '@xyflow/react';

import { AppNode } from './types';

export const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' }
] as Edge[];

export const initialNodes = [
  {
    id: '1',
    type: 'entityCard',
    data: {
      id: 1,
      title: 'Input',
      entities: [
        { type: 'text', label: 'Input 1', id: 1 },
        { type: 'text', label: 'Input 2', id: 2 }
      ]
    },
    position: { x: 250, y: 50 }
  },

  {
    id: '2',
    type: 'entityCard',
    data: {
      id: 2,
      title: 'Input',
      entities: [{ type: 'text', label: 'Input', id: 3 }]
    },
    position: { x: 10, y: 225 }
  },
  {
    id: '3',
    type: 'entityCard',
    data: {
      id: 1,
      title: 'Input',
      entities: [
        { type: 'text', label: 'Input', id: 4 },
        { type: 'image', src: '', id: 5 }
      ]
    },
    position: { x: 350, y: 450 }
  }
] satisfies AppNode[];

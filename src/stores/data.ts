import type { Edge } from '@xyflow/react';

import type { AppNode } from './types';

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
        { type: 'button', label: 'Button 1', id: 2 }
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
      entities: [
        { type: 'text', label: 'Input', id: 3 },
        { type: 'button', label: 'Button 2', id: 4 }
      ]
    },
    position: { x: 400, y: 300 }
  },
  {
    id: '3',
    type: 'entityCard',
    data: {
      id: 1,
      title: 'Input',
      entities: [
        { type: 'text', label: 'Input', id: 4 },
        {
          type: 'image',
          src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWBqmciyT4ZAathzJOwyz3iQ6tvEn9T-npjA&s',
          id: 5
        }
      ]
    },
    position: { x: 600, y: 650 }
  }
] satisfies AppNode[];

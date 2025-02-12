import { DndContext, DragOverlay } from '@dnd-kit/core';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useReactFlow } from '@xyflow/react';
import { createPortal } from 'react-dom';

import type { AppNode, Entity, EntityCardNodeType } from './stores';

import { Flow, Sidebar } from './components';
import useStore from './stores';

export const Layout = () => {
  return (
    <div className='flex'>
      <Sidebar />
      <Flow />
    </div>
  );
};

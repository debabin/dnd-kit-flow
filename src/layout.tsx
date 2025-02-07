import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Flow, Sidebar } from './components';
import { createPortal } from 'react-dom';

export const Layout = () => (
  <div className='flex'>
    <DndContext
      onDragOver={(event) => {
        console.log('@', event);
      }}
      onDragEnd={(event) => {
        console.log('@', event);
      }}
    >
      <Sidebar />
      {createPortal(
        <DragOverlay dropAnimation={null}>
          <div className='bg-gray-900 p-2 rounded-full text-white text-center'>overlay</div>
        </DragOverlay>,
        document.body
      )}
    </DndContext>

    <Flow />
  </div>
);


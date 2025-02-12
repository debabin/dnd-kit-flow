import type { NodeProps } from '@xyflow/react';

import { DndContext } from '@dnd-kit/core';
import { animations } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Handle, Position } from '@xyflow/react';

import type { EntityCardNodeType } from '../../../stores';

export const EntityCard = ({ id, data }: NodeProps<EntityCardNodeType>) => {
  const [parentRef, entities] = useDragAndDrop<any>(data.entities, {
    group: 'nodes',
    plugins: [animations()],
    onDragstart: (e) => {
      console.log('start', e);
    },
    onDragend: (e) => {
      console.log('end', e);
    }
  });

  console.log('@@', id);

  return (
    <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
      <Handle type='target' position={Position.Top} />
      <h2 className='mb-2 text-lg'>{data.title}</h2>
      <div ref={parentRef} className='flex flex-col gap-2'>
        {entities.map((entity: any) => (
          <div key={entity.id}>
            {entity.type === 'text' && (
              <textarea
                disabled
                className='bg-gray-50 resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                defaultValue={entity.label}
              />
            )}
            {entity.type === 'ghost' && <div className='bg-gray-100 w-full h-[50px]' />}
            {entity.type === 'image' && (
              <div style={{ padding: 20 }}>
                <img className='nodrag' src={entity.src} />
              </div>
            )}
          </div>
        ))}
      </div>
      <Handle type='source' position={Position.Bottom} />
    </div>
  );
};

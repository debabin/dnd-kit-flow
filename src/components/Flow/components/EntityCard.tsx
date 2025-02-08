import { NodeProps, Handle, Position } from '@xyflow/react';

import type { EntityCardNodeType } from '../../../stores';
import { SortableContext } from '@dnd-kit/sortable';
import { SortableItem } from '../../DnD/Sortable';
import { Droppable } from '../../DnD/Droppable';
import { DndContext } from '@dnd-kit/core';

export const EntityCard = ({ id, data }: NodeProps<EntityCardNodeType>) => {
  const cardIds = data.entities.map((entity) => entity.id);

  console.log('entity card', id);

  return (
    <DndContext
      onDragOver={(event) => {
        console.log('@', event);
      }}
      onDragEnd={() => {
        console.log('@@', event);
      }}
    >
      <Droppable id={id} key={id}>
        <SortableContext items={cardIds}>
          <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
            <Handle type='target' position={Position.Top} />
            <h2 className='mb-2 text-lg'>{data.title}</h2>
            <div className='flex flex-col gap-2'>
              {data.entities.map((entity) => (
                <SortableItem id={entity.id}>
                  <div>
                    {entity.type === 'text' && (
                      <textarea
                        defaultValue={entity.label}
                        className='bg-gray-50 resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                        disabled
                      />
                    )}
                    {entity.type === 'ghost' && <div className='bg-gray-100 w-full h-[50px]' />}
                    {entity.type === 'image' && (
                      <div style={{ padding: 20 }}>
                        <img src={entity.src} className='nodrag' />
                      </div>
                    )}
                  </div>
                </SortableItem>
              ))}
            </div>
            <Handle type='source' position={Position.Bottom} />
          </div>
        </SortableContext>
      </Droppable>
    </DndContext>
  );
};

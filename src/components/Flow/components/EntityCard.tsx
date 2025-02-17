import type { DragState } from '@formkit/drag-and-drop';
import type { NodeProps } from '@xyflow/react';

import { animations } from '@formkit/drag-and-drop';
import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { Handle, Position, useNodeConnections, useReactFlow } from '@xyflow/react';
import { GripVerticalIcon } from 'lucide-react';

import type { AppNode, Entity, EntityCardNodeType } from '../../../stores';

import useStore from '../../../stores';

export const EntityCard = ({ data, id }: NodeProps<EntityCardNodeType>) => {
  const reactFlow = useReactFlow();
  const targetNodeConnections = useNodeConnections({ id, handleType: 'target' });

  const [nodeParentRef, entities] = useDragAndDrop<HTMLDivElement, Entity>(data.entities, {
    group: 'nodes',
    sortable: true,
    nativeDrag: false,
    dragHandle: '.handle',
    onDragend: ({ parent, state, draggedNode }) => {
      if (!parent.el.dataset.isCanvas) return;

      const { nodes, setNodes } = useStore.getState();

      const viewport = reactFlow.getViewport();

      const position = reactFlow.screenToFlowPosition({
        x: (state as DragState<any>).coordinates.x - 100 * viewport.zoom,
        y: (state as DragState<any>).coordinates.y - 75 * viewport.zoom
      });

      const newNodeId = Math.random();

      const newNode: AppNode = {
        id: newNodeId.toString(),
        type: 'entityCard',
        position,
        data: {
          title: 'Input',
          id: newNodeId,
          entities: [draggedNode.data.value as Entity]
        }
      };

      setNodes([...nodes, newNode]);
    },
    plugins: [animations({ duration: 150 })]
  });

  return (
    <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-md'>
      <Handle
        style={{
          width: '15px',
          height: '15px',
          background: 'gray'
        }}
        type='target'
        isConnectable={targetNodeConnections.length === 0}
        position={Position.Top}
      />
      <h2 className='mb-2 text-lg'>{data.title}</h2>
      <div ref={nodeParentRef} className='flex flex-col gap-2' data-entity-card-id={id}>
        {!entities.length && (
          <div className='border-indigo-200 border w-[170px] h-10 flex items-center justify-center'>
            +
          </div>
        )}
        {entities.map((entity) => (
          <div key={entity.id} className='flex items-center' data-entity-type={entity.type}>
            <GripVerticalIcon className='handle' size={30} color='gray' />
            {entity.type === 'button' && (
              <div className='flex gap- items-center relative'>
                <input
                  disabled
                  className='bg-gray-50 resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                  defaultValue={entity.label}
                />
                <Handle
                  style={{
                    width: '15px',
                    height: '15px',
                    background: 'gray'
                  }}
                  id={`${entity.id}`}
                  type='source'
                  position={Position.Right}
                />
              </div>
            )}
            {entity.type === 'text' && (
              <textarea
                disabled
                className='bg-gray-50 resize-none border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5'
                defaultValue={entity.label ?? 'Текст отсутвует'}
              />
            )}
            {entity.type === 'image' && (
              <img
                className='nodrag rounded-xl object-cover w-[180px] h-[100px]'
                src={entity.src}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

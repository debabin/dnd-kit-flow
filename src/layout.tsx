import { DndContext, DragOverlay } from '@dnd-kit/core';
import { Flow, Sidebar } from './components';
import { createPortal } from 'react-dom';
import useStore, { AppNode, Entity, EntityCardNodeType } from './stores';
import { useReactFlow } from '@xyflow/react';

export const Layout = () => {
  const reactFlow = useReactFlow();

  return (
    <div className='flex'>
      <DndContext
        onDragMove={(e) => {
          const {
            setCurrentDragNode,
            setNodeEntities,
            currentDragOverNode,
            setCurrentDragOverNode,
            clearCurrentDragOverNode
          } = useStore.getState();

          const position = reactFlow.screenToFlowPosition({
            x: (e.activatorEvent as DragEvent).clientX + e.delta.x - 100,
            y: (e.activatorEvent as DragEvent).clientY + e.delta.y - 75
          });

          setCurrentDragNode(position, `${e.active.id}` as Entity['type']);

          const overNode = reactFlow.getIntersectingNodes({
            ...position,
            height: 5,
            width: 5
          })[0] as EntityCardNodeType;

          if (!overNode) {
            if (currentDragOverNode) {
              setNodeEntities(
                currentDragOverNode.id,
                currentDragOverNode.data.entities.filter((entity) => entity.id !== -1)
              );
              clearCurrentDragOverNode();
            }
            return;
          }

          setCurrentDragOverNode(overNode);

          const {
            data: { entities },
            id
          } = overNode;

          if (!entities.find((entity) => entity.id === -1)) {
            return setNodeEntities(id, [...entities, { type: 'ghost', id: -1 }]);
          }
        }}
        onDragEnd={() => {
          const {
            currentDragNode,
            nodes,
            setNodes,
            clearCurrentDragNode,
            clearCurrentDragOverNode,
            currentDragOverNode,
            setNodeEntities
          } = useStore.getState();

          if (!currentDragNode) return;

          if (currentDragOverNode) {
            const ghostIndex = currentDragOverNode.data.entities.findIndex(
              (entity) => entity.id === -1
            );

            const newEntities = [...currentDragOverNode.data.entities];
            newEntities[ghostIndex] = { type: currentDragNode.type, id: Date.now() } as Entity;

            setNodeEntities(currentDragOverNode.id, newEntities as Entity[]);

            clearCurrentDragOverNode();
            clearCurrentDragNode();

            return;
          }

          const newNode: AppNode = {
            id: `${nodes.length + 1}`,
            type: 'entityCard',
            position: currentDragNode.position,
            data: {
              title: 'Input',
              id: Date.now(),
              entities: [{ type: currentDragNode.type as Entity['type'], id: Date.now() } as Entity]
            }
          };

          setNodes([...nodes, newNode]);
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
};

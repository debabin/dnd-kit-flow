import type { DragState } from '@formkit/drag-and-drop';

import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useReactFlow } from '@xyflow/react';
import { ImageIcon, TextIcon } from 'lucide-react';

import type { AppNode, Entity } from '../../stores';

import useStore from '../../stores';
import { SidebarItem } from './components/SidebarItem';

const LIST = [
  {
    id: 'text-node',
    type: 'text',
    label: 'Text node',
    icon: TextIcon
  },
  {
    id: 'image-node',
    type: 'image',
    label: 'Image node',
    icon: ImageIcon
  }
];

export const Sidebar = () => {
  const reactFlow = useReactFlow();

  const [parentRef, _, setValues] = useDragAndDrop<HTMLUListElement>(LIST, {
    group: 'nodes',
    sortable: false,
    disabled: false,
    nativeDrag: false,
    onTransfer: () => {
      console.log('@@@ transfer');
    },
    onDragend: (event) => {
      const { nodes, setNodes, setNodeEntities } = useStore.getState();

      if (event.draggedNode.el.tagName !== 'LI' && event.parent.el.dataset.entityCardId) {
        setValues(LIST);
        setNodeEntities(event.parent.el.dataset.entityCardId, event.values as Entity[]);
        return;
      }

      const viewport = reactFlow.getViewport();

      const position = reactFlow.screenToFlowPosition({
        x: (event.state as DragState<any>).coordinates.x - 100 * viewport.zoom,
        y: (event.state as DragState<any>).coordinates.y - 75 * viewport.zoom
      });

      const id = Math.random();

      const newNode: AppNode = {
        id: id.toString(),
        type: 'entityCard',
        position,
        data: {
          title: 'Input',
          id,
          entities: [{ type: 'text', id: Math.random() } as Entity]
        }
      };

      setNodes([...nodes, newNode]);
      setValues(LIST);
    }
  });

  return (
    <aside aria-label='Sidebar' className='w-[12%] h-screen z-20' id='default-sidebar'>
      <div className='h-full px-3 py-4 bg-gray-50'>
        <ul ref={parentRef} className='space-y-2 font-medium '>
          {LIST.map((item) => (
            <li key={item.type}>
              <SidebarItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

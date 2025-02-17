import type { DragState } from '@formkit/drag-and-drop';

import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useReactFlow } from '@xyflow/react';
import { ImageIcon, MousePointerClick, TextIcon } from 'lucide-react';

import type { AppNode, Entity } from '../../stores';

import useStore from '../../stores';
import { SidebarItem } from './components/SidebarItem';

export const Sidebar = () => {
  const reactFlow = useReactFlow();

  const LIST = [
    {
      id: Math.random(),
      type: 'text',
      label: 'Text node',
      icon: TextIcon
    },
    {
      id: Math.random(),
      type: 'image',
      label: 'Image node',
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAi39gLPZ8LriGOi4T_kcuP6fH8Lh8Vev_gQ&s',
      icon: ImageIcon
    },
    { id: Math.random(), type: 'button', label: 'Button node', icon: MousePointerClick }
  ];

  const [parentRef, _, setValues] = useDragAndDrop<HTMLUListElement>(LIST, {
    group: 'nodes',
    nativeDrag: false,
    selectedClass: 'bg-black opacity-50 text-white stroke-white rounded-2xl ',
    onDragend: ({ parent, state, values }) => {
      const { nodes, setNodes, setNodeEntities } = useStore.getState();

      if (!parent.el.dataset.isCanvas) {
        if (parent.el.dataset.entityCardId) {
          setValues(LIST);
          setNodeEntities(parent.el.dataset.entityCardId, values as Entity[]);
        }
        return;
      }

      const viewport = reactFlow.getViewport();

      const position = reactFlow.screenToFlowPosition({
        x: (state as DragState<any>).coordinates.x - 100 * viewport.zoom,
        y: (state as DragState<any>).coordinates.y - 75 * viewport.zoom
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
    <aside aria-label='Sidebar' className='w-[12%]  h-screen z-20' id='default-sidebar'>
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

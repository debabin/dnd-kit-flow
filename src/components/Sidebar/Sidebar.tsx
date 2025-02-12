import type { DragState } from '@formkit/drag-and-drop';

import { useDragAndDrop } from '@formkit/drag-and-drop/react';
import { useReactFlow } from '@xyflow/react';
import { ImageIcon, TextIcon } from 'lucide-react';

import type { AppNode, Entity } from '../../stores';

import useStore from '../../stores';
import { SidebarItem } from './components/SidebarItem';

export const LIST = [
  {
    type: 'text',
    label: 'Text node',
    icon: TextIcon
  },
  {
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
    onDragend: (e) => {
      const { nodes, setNodes } = useStore.getState();

      if (e.draggedNode.el.tagName !== 'LI') return setValues((prev) => prev);

      const viewport = reactFlow.getViewport();

      const position = reactFlow.screenToFlowPosition({
        x: (e.state as DragState<any>).coordinates.x - 100 * viewport.zoom,
        y: (e.state as DragState<any>).coordinates.y - 75 * viewport.zoom
      });

      const newNode: AppNode = {
        id: Date.now().toString(),
        type: 'entityCard',
        position,
        data: {
          title: 'Input',
          id: Date.now(),
          entities: [{ type: 'text', id: Date.now() } as Entity]
        }
      };

      setNodes([...nodes, newNode]);
    }
  });

  return (
    <aside aria-label='Sidebar' className='w-[12%] h-screen z-20' id='default-sidebar'>
      <div className='h-full px-3 py-4 bg-gray-50'>
        <ul ref={parentRef} className='space-y-2 font-medium '>
          {LIST.map((item: any) => (
            <li key={item.type}>
              <SidebarItem {...item} />
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

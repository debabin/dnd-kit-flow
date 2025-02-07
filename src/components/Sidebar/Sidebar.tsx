import { ImageIcon, TextIcon } from 'lucide-react';
import { SidebarItem } from './components/SidebarItem';
import { Draggable } from '../DnD/Draggable';
import { DragOverlay } from '@dnd-kit/core';
import { createPortal } from 'react-dom';

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
    return (
        <aside id='default-sidebar' className='w-[12%] h-screen z-20' aria-label='Sidebar'>
            <div className='h-full px-3 py-4 bg-gray-50'>
                <ul className='space-y-2 font-medium '>
                    {LIST.map((item) => (
                        <li key={item.type}>
                            <Draggable id={item.type}>
                                <SidebarItem {...item} />
                            </Draggable>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

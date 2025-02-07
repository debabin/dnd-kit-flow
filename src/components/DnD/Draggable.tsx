import { useDraggable } from '@dnd-kit/core';

export const Draggable = (props: any) => {
    const Element = props.element || 'div';
    const { attributes, listeners, setNodeRef } = useDraggable({
        id: props.id
    });

    // const style = {
    //     transform: CSS.Translate.toString(transform)
    // };

    return (
        <Element ref={setNodeRef}  {...listeners} {...attributes}>
            {props.children}
        </Element>
    );
};

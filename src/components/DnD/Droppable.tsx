import { useDroppable } from '@dnd-kit/core';

export const Droppable = (props: any) => {
    const { setNodeRef } = useDroppable({
        id: props.id
    });

    return (
        <div ref={setNodeRef} id={`droppable-${props.id}`}>
            {props.children}
        </div>
    );
};

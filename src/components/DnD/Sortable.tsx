import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useMemo, cloneElement } from 'react';

export const SortableItem = (props: any) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: props.id
  });
  console.log('@sortable item', props.id);

  const clonedChild = useMemo(
    () =>
      cloneElement(props.children, {
        isDragging
      }),
    [props.children, props.id, isDragging]
  );

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {clonedChild}
    </div>
  );
};

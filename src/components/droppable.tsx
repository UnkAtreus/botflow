import React, { useId } from 'react';
import { useDroppable } from '@dnd-kit/core';

export function Droppable({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  const id = useId();
  const { isOver, setNodeRef } = useDroppable({
    id: id,
  });
  const style = {
    color: isOver ? 'green' : undefined,
  };

  return (
    <div ref={setNodeRef} style={style}>
      {children}
    </div>
  );
}

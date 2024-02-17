import React, { useId } from 'react';
import { Button, ButtonProps } from './ui/button';
import { cn } from '@/lib/utils';
import { useDraggable } from '@dnd-kit/core';

export function ActionButton({
  title,
  icon,
  ...props
}: ButtonProps & {
  title: string;
  icon: React.ReactElement;
}) {
  const id = useId();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <Button
      ref={setNodeRef}
      style={style}
      variant='outline'
      className='justify-start px-4 z-50'
      size='lg'
      {...listeners}
      {...attributes}
      {...props}
    >
      {React.cloneElement(icon as React.ReactElement, {
        className: cn('h-6 w-6 mr-2 text-gray-700', icon.props.className),
      })}
      {title}
    </Button>
  );
}

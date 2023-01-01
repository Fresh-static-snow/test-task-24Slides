import { memo } from 'react';
import { useRenderHighlight } from '~/utils/cssUtils';
import { TodoItemProps } from './Optimize1.types';
import css from './Optimize1.module.scss';

export const TodoItem = memo(({ todo, onClick }: TodoItemProps) => {
  const { done, text, id } = todo;
  const ref = useRenderHighlight<HTMLLIElement>(css.render);
  return (
    <li ref={ref} onClick={() => onClick(id)}>
      {done ? '[x]' : '[ ]'} {text}
    </li>
  );
});

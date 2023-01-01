import { useCallback, useState } from 'react';
import { CenteredBox } from '~/components';
import { Todo } from './Optimize1.types';
import { TodoItem } from './TodoItem';

const todosList: Todo[] = [
  { id: 1, text: 'run a marathon', done: false },
  { id: 2, text: 'ride an elephant', done: false },
  { id: 3, text: 'swim with a fish', done: false },
];

export const Optimize1 = (): JSX.Element => {
  const [todos, setTodos] = useState(todosList);

  const handleTodoClick = useCallback((id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CenteredBox className="gap-4">
      <div className="text-3xl">Now It not re-renders all items!</div>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onClick={handleTodoClick} />
        ))}
      </ul>
    </CenteredBox>
  );
};

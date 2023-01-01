export interface Todo {
  id: number;
  text: string;
  done: boolean;
}

export interface TodoItemProps {
  todo: Todo;
  onClick: (id: number) => void;
}

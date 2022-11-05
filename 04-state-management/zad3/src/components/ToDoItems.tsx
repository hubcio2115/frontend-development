import { Todo } from '../App';

interface ToDoItemsProps {
  todos: Todo[];
}

const ToDoItems = ({ todos }: ToDoItemsProps) => (
  <ul style={{ marginLeft: 'auto', marginRight: 'auto' }}>
    {todos.map((todo, index) => (
      <li key={index}>{`${todo.name} : ${todo.date}`}</li>
    ))}
  </ul>
);

export default ToDoItems;

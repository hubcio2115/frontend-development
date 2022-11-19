import { useState } from 'react';

import ToDoItems from './components/ToDoItems';
import ToDoForm from './components/ToDoForm';

export interface Todo {
  name: string;
  date: Date;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <ToDoForm handleAddTodo={handleAddTodo} />

      <ToDoItems todos={todos} />
    </div>
  );
};

export default App;

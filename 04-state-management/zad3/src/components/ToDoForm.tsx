import { FormEvent, useState } from 'react';
import { Todo } from '../App';
import FormToDoDate from './form/FormToDoDate';
import FormToDoItem from './form/FormToDoItem';
import FormToDoMessages from './form/FormToDoMessages';

interface ToDoFormProps {
  handleAddTodo: (todo: Todo) => void;
}

const ToDoForm = ({ handleAddTodo }: ToDoFormProps) => {
  const [name, setName] = useState('');
  const [date, setDate] = useState<Date | null>(null);

  const [infoMessages, setInfoMessages] = useState<string[]>([]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInfoMessages([]);

    const isNameValid = name.length !== 0;
    const isDateValid = date !== null;

    if (isNameValid && isDateValid) {
      handleAddTodo({ name, date });
      setInfoMessages(['All Good :)']);
    } else {
      if (!isNameValid) setInfoMessages([...infoMessages, 'Name is required']);
      if (!isDateValid)
        setInfoMessages([...infoMessages, 'Date has to be later than today']);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '15%',
        width: '100%',
      }}
    >
      <div
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}
      >
        <div
          style={{
            display: 'flex',
            width: '33%',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <FormToDoItem name={name} setName={setName} />

          <FormToDoDate setDate={setDate} />
        </div>

        <div>
          <button type="submit">ok</button>
        </div>
      </div>

      <FormToDoMessages infoMessages={infoMessages} />
    </form>
  );
};

export default ToDoForm;

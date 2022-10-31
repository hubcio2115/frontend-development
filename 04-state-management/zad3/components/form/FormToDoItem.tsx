import { Dispatch, SetStateAction } from 'react';

interface FormToDoItemProps {
  name: string;
  setName: Dispatch<SetStateAction<string>>;
}

const FormToDoItem = ({ name, setName }: FormToDoItemProps) => (
  <input
    type="text"
    value={name}
    onChange={(e) => setName(e.target.value)}
    required
  />
);

export default FormToDoItem;

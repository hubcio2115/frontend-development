import { type FormEvent } from 'react';
import { FormContext } from '../context/FormContext';
import Input from './Input';

interface FormProps {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

const Form = ({ handleSubmit }: FormProps) => (
  <form onSubmit={handleSubmit}>
    <Input name="email" type="text" required />

    <Input name="password" type="password" required />

    <button type="submit">Submit</button>
  </form>
);

export default Form;

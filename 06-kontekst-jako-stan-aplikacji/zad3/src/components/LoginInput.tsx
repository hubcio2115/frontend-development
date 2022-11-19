import {
  type InputHTMLAttributes,
  useContext,
  useState,
  useEffect,
} from 'react';
import { LoginFormContext } from '../context/LoginFormContext';
import useDebounce from '../hooks/useDebounce';
import { LoginFormActionTypes, type LoginFormValues } from '../types/loginForm';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: keyof LoginFormValues;
}

const Input = (props: InputProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const { formState, formStateDispatch, validate } =
    useContext(LoginFormContext)!;

  const handleChange = (action: LoginFormActionTypes, value: string) => {
    formStateDispatch({ type: action, payload: value });
  };

  const debounceValue = useDebounce(props.name, 1);
  useEffect(() => {
    if (isTouched) validate(debounceValue);
  }, [formState.values, isTouched]);

  return (
    <div>
      <input
        {...props}
        value={formState.values[props.name]}
        onChange={(e) => {
          if (isTouched) validate(props.name);
          handleChange(props.name, e.target.value);
        }}
        onBlur={() => {
          if (!isTouched) setIsTouched(true);
          validate(props.name);
        }}
      />

      {!!formState.errors[`${props.name}Error`] ? (
        <p>{formState.errors[`${props.name}Error`]}</p>
      ) : null}
    </div>
  );
};

export default Input;

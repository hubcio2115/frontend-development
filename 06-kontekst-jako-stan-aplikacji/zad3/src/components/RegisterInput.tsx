import {
  type InputHTMLAttributes,
  useContext,
  useState,
  useEffect,
} from 'react';
import { RegisterFormContext } from '../context/RegisterFormContext';
import useDebounce from '../hooks/useDebounce';
import {
  RegisterFormActionTypes,
  type RegisterFormValues,
} from '../types/registerForm';

interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
  name: keyof Omit<RegisterFormValues, 'acceptTermsCheckbox'>;
}

const Input = (props: InputProps) => {
  const [isTouched, setIsTouched] = useState(false);

  const { formState, formStateDispatch, validate } =
    useContext(RegisterFormContext)!;

  const handleChange = (
    action: RegisterFormActionTypes,
    value: string | Date,
  ) => {
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
        value={
          props.name === 'birthday'
            ? formState.values.birthday.toISOString().slice(0, 10)
            : formState.values[props.name]?.toString()
        }
        onChange={(e) => {
          if (isTouched) validate(props.name);

          handleChange(
            props.name,
            !!e.target.valueAsDate ? e.target.valueAsDate : e.target.value,
          );
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

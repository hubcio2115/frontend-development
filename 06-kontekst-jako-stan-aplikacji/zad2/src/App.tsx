import {
  type FormEvent,
  Reducer,
  useReducer,
  useState,
  useEffect,
} from 'react';
import { FormContext } from './context/FormContext';
import {
  type FormAction,
  type FormMessage,
  formSchema,
  FormErrors,
  FormState,
} from './types/form';
import accounts from './data/accounts.json';
import Form from './components/Form';

const formInitialState = {
  values: {
    email: '',
    password: '',
  },
  errors: {
    emailError: '',
    passwordError: '',
  },
};

const App = () => {
  const [formMessage, setFormMessage] = useState<FormMessage>('');

  const formReducer: Reducer<FormState, FormAction> = (
    formState: FormState,
    action,
  ): FormState => {
    switch (action.type) {
      case 'email':
      case 'password':
        return {
          ...formState,
          values: { ...formState.values, [action.type]: action.payload },
        };
      case 'emailError':
      case 'passwordError':
        return {
          ...formState,
          errors: {
            ...formState.errors,
            [action.type]: action.payload,
          },
        };
    }
  };

  const [formState, formStateDispatch] = useReducer(
    formReducer,
    formInitialState,
  );

  useEffect(() => {
    console.dir(formState, { length: NaN });
  }, [formState]);

  const validate = (what: FormErrors) => {
    const parseOutput = formSchema.shape.values.shape[what].safeParse(
      formState.values[what],
    );

    console.log(what);

    if (!parseOutput.success) {
      formStateDispatch({
        type: `${what}Error`,
        payload: parseOutput.error.issues[0].message,
      });
    } else {
      formStateDispatch({
        type: `${what}Error`,
        payload: '',
      });
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Object.keys(formState.values).forEach((key) => {
      validate(key as FormErrors);
    });

    if (
      Object.keys(formState.errors).reduce((acc, el) => {
        if (formState.errors[el as keyof FormState['errors']] !== '')
          return false;
        return acc;
      }, true)
    ) {
      if (
        accounts.some(
          (account) =>
            account.email === formState.values.email &&
            account.password === formState.values.password,
        )
      )
        setFormMessage('Login Successful :D');
      else setFormMessage('Login Unsuccessful :(');
    }
  };

  return (
    <FormContext.Provider
      value={{
        formState,
        formStateDispatch,
        validate,
      }}
    >
      <Form handleSubmit={handleSubmit} />
      <p>{formMessage}</p>
    </FormContext.Provider>
  );
};

export default App;

import { type FormEvent, Reducer, useReducer, useState } from 'react';
import {
  type LoginFormAction,
  type LoginFormMessage,
  loginFormSchema,
  LoginFormErrors,
  LoginFormState,
} from '../types/loginForm';
import { LoginFormContext } from '../context/LoginFormContext';
import accounts from '../data/accounts.json';
import Input from '../components/LoginInput';

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

const LoginForm = () => {
  const [LoginFormMessage, setLoginFormMessage] =
    useState<LoginFormMessage>('');
  const formReducer: Reducer<LoginFormState, LoginFormAction> = (
    formState: LoginFormState,
    action,
  ): LoginFormState => {
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

  const validate = (what: LoginFormErrors) => {
    const parseOutput = loginFormSchema.shape.values.shape[what].safeParse(
      formState.values[what],
    );

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
      validate(key as LoginFormErrors);
    });

    if (
      Object.keys(formState.errors).reduce((acc, el) => {
        if (formState.errors[el as keyof LoginFormState['errors']] !== '')
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
        setLoginFormMessage('Login Successful :D');
      else setLoginFormMessage('Login Unsuccessful :(');
    }
  };
  return (
    <LoginFormContext.Provider
      value={{
        formState,
        formStateDispatch,
        validate,
      }}
    >
      <form onSubmit={handleSubmit}>
        <Input name="email" type="text" placeholder="email" required />

        <Input
          name="password"
          type="password"
          placeholder="password"
          required
        />

        <button type="submit">Submit</button>
      </form>
      <p>{LoginFormMessage}</p>
    </LoginFormContext.Provider>
  );
};

export default LoginForm;

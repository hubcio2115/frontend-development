import { type FormEvent, Reducer, useReducer, useState } from 'react';
import {
  type RegisterFormAction,
  type RegisterFormMessage,
  registerFormSchema,
  RegisterFormErrors,
  RegisterFormState,
} from '../types/registerForm';
import { RegisterFormContext } from '../context/RegisterFormContext';
import accounts from '../data/accounts.json';
import Input from '../components/RegisterInput';

const formInitialState: RegisterFormState = {
  values: {
    name: '',
    surname: '',
    email: '',
    password: '',
    birthday: new Date(),
    profilePhoto: '',
    acceptTermsCheckbox: false,
  },
  errors: {
    nameError: '',
    surnameError: '',
    emailError: '',
    passwordError: '',
    birthdayError: '',
    profilePhotoError: '',
    acceptTermsCheckboxError: '',
  },
};

const RegisterForm = () => {
  const [formMessage, setFormMessage] = useState<RegisterFormMessage>('');
  const formReducer: Reducer<RegisterFormState, RegisterFormAction> = (
    formState: RegisterFormState,
    action,
  ): RegisterFormState => {
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
      default:
        return formState;
    }
  };

  const [formState, formStateDispatch] = useReducer(
    formReducer,
    formInitialState,
  );

  const validate = (what: RegisterFormErrors) => {
    const parseOutput = registerFormSchema.shape.values.shape[what].safeParse(
      formState.values[what],
    );

    if (!parseOutput.success)
      formStateDispatch({
        type: `${what}Error`,
        payload: parseOutput.error.issues[0].message,
      });
    else
      formStateDispatch({
        type: `${what}Error`,
        payload: '',
      });
  };

  const resetForm = () => {};

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Object.keys(formState.values).forEach((key) => {
      validate(key as RegisterFormErrors);
    });

    if (
      Object.keys(formState.errors).reduce((acc, el) => {
        if (formState.errors[el as keyof RegisterFormState['errors']] !== '')
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
        setFormMessage('Register Successful :D');
      else setFormMessage('Register Unsuccessful :(');
    }
  };
  return (
    <RegisterFormContext.Provider
      value={{
        formState,
        formStateDispatch,
        validate,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Input
          name="name"
          type="text"
          placeholder="name"
          required
          style={{ width: '100%' }}
        />

        <Input
          name="surname"
          type="text"
          placeholder="surname"
          required
          style={{ width: '100%' }}
        />

        <Input
          name="email"
          type="email"
          placeholder="email"
          required
          style={{ width: '100%' }}
        />

        <Input
          name="password"
          type="password"
          placeholder="password"
          required
          style={{ width: '100%' }}
        />

        <Input name="birthday" type="date" required style={{ width: '100%' }} />

        <input name="profilePhoto" type="file" style={{ width: '100%' }} />

        <button type="submit">Submit</button>
        <button type="button">Reset</button>
      </form>
      <p>{formMessage}</p>
    </RegisterFormContext.Provider>
  );
};

export default RegisterForm;

import {
  type FormEvent,
  Reducer,
  useReducer,
  useState,
  useEffect,
} from 'react';
import {
  type RegisterFormAction,
  type RegisterFormMessage,
  registerFormSchema,
  RegisterFormErrors,
  RegisterFormState,
} from '../types/registerForm';
import { RegisterFormContext } from '../context/RegisterFormContext';
import Input from '../components/RegisterInput';

const formInitialState: RegisterFormState = {
  values: {
    name: '',
    surname: '',
    email: '',
    password: '',
    birthday: new Date(),
    acceptTermsCheckbox: false,
  },
  errors: {
    nameError: '',
    surnameError: '',
    emailError: '',
    passwordError: '',
    birthdayError: '',
    acceptTermsCheckboxError: '',
  },
};

const RegisterForm = () => {
  const [formMessage, setFormMessage] = useState<RegisterFormMessage>('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const formReducer: Reducer<RegisterFormState, RegisterFormAction> = (
    formState: RegisterFormState,
    action,
  ): RegisterFormState => {
    switch (action.type) {
      case 'name':
      case 'surname':
      case 'email':
      case 'password':
      case 'birthday':
      case 'acceptTermsCheckbox':
        return {
          ...formState,
          values: { ...formState.values, [action.type]: action.payload },
        };
      case 'nameError':
      case 'surnameError':
      case 'emailError':
      case 'passwordError':
      case 'birthdayError':
      case 'acceptTermsCheckboxError':
        return {
          ...formState,
          errors: {
            ...formState.errors,
            [action.type]: action.payload,
          },
        };
      case 'reset':
        return formInitialState;
      default:
        return formState;
    }
  };

  const [formState, formStateDispatch] = useReducer(
    formReducer,
    formInitialState,
  );

  const checkFormValidity = () =>
    Object.keys(formState.errors).reduce((acc, el) => {
      if (formState.errors[el as keyof RegisterFormState['errors']] !== '')
        return false;
      return acc;
    }, true) &&
    Object.keys(formState.values).reduce((acc, el) => {
      if (formState.values[el as keyof RegisterFormState['values']] === '') {
        return false;
      }
      return acc;
    }, true);

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

    if (checkFormValidity()) setIsSubmitDisabled(false);
    else setIsSubmitDisabled(true);
  };

  const resetForm = () => {
    formStateDispatch({ type: 'reset', payload: '' });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Object.keys(formState.values).forEach((key) => {
      validate(key as RegisterFormErrors);
    });

    if (checkFormValidity())
      if (!!localStorage.getItem(formState.values.email)) {
        setFormMessage('There is another account with the same email');
      } else {
        const { acceptTermsCheckbox, ...rest } = formState.values;
        localStorage.setItem(formState.values.email, JSON.stringify(rest));

        setFormMessage('Register Successful :D');
      }
    else setFormMessage('Register Unsuccessful :(');
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

        <Input
          name="birthday"
          type="date"
          required
          style={{ width: '100%' }}
          max={new Date().toISOString().slice(0, 10)}
        />

        <label htmlFor="termsAndCondition">Accept terms & conditions</label>
        <input
          name="termsAndCondition"
          type="checkbox"
          value={formState.values.acceptTermsCheckbox.toString()}
          onChange={(e) => {
            formStateDispatch({
              type: 'acceptTermsCheckbox',
              payload: e.target.checked,
            });
          }}
        />

        <button
          disabled={isSubmitDisabled || !formState.values.acceptTermsCheckbox}
          type="submit"
        >
          Submit
        </button>
        <button onClick={resetForm} type="button">
          Reset
        </button>
      </form>
      <p>{formMessage}</p>
    </RegisterFormContext.Provider>
  );
};

export default RegisterForm;

import {
  type FormEvent,
  Reducer,
  useReducer,
  useState,
  useEffect,
} from 'react';
import {
  type LoginFormAction,
  type LoginFormMessage,
  loginFormSchema,
  LoginFormErrors,
  LoginFormState,
} from '../types/loginForm';
import { LoginFormContext } from '../context/LoginFormContext';
import Input from '../components/LoginInput';
import { Account } from '../types/registerForm';

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
  const [account, setAccount] = useState<Account | null>(null);

  // useEffect(() => {
  //   if (!!account?.profilePhoto) {
  //     const profilePhotoParts = account.profilePhoto.split(',');
  //     const fileFormat = profilePhotoParts[0].split(';')[1];
  //     const fileContent = profilePhotoParts[1];
  //     const file = new File([fileContent], 'profilePhoto', {
  //       type: fileFormat,
  //     });
  //   } else setProfilePicture('');
  // }, [account]);

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
      const accountFromStorage = localStorage.getItem(formState.values.email);

      if (accountFromStorage === null) {
        setLoginFormMessage('There is no such account');
      } else {
        const account: Account = JSON.parse(accountFromStorage);

        if (account.password === formState.values.password) {
          setAccount(account);
        } else setLoginFormMessage('Wrong password');
      }
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

      {!!account ? (
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <td>{account.name}</td>
            </tr>
            <tr>
              <th>surname</th>
              <td>{account.surname}</td>
            </tr>
            <tr>
              <th>email</th>
              <td>{account.email}</td>
            </tr>
            <tr>
              <th>birthday</th>
              <td>{account.birthday.slice(0, 10)}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </LoginFormContext.Provider>
  );
};

export default LoginForm;

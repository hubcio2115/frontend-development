import { createContext, type Dispatch } from 'react';
import type {
  LoginFormAction,
  LoginFormErrors,
  LoginFormState,
} from '../types/loginForm';

export const LoginFormContext = createContext<{
  formState: LoginFormState;
  formStateDispatch: Dispatch<LoginFormAction>;
  validate: (what: LoginFormErrors) => void;
} | null>(null);

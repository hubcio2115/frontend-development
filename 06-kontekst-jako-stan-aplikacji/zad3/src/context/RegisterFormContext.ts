import { createContext, type Dispatch } from 'react';
import type {
  RegisterFormAction,
  RegisterFormErrors,
  RegisterFormState,
} from '../types/registerForm';

export const RegisterFormContext = createContext<{
  formState: RegisterFormState;
  formStateDispatch: Dispatch<RegisterFormAction>;
  validate: (what: RegisterFormErrors) => void;
} | null>(null);

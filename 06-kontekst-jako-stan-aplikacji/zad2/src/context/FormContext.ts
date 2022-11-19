import { createContext, type Dispatch } from 'react';
import type { FormAction, FormErrors, FormState } from '../types/form';

export const FormContext = createContext<{
  formState: FormState;
  formStateDispatch: Dispatch<FormAction>;
  validate: (what: FormErrors) => void;
} | null>(null);

import { z } from 'zod';

export const loginFormSchema = z.object({
  values: z.object({
    email: z
      .string()
      .min(1, 'This field is required')
      .email('Email is of wrong format'),
    password: z.string().min(1, 'This field is required'),
  }),
  errors: z.object({
    emailError: z.string(),
    passwordError: z.string(),
  }),
});
export type LoginFormState = z.infer<typeof loginFormSchema>;
export type LoginFormValues = z.infer<typeof loginFormSchema.shape.values>;
export type LoginFormErrors = keyof LoginFormValues;

const LoginFormActionTypesEnum = z.enum([
  ...loginFormSchema.shape.values.keyof().options,
  ...loginFormSchema.shape.errors.keyof().options,
]);
export type LoginFormActionTypes = z.infer<typeof LoginFormActionTypesEnum>;

export interface LoginFormAction {
  type: LoginFormActionTypes;
  payload: string;
}

export type LoginFormMessage =
  | ''
  | 'Login Successful :D'
  | 'Login Unsuccessful :('
  | 'There is no such account'
  | 'Wrong password';

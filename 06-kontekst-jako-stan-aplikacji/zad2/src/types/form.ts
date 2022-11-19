import { z } from 'zod';

export const formSchema = z.object({
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
export type FormState = z.infer<typeof formSchema>;
export type FormValues = z.infer<typeof formSchema.shape.values>;
export type FormErrors = keyof FormValues;

const FormActionTypesEnum = z.enum([
  ...formSchema.shape.values.keyof().options,
  ...formSchema.shape.errors.keyof().options,
]);
export type FormActionTypes = z.infer<typeof FormActionTypesEnum>;

export interface FormAction {
  type: FormActionTypes;
  payload: string;
}

export type FormMessage = '' | 'Login Successful :D' | 'Login Unsuccessful :(';

import { z } from 'zod';

export const registerFormSchema = z.object({
  values: z.object({
    name: z.string().min(1, 'This field is required'),
    surname: z.string().min(1, 'This field is required'),
    email: z
      .string()
      .min(1, 'This field is required')
      .email('Email is of wrong format'),
    password: z
      .string()
      .min(6, 'Password must have at least 6 characters')
      .max(20, 'Password have to be shorter than 21 characters')
      .refine(
        (val) => /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/.test(val),
        'Provided password is too weak',
      ),
    birthday: z
      .date({ required_error: 'Provided date is of wrong form' })
      .max(new Date(), 'Date has to be earlier than today'),
    profilePhoto: z.string().optional(),
    acceptTermsCheckbox: z.boolean(),
  }),
  errors: z.object({
    nameError: z.string(),
    surnameError: z.string(),
    emailError: z.string(),
    passwordError: z.string(),
    birthdayError: z.string(),
    profilePhotoError: z.string(),
    acceptTermsCheckboxError: z.string(),
  }),
});
export type RegisterFormState = z.infer<typeof registerFormSchema>;
export type RegisterFormValues = z.infer<
  typeof registerFormSchema.shape.values
>;
export type RegisterFormErrors = keyof RegisterFormValues;

const RegisterFormActionTypesEnum = z.enum([
  ...registerFormSchema.shape.values.keyof().options,
  ...registerFormSchema.shape.errors.keyof().options,
]);
export type RegisterFormActionTypes = z.infer<
  typeof RegisterFormActionTypesEnum
>;

export interface RegisterFormAction {
  type: RegisterFormActionTypes;
  payload: string;
}

export type RegisterFormMessage =
  | ''
  | 'Register Successful :D'
  | 'Register Unsuccessful :(';

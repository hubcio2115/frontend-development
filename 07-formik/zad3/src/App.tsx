import { Field, Formik } from 'formik';
import { useEffect, useState } from 'react';
import * as yup from 'yup';

interface formValues {
  name: string;
  password: string;
  email: string;
  radio: string;
  citizenship: string;
  acceptTerms: boolean;
}

const accountSchema = yup.object<Record<keyof formValues, yup.AnySchema>>({
  name: yup.string().required('Login is required'),
  password: yup.string().required('Password is required'),
  email: yup
    .string()
    .required('Email is required')
    .email('Provided email has wrong format'),
  radio: yup.string().oneOf(['one', 'two', 'three']),
  citizenship: yup.string().required('Citizenship is required'),
  acceptTerms: yup.boolean().required(),
});

const initialFormValues = {
  name: '',
  email: '',
  password: '',
  radio: '',
  citizenship: '',
  acceptTerms: false,
};

const App = () => {
  const [account, setAccount] = useState<Omit<
    formValues,
    'acceptTerms'
  > | null>(null);

  return (
    <div>
      <Formik
        initialValues={initialFormValues}
        validationSchema={accountSchema}
        onSubmit={(values) => {
          const { acceptTerms, ...newAccount } = values;
          localStorage.setItem(values.email, JSON.stringify(newAccount));

          setAccount(newAccount);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div>
              <Field type="text" name="name" placeholder="login" />
              {!!props.errors.name ? <p>{props.errors.name}</p> : null}
            </div>
            <div>
              <Field type="password" name="password" placeholder="password" />
              {!!props.errors.password ? <p>{props.errors.password}</p> : null}
            </div>
            <div>
              <Field type="email" name="email" placeholder="email" />
              {!!props.errors.email ? <p>{props.errors.email}</p> : null}
            </div>
            <div>
              <label>
                <Field type="radio" name="radio" value="one" />
                one
              </label>
              <label>
                <Field type="radio" name="radio" value="two" />
                two
              </label>
              <label>
                <Field type="radio" name="radio" value="three" />
                three
              </label>
            </div>
            <div>
              <Field type="text" name="citizenship" placeholder="citizenship" />
              {!!props.errors.citizenship ? (
                <p>{props.errors.citizenship}</p>
              ) : null}
            </div>
            <label>
              Accept terms & conditions
              <Field type="checkbox" name="acceptTerms" />
              {!!props.errors.acceptTerms ? (
                <p>{props.errors.acceptTerms}</p>
              ) : null}
            </label>
            <button type="submit">Register</button>
            <button type="button" onClick={props.handleReset}></button>
            Reset
          </form>
        )}
      </Formik>

      {!!account ? (
        <table>
          <tbody>
            <tr>
              <th>name</th>
              <td>{account.name}</td>
            </tr>
            <tr>
              <th>email</th>
              <td>{account.email}</td>
            </tr>
            <tr>
              <th>radio</th>
              <td>{account.radio}</td>
            </tr>
            <tr>
              <th>citizenship</th>
              <td>{account.citizenship}</td>
            </tr>
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

export default App;

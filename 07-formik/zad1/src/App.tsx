import { Formik } from 'formik';

const accounts = [{ login: 'user', password: 'hasło' }];

const App = () => {
  return (
    <Formik
      initialValues={{ login: '', password: '' }}
      onSubmit={(values, action) => {
        const account = accounts.find(
          (el) => el.login === values.login && el.password === values.password,
        );
        if (!!account) alert('Operation went through successful');
        else alert('Operation was not successful');
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit}>
          <input
            type="text"
            name="login"
            placeholder="login"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.login}
          />{' '}
          {!!props.errors.login ? (
            <div id="feedback">{props.errors.login}</div>
          ) : null}
          <input
            type="text"
            name="password"
            placeholder="password"
            onChange={props.handleChange}
            onBlur={props.handleBlur}
            value={props.values.password}
          />{' '}
          {!!props.errors.password ? (
            <div id="feedback">{props.errors.password}</div>
          ) : null}
          <button type="submit">Log in</button>
        </form>
      )}
    </Formik>
  );
};

export default App;

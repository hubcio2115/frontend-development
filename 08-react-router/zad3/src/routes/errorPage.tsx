import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (isRouteErrorResponse(error)) return <div>{error.data}</div>;
  else return <h1>Something went wrong</h1>;
};

export default ErrorPage;

import { useLocation } from 'react-router-dom';

export default function ErrorPage() {
  const location = useLocation();
  return <h1>Nie znaleziono elementu: {location.pathname}</h1>;
}

import LoginForm from './routes/LoginForm';
import { Link, Route, Router } from 'wouter';
import RegisterForm from './routes/RegisterForm';

const App = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        listStyleType: 'none',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',
      }}
    >
      <ul
        style={{
          display: 'flex',
          listStyleType: 'none',
          gap: '20px',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0',
        }}
      >
        <li>
          <Link href="/">login</Link>
        </li>
        <li>
          <Link href="/register">register</Link>
        </li>
      </ul>

      <Router>
        <Route path="/" component={LoginForm} />
        <Route path="/register" component={RegisterForm} />
      </Router>
    </div>
  );
};

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Add from './routes/add';
import Sub from './routes/sub';
import Mul from './routes/mul';
import Div from './routes/div';

const router = createBrowserRouter([
  {
    path: 'add',
    element: <Add />,
  },
  {
    path: 'sub',
    element: <Sub />,
  },
  {
    path: 'mul',
    element: <Mul />,
  },
  {
    path: 'div',
    element: <Div />,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

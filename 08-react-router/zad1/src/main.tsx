import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import ErrorPage from './routes/ErrorPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <h1>hello</h1>,
    errorElement: <ErrorPage />,
  },
  {
    path: 'about',
    element: <h1>about</h1>,
  },
  {
    path: 'services',
    element: <h1>services</h1>,
  },
  {
    path: 'contact',
    children: [
      {
        index: true,
        element: <h1>contact</h1>,
      },
      {
        path: 'us',
        element: <h1>contact/us</h1>,
      },
      {
        path: 'pl',
        element: <h1>contact/pl</h1>,
      },
      {
        path: 'de',
        element: <h1>contact/de</h1>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

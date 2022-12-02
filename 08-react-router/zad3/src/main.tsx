import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import Photo from './routes/photo';
import Desc from './routes/desc';

const router = createBrowserRouter([
  {
    path: '/',
    loader: async () => {
      const randomId = Math.floor(Math.random() * 9);

      return redirect(`${randomId}`);
    },
  },
  {
    path: ':id',
    children: [
      {
        index: true,
        element: <Photo />,
      },
      {
        path: 'desc',
        element: <Desc />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

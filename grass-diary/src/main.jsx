import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/reset.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Suspense>
      <RouterProvider router={router} />
    </Suspense>
  </React.StrictMode>,
);

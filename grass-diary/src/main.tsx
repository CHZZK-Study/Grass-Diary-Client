import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import './styles/reset.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Suspense>
          <RouterProvider router={router} />
        </Suspense>
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>,
);

import { createBrowserRouter } from 'react-router-dom';
import IntroPage from './Intro/IntroPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <IntroPage />,
  },
]);

export default router;

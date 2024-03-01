import { createBrowserRouter } from 'react-router-dom';
import Intro from './pages/Intro/Intro';
import Main from './pages/Main/Main';
import CreateDiary from './pages/CreateDiary/CreateDiary';
import Diary from './pages/Diary/Diary';
import Share from './pages/Share/Share';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Intro />,
  },
  {
    path: '/main',
    element: <Main />,
  },
  {
    path: '/creatediary',
    element: <CreateDiary />,
  },
  {
    path: '/diary/view',
    element: <Diary />,
  },
  {
    path: '/share',
    element: <Share />,
  },
]);

export default router;

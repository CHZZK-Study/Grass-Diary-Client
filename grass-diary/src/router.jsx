import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from '@components';
import {
  Intro,
  Main,
  CreateDiary,
  Diary,
  Share,
  Setting,
  MyPage,
  NonExistentDiary,
} from '@pages';

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
    element: <ProtectedRoute />,
    children: [
      { path: '/creatediary', element: <CreateDiary /> },
      { path: '/editdiary/:id', element: <CreateDiary /> },
      { path: '/diary/:id', element: <Diary /> },
      { path: '/share', element: <Share /> },
      { path: '/setting', element: <Setting /> },
      { path: '/mypage', element: <MyPage /> },
      { path: '/non-existent-page', element: <NonExistentDiary /> },
    ],
  },
]);

export default router;

import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute, ErrorBoundaryLayout } from '@components/index';
import { lazy } from 'react';

const Intro = lazy(() => import('@pages/Intro/Intro'));
const Main = lazy(() => import('@pages/Main/Main'));
const CreateDiary = lazy(() => import('@pages/CreateDiary/CreateDiary'));
const Diary = lazy(() => import('@pages/Diary/Diary'));
const Share = lazy(() => import('@pages/Share/Share'));
const Setting = lazy(() => import('@pages/Setting/Setting'));
const MyPage = lazy(() => import('@pages/MyPage/MyPage'));

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryLayout />,
    children: [
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
          { path: '/diary/:diaryId', element: <Diary /> },
          { path: '/share', element: <Share /> },
          { path: '/setting', element: <Setting /> },
          { path: '/mypage', element: <MyPage /> },
        ],
      },
    ],
  },
]);

export default router;

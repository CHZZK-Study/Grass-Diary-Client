import { createBrowserRouter } from 'react-router-dom';
import Intro from './pages/Intro/Intro';
import Main from './pages/Main/Main';
import CreateDiary from './pages/CreateDiary/CreateDiary';
import Diary from './pages/Diary/Diary';
import Share from './pages/Share/Share';
import Setting from './pages/Setting/Setting';
import MyPage from './pages/MyPage/MyPage';
import NonExistentDiary from './pages/Diary/NonExistentDiary';
import ProtectedRoute from './components/ProtectedRoute';

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
      { path: '/diary/:id', element: <Diary /> },
      { path: '/share', element: <Share /> },
      { path: '/setting', element: <Setting /> },
      { path: '/mypage', element: <MyPage /> },
    ],
  },
  {
    path: '/non-existent-page',
    element: <NonExistentDiary />,
  },
]);

export default router;

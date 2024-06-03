import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { isAuthenticatedAtom, isLoadingAtom } from '@recoil/auth/authState';
import { checkAuth } from '@utils/authUtils';
import { PopularFeed, Header, Container } from '@components/index';

import TopSection from './TopSection';
import MiddleSection from './MiddleSection';
import BottomSection from './BottomSection';

const Main = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  useEffect(() => {
    const initLoad = async () => {
      setIsLoading(true);
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('accessToken');

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        const mainURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.pushState({ path: mainURL }, '', mainURL);

        setIsAuthenticated(true);
      }

      if (!accessToken) {
        const isAuthenticated = await checkAuth();
        setIsAuthenticated(isAuthenticated);

        if (!isAuthenticated) navigate('/');
      }

      setIsLoading(false);
    };

    initLoad();
  }, [navigate]);

  return (
    <Container>
      <Header />
      <TopSection />
      <MiddleSection />
      <BottomSection />
      <PopularFeed />
    </Container>
  );
};

export default Main;

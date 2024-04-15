import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { isAuthenticatedAtom, isLodingAtom } from './authState';
import { checkAuthSelector } from './authSelector';
import { useEffect } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useRecoilState(isLodingAtom);

  const checkAuthLoadable = useRecoilValueLoadable(checkAuthSelector);

  useEffect(() => {
    switch (checkAuthLoadable.state) {
      case 'hasValue':
        setIsAuthenticated(checkAuthLoadable.contents);
        setIsLoading(false);
        break;
      case 'loading':
        setIsLoading(true);
        break;
      case 'hasError':
        setIsLoading(false);
        console.error('인증 확인 중 오류가 발생했습니다.');
        break;
    }
  }, [checkAuthLoadable.state]);

  return { isAuthenticated, isLoading };
};

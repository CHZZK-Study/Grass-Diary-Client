import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { isAuthenticatedAtom, isLoadingAtom } from './authState';
import { checkAuthSelector } from './authSelector';
import { useEffect } from 'react';

interface IUseAuthReturn {
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuth = (): IUseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] =
    useRecoilState<boolean>(isAuthenticatedAtom);
  const [isLoading, setIsLoading] = useRecoilState<boolean>(isLoadingAtom);

  const checkAuthLoadable = useRecoilValueLoadable<boolean>(checkAuthSelector);

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

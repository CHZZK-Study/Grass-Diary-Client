import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useQuery } from '@tanstack/react-query';

import API from '@services/index';
import { memberIdAtom } from './userState';
import { useAuth } from '@recoil/auth/useAuth';

interface IUseUserReturn {
  memberId: number | null;
}

const useUser = (): IUseUserReturn => {
  const setMemberId = useSetRecoilState<number | null>(memberIdAtom);
  const { isAuthenticated }: { isAuthenticated: boolean } = useAuth();

  const { data: memberId, isSuccess } = useQuery<
    number,
    Error,
    number,
    string[]
  >({
    queryKey: ['memberId'],
    queryFn: () => API.get('/me').then(({ data }) => data.memberId),
    enabled: !!isAuthenticated,
    onError: error =>
      console.error(`사용자 정보 조회가 불가능합니다. ${error}`),
  });

  useEffect(() => {
    if (isSuccess && memberId !== undefined) setMemberId(memberId);
    if (!isAuthenticated) setMemberId(null);
  }, [isSuccess, memberId, isAuthenticated, setMemberId]);

  return { memberId };
};

export default useUser;

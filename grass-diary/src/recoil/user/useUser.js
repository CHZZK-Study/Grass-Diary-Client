import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import API from '@services';
import { memberIdAtom } from './userState';
import { useAuth } from '@recoil/auth/useAuth';

const useUser = () => {
  const [memberId, setMemberId] = useRecoilState(memberIdAtom);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      API.get('/me')
        .then(response => {
          const memberId = response.data.memberId;
          setMemberId(memberId);
        })
        .catch(error => {
          console.error(`사용자 정보 조회가 불가능합니다. ${error}`);
          throw Error;
        });
    }

    if (!isAuthenticated) setMemberId(null);
  }, [isAuthenticated, memberId]);

  return { memberId };
};

export default useUser;

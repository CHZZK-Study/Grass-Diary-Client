import { useState, useEffect } from 'react';
import { useAuth } from '@recoil/auth/useAuth';
import API from '@services';

const useUser = () => {
  const [memberId, setMemberId] = useState(null);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      API.get('/me')
        .then(response => {
          setMemberId(response.data.memberId);
        })
        .catch(error =>
          console.error(`사용자 정보 조회가 불가능합니다. ${error}`),
        );
    }
  }, [isAuthenticated]);

  return memberId;
};

export default useUser;

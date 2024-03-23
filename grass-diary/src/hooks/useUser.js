import { useState, useEffect } from 'react';
import API from '../services/index';

const useUser = () => {
  const [memberId, setMemberId] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        API.get('/me').then(response => {
          setMemberId(response.data.memberId);
        });
      } catch (error) {
        console.error(`사용자 정보 조회가 불가능합니다. ${error}`);
      }
    };

    fetchUserInfo();
  }, []);

  return memberId;
};

export default useUser;

import { useState, useEffect } from 'react';
import useUser from './useUser';
import API from '../services';

const useProfile = () => {
  const [profile, setProfile] = useState([]);
  const memberId = useUser();

  useEffect(() => {
    if (memberId) {
      API.get(`/member/profile/${memberId}`)
        .then(response => {
          setProfile(response.data);
        })
        .catch(error => {
          console.error(`사용자 프로필을 조회할 수 없습니다. ${error}`);
        });
    }
  }, [memberId]);

  return profile;
};

export default useProfile;

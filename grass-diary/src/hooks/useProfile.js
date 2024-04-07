import { useState, useEffect } from 'react';
import useUser from '@recoil/user/useUser';
import API from '@services';

const useProfile = () => {
  const { memberId } = useUser();
  const [profileImage, setProfileImage] = useState('');
  const [nickname, setNickname] = useState('');
  const [profileIntro, setProfileIntro] = useState('');

  useEffect(() => {
    if (memberId) {
      API.get(`/member/profile/${memberId}`)
        .then(response => {
          const profileImageURL = response.data.profileImageURL;
          const ninkName = response.data.nickName;
          const intro = response.data.profileIntro;

          setProfileImage(profileImageURL);
          setNickname(ninkName);
          setProfileIntro(intro);
        })
        .catch(error => {
          console.error(`사용자 프로필을 조회할 수 없습니다. ${error}`);
        });
    }
  }, [memberId]);

  return { profileImage, nickname, setNickname, profileIntro, setProfileIntro };
};

export default useProfile;

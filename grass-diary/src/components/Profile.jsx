import { useEffect, useState } from 'react';
import useUser from '../hooks/useUser';
import API from '../services';
import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  profileImage: (width, height) => ({
    objectFit: 'cover',
    borderRadius: '100%',

    width,
    height,
  }),
});

const Profile = ({ width, height }) => {
  const memberId = useUser();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (memberId) {
      API.get(`/member/profile/${memberId}`)
        .then(response => {
          setProfile(response.data.profileImageURL);
        })
        .catch(error => {
          console.error(`사용자 프로필을 불러올 수 없습니다. ${error}`);
        });
    }
  }, [memberId]);

  return (
    <img
      {...stylex.props(styles.profileImage(width, height))}
      src={profile}
      alt="사용자 프로필 사진"
    />
  );
};

export default Profile;

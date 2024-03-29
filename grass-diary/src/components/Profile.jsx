import stylex from '@stylexjs/stylex';
import useProfile from '../hooks/useProfile';

const styles = stylex.create({
  profileImage: (width, height) => ({
    objectFit: 'cover',
    borderRadius: '100%',

    width,
    height,
  }),
});

const Profile = ({ width, height }) => {
  const { profileImage } = useProfile();

  return (
    <img
      {...stylex.props(styles.profileImage(width, height))}
      src={profileImage}
      alt="사용자 프로필 사진"
    />
  );
};

export default Profile;

import defaultProfile from '../assets/icon/basicProfile.png';
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
  return (
    <img
      {...stylex.props(styles.profileImage(width, height))}
      src={defaultProfile}
      alt="사용자 프로필 사진"
    />
  );
};

export default Profile;

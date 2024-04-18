import stylex from '@stylexjs/stylex';
import useProfile from '@recoil/profile/useProfile';

const styles = stylex.create({
  profileImage: (width, height) => ({
    objectFit: 'cover',
    borderRadius: '100%',

    width,
    height,
  }),
});

const Profile = ({ width, height }) => {
  const { profileImageURL } = useProfile();

  return profileImageURL ? (
    <img
      {...stylex.props(styles.profileImage(width, height))}
      src={profileImageURL}
      alt="사용자 프로필 사진"
    />
  ) : null;
};

export default Profile;

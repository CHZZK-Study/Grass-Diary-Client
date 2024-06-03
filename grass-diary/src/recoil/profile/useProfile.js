import { useRecoilValue } from 'recoil';
import { profileSelector } from './profileSelector';

const useProfile = () => {
  const profile = useRecoilValue(profileSelector);
  const { profileImageURL, nickName, profileIntro } = profile || {};

  return { profileImageURL, nickName, profileIntro };
};

export default useProfile;

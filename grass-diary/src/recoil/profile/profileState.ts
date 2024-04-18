import { atom } from 'recoil';

export const profileAtom = atom<IProfile>({
  key: 'profile',
  default: {
    profileImageURL: '',
    nickName: '',
    profileIntro: '',
  },
});

import { atom } from 'recoil';

export const profileAtom = atom({
  key: 'profile',
  default: {
    profileImage: '',
    nickname: '',
    profileIntro: '',
  },
});

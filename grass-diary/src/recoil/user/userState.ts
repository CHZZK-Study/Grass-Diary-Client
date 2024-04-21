import { atom } from 'recoil';

export const memberIdAtom = atom<number | null>({
  key: 'memberId',
  default: null,
});

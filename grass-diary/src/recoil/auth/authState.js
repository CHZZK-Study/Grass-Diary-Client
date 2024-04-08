import { atom } from 'recoil';

const isAuthenticatedAtom = atom({
  key: 'isAuthenticated',
  default: false,
});

const isLodingAtom = atom({
  key: 'isLoding',
  default: true,
});

export { isAuthenticatedAtom, isLodingAtom };

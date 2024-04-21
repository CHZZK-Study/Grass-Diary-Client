import { atom } from 'recoil';

const isAuthenticatedAtom = atom<boolean>({
  key: 'isAuthenticated',
  default: false,
});

const isLoadingAtom = atom<boolean>({
  key: 'isLoding',
  default: true,
});

export { isAuthenticatedAtom, isLoadingAtom };

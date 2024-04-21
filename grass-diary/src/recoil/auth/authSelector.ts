import { selector } from 'recoil';
import { checkAuth } from '@utils/authUtils';
import { isAuthenticatedAtom, isLoadingAtom } from './authState';

export const checkAuthSelector = selector<boolean>({
  key: 'checkAuthSelector',
  get: async ({ get }) => {
    get(isAuthenticatedAtom);

    try {
      const isLoggedIn: boolean = await checkAuth();
      return isLoggedIn;
    } catch (error) {
      console.error(`로그인되지 않은 사용자입니다. ${error}`);
      return false;
    }
  },

  set: ({ set }, newValue) => {
    set(isAuthenticatedAtom, newValue);
    set(isLoadingAtom, false);
  },
});

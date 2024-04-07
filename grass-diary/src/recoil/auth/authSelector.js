import { selector } from 'recoil';
import { checkAuth } from '@utils/authUtils';
import { isAuthenticatedAtom, isLodingAtom } from './authState';

export const checkAuthSelector = selector({
  key: 'checkAuthSelector',
  get: async ({ get }) => {
    get(isAuthenticatedAtom);

    try {
      const isLoggedIn = await checkAuth();
      return isLoggedIn;
    } catch (error) {
      console.error(`로그인되지 않은 사용자입니다. ${error}`);
      throw Error;
    }
  },

  set: ({ set }, isAuthenticated) => {
    set(isAuthenticatedAtom, isAuthenticated);
    set(isLodingAtom, false);
  },
});

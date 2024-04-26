import { selector } from 'recoil';
import API from '@services/index';
import { memberIdAtom } from '@recoil/user/userState';

export const profileSelector = selector<IProfile | undefined>({
  key: 'profileSelector',
  get: async ({ get }) => {
    const memberId = get(memberIdAtom);

    if (!memberId) return;

    try {
      const response = await API.get(`/member/profile/${memberId}`);
      return response.data;
    } catch (error) {
      console.error(`사용자 프로필을 조회할 수 없습니다. ${error}`);
    }
  },
});

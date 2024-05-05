import API from '@services/index';
import { useInfiniteQuery } from '@tanstack/react-query';

const fetchLatestDiary = (cursorId: number) => {
  return API.get(`/shared/diaries/latest?cursorId=${cursorId}&size=12`);
};

export const useLatestDiaries = () => {
  const queryFn = async ({ pageParam = 999 }) => {
    const res = await fetchLatestDiary(pageParam);
    return res.data.diaries;
  };

  const getNextPageParam = (lastPage: ILatestResponse[]) => {
    if (lastPage.length === 0) return undefined;
    return lastPage[lastPage.length - 1].diaryId;
  };

  return useInfiniteQuery({
    queryKey: ['lastest-diaries'],
    queryFn,
    getNextPageParam,
    initialPageParam: 922337203685477600,
  });
};

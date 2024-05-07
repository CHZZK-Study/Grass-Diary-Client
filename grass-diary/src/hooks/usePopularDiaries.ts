import API from '@services/index';
import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';

const fetchPopularDiary = () => {
  return API.get('/shared/diaries/popular');
};

export const usePopularDiaries = () => {
  return useQuery<
    IPopularDiaryResponse[],
    AxiosError,
    IPopularDiaryResponse[],
    [string]
  >({
    queryKey: ['top10'],
    queryFn: async () => {
      const res = await fetchPopularDiary();
      return res.data;
    },
  });
};

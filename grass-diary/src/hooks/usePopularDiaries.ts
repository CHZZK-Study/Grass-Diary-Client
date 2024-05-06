import API from '@services/index';
import { useQuery } from '@tanstack/react-query';

const fetchPopularDiary = () => {
  return API.get('/shared/diaries/popular');
};

export const usePopularDiaries = () => {
  return useQuery({
    queryKey: ['top10'],
    queryFn: async (): Promise<IPopularResponse[]> => {
      const res = await fetchPopularDiary();
      return res.data;
    },
  });
};

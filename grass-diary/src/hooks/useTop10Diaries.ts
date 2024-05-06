import API from '@services/index';
import { useQuery } from '@tanstack/react-query';

const fetchTop10Diary = () => {
  return API.get('/shared/diaries/popular');
};

export const useTop10Diaries = () => {
  return useQuery({
    queryKey: ['top10'],
    queryFn: async (): Promise<IPopularResponse[]> => {
      const res = await fetchTop10Diary();
      return res.data;
    },
  });
};

import { useQuery } from '@tanstack/react-query';
import API from '@services/index';

const fetchDiaryDetails = id => {
  return API.get(`/diary/${id}`);
};

export const useDiaryDetail = diaryId => {
  return useQuery({
    queryKey: ['get-diaryDetail', diaryId],
    queryFn: () => {
      return fetchDiaryDetails(diaryId);
    },
  });
};

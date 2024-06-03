import { useQuery } from '@tanstack/react-query';
import { useWriterProfile } from './useWriterProfile';
import API from '@services/index';
import { AxiosError } from 'axios';

const fetchDiaryDetails = (id: string) => {
  return API.get(`/diary/${id}`);
};

export const useDiaryDetail = (diaryId: string) => {
  const {
    data: detail,
    isLoading,
    isError,
    error,
  } = useQuery<IDiaryDetail, AxiosError, IDiaryDetail, [string, string]>({
    queryKey: ['get-diaryDetail', diaryId],
    queryFn: async () => {
      const res = await fetchDiaryDetails(diaryId);
      return res.data;
    },
    retry: 1,
  });

  const writerId = detail?.memberId;
  const { data: writer } = useWriterProfile(writerId!);

  return { detail, writer, isLoading, isError, error };
};

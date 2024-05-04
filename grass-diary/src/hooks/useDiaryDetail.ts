import { useQuery } from '@tanstack/react-query';
import { useWriterProfile } from './useWriterProfile';
import API from '@services/index';

const fetchDiaryDetails = (id: string | undefined) => {
  return API.get(`/diary/${id}`);
};

export const useDiaryDetail = (diaryId: string | undefined) => {
  const queryFn = async (): Promise<IDiaryDetail> => {
    const res = await fetchDiaryDetails(diaryId);
    return res.data;
  };

  const { data: detail } = useQuery<IDiaryDetail>({
    queryKey: ['get-diaryDetail', diaryId],
    queryFn,
  });

  const writerId = detail?.memberId;
  const { data: writer } = useWriterProfile(writerId);
  return { detail, writer };
};

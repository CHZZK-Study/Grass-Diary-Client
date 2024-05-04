import { useQuery } from '@tanstack/react-query';
import { useWriterProfile } from './useWriterProfile';
import API from '@services/index';

type Props = {
  id: string | undefined;
};

const fetchDiaryDetails = (id: Props) => {
  return API.get(`/diary/${id}`);
};

export const useDiaryDetail = (diaryId: Props) => {
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

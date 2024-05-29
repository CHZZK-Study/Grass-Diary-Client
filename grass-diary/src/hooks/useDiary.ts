import { useQuery } from '@tanstack/react-query';
import API from '@services/index';

interface IUseDiaryProps {
  memberId: number | null;
  currentPage: number;
  sortOrder: string;
}

const useDiary = ({ memberId, currentPage, sortOrder }: IUseDiaryProps) => {
  const queryKey = ['diaryList', { memberId, currentPage, sortOrder }];

  const queryFn = async (): Promise<IDiaryResponse> => {
    let apiUrl = `/diary/main/${memberId}?page=${currentPage}`;

    if (sortOrder === 'oldest') apiUrl += `&sort=createdAt,ASC`;
    const response = await API.get(apiUrl);

    return response.data;
  };

  const { data: diary } = useQuery<
    IDiaryResponse,
    Error,
    IDiaryResponse,
    (string | IUseDiaryProps)[]
  >({
    queryKey,
    queryFn,
    enabled: !!memberId,
  });

  const diaryList: IDiary[] = diary?.content || [];
  const pageSize: number = diary?.totalPages || 0;

  return { diaryList, pageSize };
};

export default useDiary;

import { useQuery } from '@tanstack/react-query';
import API from '@services';

const useDiary = ({ memberId, currentPage, sortOrder }) => {
  const queryKey = ['diaryList', { memberId, currentPage, sortOrder }];

  const queryFn = async () => {
    let apiUrl = `/diary/main/${memberId}?page=${currentPage}`;

    if (sortOrder === 'oldest') apiUrl += `&sort=createdAt,ASC`;
    const response = await API.get(apiUrl);

    return response.data;
  };

  const { data: diary } = useQuery({
    queryKey,
    queryFn,
    enabled: !!memberId,
    onError: error =>
      console.error(`사용자의 일기를 조회할 수 없습니다. ${error}`),
  });

  const diaryList = diary?.content || [];
  const pageSize = diary?.totalPages || 0;

  return { diaryList, pageSize };
};

export default useDiary;

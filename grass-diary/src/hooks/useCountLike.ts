import API from '@services/index';
import { useMutation } from '@tanstack/react-query';

type Props = {
  diaryId: string;
  memberId: number;
};

const postLikeApi = ({ diaryId, memberId }: Props) => {
  return API.post(`/diary/like/${diaryId}/${memberId}`);
};

const deleteLikeApi = ({ diaryId, memberId }: Props) => {
  return API.delete(`/diary/like/${diaryId}/${memberId}`);
};

export const useCountLike = ({ diaryId, memberId }: Props) => {
  const { mutate: postLike, isSuccess: postSuccess } = useMutation({
    mutationFn: () => {
      return postLikeApi({ diaryId, memberId });
    },
    onError: error => {
      console.error(`사용자 좋아요 정보를 불러올 수 없습니다. ${error}`);
    },
  });

  const { mutate: deleteLike, isSuccess: deleteSuccess } = useMutation({
    mutationFn: () => {
      return deleteLikeApi({ diaryId, memberId });
    },
    onError: error => {
      console.error(`사용자의 좋아요 정보를 삭제할 수 없습니다. ${error}`);
    },
  });

  return { postLike, deleteLike, postSuccess, deleteSuccess };
};

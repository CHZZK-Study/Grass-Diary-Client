import API from '@services/index';
import { useMutation } from '@tanstack/react-query';

const deleteAxios = id => {
  return API.delete(`/diary/${id}`);
};

export const useDeleteDiary = id => {
  const onSuccess = () => {
    localStorage.removeItem('lastWritingDate');
  };

  const onError = error => {
    console.error(`사용자의 일기를 삭제할 수 없습니다. ${error}`);
  };

  const mutationFn = () => {
    return deleteAxios(id);
  };

  return useMutation({
    mutationFn,
    onSuccess,
    onError,
  });
};

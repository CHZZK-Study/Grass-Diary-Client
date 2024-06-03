import API from '@services/index';
import { useMutation } from '@tanstack/react-query';

const deleteAxios = (id: string) => {
  return API.delete(`/diary/${id}`);
};

export const useDeleteDiary = (id: string) => {
  return useMutation({
    mutationFn: () => {
      return deleteAxios(id);
    },
    onSuccess: () => {
      localStorage.removeItem('lastWritingDate');
    },
    onError: error => {
      console.error(`사용자의 일기를 삭제할 수 없습니다. ${error}`);
    },
  });
};

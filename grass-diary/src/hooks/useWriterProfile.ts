import { useQuery } from '@tanstack/react-query';
import API from '@services/index';

const fetchUserProfiles = id => {
  return API.get(`/member/profile/${id}`);
};

export const useWriterProfile = writerId => {
  return useQuery({
    queryKey: ['writer-data', writerId],
    queryFn: () => {
      return fetchUserProfiles(writerId);
    },
    enabled: !!writerId,
  });
};

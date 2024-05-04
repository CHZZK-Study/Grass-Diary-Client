import { useQuery } from '@tanstack/react-query';
import API from '@services/index';

const fetchUserProfiles = (id: number | undefined) => {
  return API.get(`/member/profile/${id}`);
};

export const useWriterProfile = (writerId: number | undefined) => {
  return useQuery<IProfile>({
    queryKey: ['writer-data', writerId],
    queryFn: async (): Promise<IProfile> => {
      const res = await fetchUserProfiles(writerId);
      return res.data;
    },
    enabled: !!writerId,
  });
};

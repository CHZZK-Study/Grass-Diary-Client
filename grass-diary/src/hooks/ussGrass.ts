import { useQuery } from '@tanstack/react-query';
import { formatDate } from '@utils/dateUtils';
import API from '@services/index';

const useGrass = memberId => {
  const { data: grass } = useQuery({
    queryKey: ['grassList', memberId],
    queryFn: () =>
      API.get(`/grass/${memberId}`).then(({ data }) => {
        const updatedGrassColor = {};
        const { grassList, colorRGB: grassColor } = data;

        grassList.forEach(grass => {
          const { createdAt, transparency } = grass;
          const createdDate = formatDate(new Date(createdAt));

          updatedGrassColor[createdDate] = `${grassColor},${transparency}`;
        });

        return updatedGrassColor;
      }),
    enabled: !!memberId,
    onError: error =>
      console.error(`사용자 잔디 현황을 불러올 수 없습니다. ${error}`),
  });

  return grass;
};

export default useGrass;

import { useEffect, useState } from 'react';
import { formatDate } from '@utils/dateUtils';
import useUser from '@recoil/user/useUser';
import API from '@services';

const useGrass = () => {
  const { memberId } = useUser();
  const [grassColors, setGrassColors] = useState({});

  useEffect(() => {
    if (memberId) {
      API.get(`/grass/${memberId}`)
        .then(response => {
          const { grassList } = response.data;
          const grassColor = response.data.colorRGB;
          const updatedGrassColors = {};

          grassList.forEach(grass => {
            const { createdAt, transparency } = grass;
            const createdDate = formatDate(new Date(createdAt));
            updatedGrassColors[createdDate] = `${grassColor},${transparency}`;
          });

          setGrassColors(updatedGrassColors);
        })
        .catch(error =>
          console.error(`사용자 잔디 현황을 불러올 수 없습니다. ${error}`),
        );
    }
  }, [memberId]);

  return grassColors;
};

export default useGrass;

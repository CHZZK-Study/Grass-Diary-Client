import stylex from '@stylexjs/stylex';
import styles from './style';
import { useEffect, useState } from 'react';

import { formatDate, getDaysArray } from '@utils/dateUtils';
import useGrass from '@hooks/ussGrass';
import useUser from '@recoil/user/useUser';
import API from '@services';

const createGrass = () => {
  const year = new Date().getFullYear();
  const days = getDaysArray(year);
  const columns = Math.ceil(days.length / 7);

  // 1년을 7으로 나눈 수만큼 잔디 배열 생성 (default: null)
  const grass = Array.from({ length: columns }, () => Array(7).fill(null));

  // 잔디 배열에 해당하는 날짜 저장
  days.forEach((day, index) => {
    const column = Math.floor(index / 7);
    const row = index % 7;

    grass[column][row] = day;
  });

  return { year, grass };
};

const Grass = ({ setSelectedDiary }) => {
  const [selectedGrass, setSelectedGrass] = useState(null);
  const { year, grass } = createGrass();
  const { memberId } = useUser();
  const grassColors = useGrass(memberId);

  const handleGrassClick = date => {
    setSelectedGrass(formatDate(date));
  };

  useEffect(() => {
    if (selectedGrass) {
      const selectedDate = `${year}-${selectedGrass.split('/').join('-')}`;

      API.get(`/search/date/${memberId}?date=${selectedDate}`)
        .then(response => {
          setSelectedDiary(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [selectedGrass, memberId, setSelectedDiary, year]);

  return (
    <div {...stylex.props(styles.grassContainer)}>
      {grass.map((column, index) => (
        <div key={index} {...stylex.props(styles.grass)}>
          {column.map((day, index) => {
            if (day === null) return null;
            const writeDay = formatDate(day);
            return (
              <div key={index} {...stylex.props(styles.dayContainer)}>
                {grassColors && (
                  <div
                    onClick={() => handleGrassClick(day)}
                    {...stylex.props(
                      styles.grassDate(
                        writeDay === selectedGrass ? '1px solid black' : 'none',
                        grassColors[writeDay]
                          ? `rgba(${grassColors[writeDay]})`
                          : '#E0E0E0',
                      ),
                    )}
                  ></div>
                )}
                {formatDate(day) === selectedGrass && (
                  <div {...stylex.props(styles.dateBubble)}>
                    <span>{selectedGrass}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grass;

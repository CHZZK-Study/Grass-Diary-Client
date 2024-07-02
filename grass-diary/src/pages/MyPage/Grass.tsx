import stylex from '@stylexjs/stylex';
import styles from './style';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { formatDate, getDaysArray } from '@utils/dateUtils';
import useGrass from '@hooks/ussGrass';
import useUser from '@recoil/user/useUser';
import API from '@services/index';

type TCreateGrass = () => { year: number; grass: (Date | null)[][] };

const createGrass: TCreateGrass = () => {
  const year: number = new Date().getFullYear();
  const days: Date[] = getDaysArray(year);
  const columns: number = Math.ceil(days.length / 7);

  // 1년을 7으로 나눈 수만큼 잔디 배열 생성 (default: null)
  const grass: (Date | null)[][] = Array.from({ length: columns }, () =>
    Array(7).fill(null),
  );

  // 잔디 배열에 해당하는 날짜 저장
  days.forEach((day, index) => {
    const column: number = Math.floor(index / 7);
    const row: number = index % 7;

    grass[column][row] = day;
  });

  return { year, grass };
};

interface IGrass {
  setSelectedDiary: React.Dispatch<React.SetStateAction<IDiary | undefined>>;
}

const Grass = ({ setSelectedDiary }: IGrass) => {
  const [selectedGrass, setSelectedGrass] = useState<string | null>(null);
  const [hoveredGrass, setHoveredGrass] = useState<string | null>(null);
  const { year, grass } = createGrass();
  const { memberId } = useUser();
  const grassColors = useGrass(memberId);

  const handleGrassClick = (date: Date | null) => {
    formatDate(date) === selectedGrass
      ? setSelectedGrass(null)
      : setSelectedGrass(formatDate(date));
  };

  const handleGrassHover = (date: Date | null) => {
    date && selectedGrass !== formatDate(date)
      ? setHoveredGrass(formatDate(date))
      : setHoveredGrass(null);
  };

  const selectedDate: string | null = selectedGrass
    ? `${year}-${selectedGrass.split('/').join('-')}`
    : null;

  const { data: selectedDiary } = useQuery<
    IDiary,
    Error,
    IDiary,
    (string | number | string | null)[]
  >({
    queryKey: ['selectedDiary', memberId, selectedDate],
    queryFn: () =>
      API.get(`/search/date/${memberId}?date=${selectedDate}`).then(
        ({ data }) => data,
      ),
    enabled: !!selectedGrass && !!memberId,
    onError: error =>
      console.error(`선택된 날짜의 일기를 불러올 수 없습니다. ${error}`),
  });

  useEffect(() => {
    if (selectedDiary) setSelectedDiary(selectedDiary);
    if (!selectedDiary) setSelectedDiary(undefined);
  }, [selectedDiary]);

  return (
    <div {...stylex.props(styles.grassContainer)}>
      {grass.map((column, index) => (
        <div key={index} {...stylex.props(styles.grass)}>
          {column.map((day, index) => {
            if (!day) return;
            const writeDay = formatDate(day);
            return (
              <div key={index} {...stylex.props(styles.dayContainer)}>
                {grassColors && (
                  <div
                    onClick={() => handleGrassClick(day)}
                    onMouseOver={() => handleGrassHover(day)}
                    onMouseOut={() => handleGrassHover(null)}
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
                {writeDay === hoveredGrass && writeDay !== selectedGrass && (
                  <div {...stylex.props(styles.dateBubble)}>
                    <span>{hoveredGrass}</span>
                  </div>
                )}
                {writeDay === selectedGrass && (
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

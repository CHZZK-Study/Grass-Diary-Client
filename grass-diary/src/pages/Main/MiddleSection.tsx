import stylex from '@stylexjs/stylex';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@components/index';
import subCharacter from '@icon/subCharacter.png';
import useUser from '@recoil/user/useUser';
import AnimateReward from './AnimateReward';
import API from '@services/index';

const MiddleSectionStyle = stylex.create({
  text: {
    fontWeight: 'bold',
    fontSize: '30px',
  },

  title: {
    display: 'flex',
    width: '1200px',
    padding: '50px 0 50px 10px',
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '300px',
  },

  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  grassContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    gap: '15px',
  },

  rewardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    gap: '15px',
  },

  calendar: {
    display: 'flex',
    flexWrap: 'wrap',

    marginBottom: '10px',
  },

  day: {
    backgroundColor: '#e0e0e0',
    height: '35px',
    width: '11%',
    padding: '2px',
    borderRadius: '5px',
    margin: '4px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

type Grass = {
  createdAt: string;
  transparency: number;
};

type GrassInfoDTO = {
  grassList: Grass[];
  colorRGB: string;
};

type GrassApiResponse = {
  totalCount: number;
  thisMonthCount: number;
  grassInfoDTO: GrassInfoDTO;
};

type RewardPointResponse = {
  rewardPoint: number;
};

const MiddleSection = () => {
  // 잔디 날짜 계산
  const currentDate = dayjs();
  const currentMonth = currentDate.format('M');
  const nextMonthFirstDay = currentDate.add(1, 'month').startOf('month');
  const currentMonthLastDay = nextMonthFirstDay.subtract(1, 'day');

  const { memberId } = useUser();

  // reward 쿼리
  const { data: reward } = useQuery<RewardPointResponse>({
    queryKey: ['rewardPoint'],
    queryFn: () =>
      API.get(`/member/totalReward/${memberId}`).then(
        response => response.data,
      ),
    initialData: { rewardPoint: 0 }, // 초기 데이터 설정
    enabled: !!memberId, // memberId가 있을 때만 쿼리를 실행
  });

  // grass 쿼리
  const { data: grassQuery } = useQuery<GrassApiResponse>({
    queryKey: ['grass'],
    queryFn: () =>
      API.get(`/main/grass/${memberId}`).then(response => response.data),
    enabled: !!memberId, // memberId가 있을 때만 쿼리를 실행
  });

  const getGrassStyle = useCallback(
    (day: number | string) => {
      const grass = grassQuery?.grassInfoDTO.grassList.find(
        g => dayjs(g.createdAt).format('D') == day,
      );
      if (grass) {
        return {
          backgroundColor: `rgb(${grassQuery?.grassInfoDTO.colorRGB})`,
          opacity: grass.transparency,
        };
      }
      return {};
    },
    [grassQuery],
  );

  const daysInMonth = Array.from(
    { length: currentMonthLastDay.date() },
    (_, i) => i + 1,
  );

  const weeksInMonth: number[][] = [];
  let week: number[] = [];

  daysInMonth.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % 7 === 0 || index === daysInMonth.length - 1) {
      weeksInMonth.push(week);
      week = [];
    }
  });

  const modal = () => {
    Swal.fire({
      title: '테마 상점',
      text: '테마 상점 준비중이에요',
      imageUrl: subCharacter,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
      confirmButtonColor: '#28CA3B',
      confirmButtonText: '확인',
    });
  };

  return (
    <>
      <div {...stylex.props(MiddleSectionStyle.title)}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <h1>📫 기록 상자</h1>
          <span>
            총 {grassQuery?.totalCount ? grassQuery?.totalCount : 0}
            개의 기록을 보유하고 있어요!
          </span>
        </div>
      </div>
      <div {...stylex.props(MiddleSectionStyle.container)}>
        <div
          className="cardSectionG"
          {...stylex.props(MiddleSectionStyle.grassContainer)}
        >
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Seedling.png"
            alt="Seedling"
            width="125"
            height="125"
          />
          <section>
            <div {...stylex.props(MiddleSectionStyle.calendar)}>
              {daysInMonth.map(day => (
                <div
                  {...stylex.props(MiddleSectionStyle.day)}
                  key={day}
                  style={getGrassStyle(day)}
                >
                  {/* {day} */}
                </div>
              ))}
            </div>
          </section>
          <h2>나의 이번달 잔디</h2>
          <div {...stylex.props(MiddleSectionStyle.contentWrapper)}>
            <span>
              {currentMonth}월 일기는 현재까지 총
              {grassQuery?.totalCount ? grassQuery?.thisMonthCount : 0}
              개가 작성되었어요
            </span>

            {grassQuery?.totalCount ? (
              <span>리워드를 확인 해보세요!</span>
            ) : (
              <span>일기를 쓰고 잔디를 심어보세요!</span>
            )}
          </div>
        </div>
        <div
          className="cardSectionR"
          {...stylex.props(MiddleSectionStyle.rewardContainer)}
        >
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png"
            alt="Party Popper"
            width="170"
            height="170"
          />
          <AnimateReward n={reward?.rewardPoint ?? 0} />
          <h2>나의 리워드</h2>
          <div {...stylex.props(MiddleSectionStyle.contentWrapper)}>
            <span>잔디를 꾸준히 심고 리워드를 받으세요</span>
            <span>테마 상점에서 다양한 아이템을 만날 수 있어요</span>
          </div>
          <Button
            text="테마 상점"
            width="130px"
            defaultColor="#2d2d2d"
            hoverColor="#FFF"
            defaultBgColor="#FFFFFF"
            hoverBgColor="#111111"
            border="1px solid #929292"
            marginTop="25px"
            onClick={modal}
          />
        </div>
      </div>
    </>
  );
};

export default MiddleSection;

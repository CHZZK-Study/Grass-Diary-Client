import stylex from '@stylexjs/stylex';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { isAuthenticatedAtom, isLoadingAtom } from '@recoil/auth/authState';

import API from '@services/index';
import mainCharacter from '@icon/mainCharacter.png';
import subCharacter from '@icon/subCharacter.png';
import useUser from '@recoil/user/useUser';
import AnimateReward from './AnimateReward';
import { checkAuth } from '@utils/authUtils';
import { PopularFeed, Header, Button, Container } from '@components/index';

const styles = stylex.create({
  subContent: {
    fontSize: '20px',
  },
  imgNav: {
    width: 50,
    height: 50,
    borderRadius: '50%',
  },
  navBar: {
    backgroundColor: 'white',
    boxShadow: '1px 1px 1px 1px #E0E0E0',
    display: 'flex',
    justifyContent: 'space-around',
    paddingTop: '15px',
    paddingBottom: '15px',
    position: 'sticky',
    top: 0,
  },
  button: {
    border: 'none',
    padding: 0,
    margin: 0,
    background: 'none',
    cursor: 'pointer',
  },
  ulListNone: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    listStyleType: 'none',
    padding: '0px',
    fontWeight: '400',
  },
  dropBox: {
    border: 'solid 1px #E0E0E0',
    borderRadius: '10px',
    position: 'absolute',
    width: '150%',
    top: '150%',
    boxShadow: '2px 2px 2px 2px #E0E0E0',
    backgroundColor: 'white',
  },
  dropContainer: {
    display: 'flex',
    gap: 15,
    alignItems: 'center',
    position: 'relative',
    padding: '0px 5px',
  },
  dropBoxEffect: {
    cursor: 'pointer',
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    transition: 'background-color 0.8s ease',
  },
  textWithIconLeft: {
    paddingLeft: '10px',
  },
  textWithIconRight: {
    marginRight: '10px',
  },
});

const TopSectionStyles = stylex.create({
  container: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',

    width: '1200px',
    height: '400px',

    backgroundColor: '#F9F9F9',
    border: 'solid 1px #BFBFBF',
    borderRadius: '30px 30px 0 0',
  },

  bannerContainer: {
    display: 'flex',
    flexDirection: 'column',

    width: '35%',
    gap: '30px',

    paddingLeft: '20px',
  },

  bannerTitle: {
    display: 'flex',
    flexDirection: 'column',

    gap: '20px',
  },

  character: {
    width: 300,
    height: 300,
  },

  bottomContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '1200px',
    height: '300px',

    gap: '30px',
    paddingTop: '30px',
  },

  bottomBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '100%',

    backgroundColor: '#F9F9F9',

    border: 'solid 1px #BFBFBF',
    borderRadius: '0 0 20px 20px',

    gap: '40px',
  },

  bottomIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '170px',
    height: '170px',

    borderRadius: '100%',
    backgroundColor: '#F2F2F2',
  },

  bottomContent: (gap?: string) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    gap,
  }),
});

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

const BottomSectionStyle = stylex.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '1200px',

    padding: '50px 0 0 10px',
  },

  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: '10px',
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  btn: {
    fontSize: '20px',
    fontWeight: 'bold',
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
});

type QuestionResponse = {
  question: string;
};

type DateResponse = {
  year: number;
  month: number;
  date: number;
  day: string;
};

const TopSection = () => {
  const [month, setMonth] = useState<number | null>(null);
  const [date, setDate] = useState<number | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [todayQuestion, setTodayQuestion] = useState<string | null>(null);

  useEffect(() => {
    API.get<QuestionResponse>('/diary/today-question')
      .then(response => {
        setTodayQuestion(response.data.question);
      })
      .catch(error => {
        console.error(`오늘의 질문을 불러올 수 없습니다. ${error}`);
      });
  }, []);

  useEffect(() => {
    API.get<DateResponse>('/main/today-date')
      .then(response => {
        setMonth(response.data.month);
        setDate(response.data.date);
        setDay(response.data.day);
      })
      .catch(error => {
        console.error(`오늘의 날짜를 불러올 수 없습니다. ${error}`);
      });
  });

  const modal = useCallback(() => {
    Swal.fire({
      title: '교환 일기장',
      text: '교환 일기 서비스를 준비중이에요',
      imageUrl: mainCharacter,
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
      confirmButtonColor: '#28CA3B',
      confirmButtonText: '확인',
    });
  }, []);

  return (
    <>
      <div {...stylex.props(TopSectionStyles.container)}>
        <div {...stylex.props(TopSectionStyles.bannerContainer)}>
          <div {...stylex.props(TopSectionStyles.bannerTitle)}>
            <i
              className="fa-solid fa-lightbulb"
              style={{ fontSize: '20px', paddingBottom: '5px' }}
            ></i>
            <h1>
              {date ? (
                <p>
                  오늘은<br></br>
                  {month}월 {date}일<br></br>
                  {day}요일 입니다.
                </p>
              ) : (
                <p>Loading...</p>
              )}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-circle-question"></i>
            <span>
              {todayQuestion ? <>{todayQuestion}</> : <>Loading...</>}
            </span>
          </div>
          <Link to="/creatediary">
            <Button
              text="오늘의 일기 쓰러 가기"
              width="180px"
              defaultColor="#2d2d2d"
              hoverColor="#FFF"
              defaultBgColor="#FFFFFF"
              hoverBgColor="#111111"
              border="1px solid #929292"
            />
          </Link>
        </div>
        <div>
          <img
            src={mainCharacter}
            alt="서비스 메인 캐릭터"
            {...stylex.props(TopSectionStyles.character)}
          />
        </div>
      </div>
      <div {...stylex.props(TopSectionStyles.bottomContainer)}>
        <div {...stylex.props(TopSectionStyles.bottomBox)}>
          <div {...stylex.props(TopSectionStyles.bottomIcon)}>
            <i
              className="fa-solid fa-book"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '80px',
              }}
            ></i>
          </div>
          <div {...stylex.props(TopSectionStyles.bottomContent('15px'))}>
            <Link to="/mypage">
              <h1 style={{ cursor: 'pointer' }}>
                나의 일기장
                <button {...stylex.props(styles.button)}>
                  <i
                    className="fa-regular fa-circle-right"
                    style={{
                      fontSize: '28px',
                      paddingLeft: '55px',
                    }}
                  ></i>
                </button>
              </h1>
            </Link>
            <span>나의 하루들은 어떻게 흘러갔을까?</span>
          </div>
        </div>
        <div {...stylex.props(TopSectionStyles.bottomBox)}>
          <div {...stylex.props(TopSectionStyles.bottomIcon)}>
            <i
              className="fa-solid fa-user-group"
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: '80px',
              }}
            ></i>
          </div>
          <div {...stylex.props(TopSectionStyles.bottomContent())}>
            <h1
              onClick={modal}
              style={{
                cursor: 'pointer',
                marginBottom: '10px',
              }}
            >
              교환 일기장
              <button {...stylex.props(styles.button)}>
                <i
                  className="fa-regular fa-circle-right"
                  style={{ fontSize: '28px', paddingLeft: '50px' }}
                ></i>
              </button>
            </h1>
            <span>친구의 일기를 확인하고</span>
            <span>나의 이야기를 들려주세요</span>
          </div>
        </div>
      </div>
    </>
  );
};

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
  const [rewardPoint, setRewardPoint] = useState<number | null>(null);
  const [grassTotalCount, setGrassTotalCount] = useState<number | null>(null);
  const [grassMonthCount, setGrassMonthCount] = useState<number | null>(null);
  const [grassColor, setGrassColor] = useState<string | null>(null);
  const [grassList, setGrassList] = useState<Grass[]>([]);

  const currentDate = dayjs();
  const currentMonth = currentDate.format('M');

  const nextMonthFirstDay = currentDate.add(1, 'month').startOf('month');
  const currentMonthLastDay = nextMonthFirstDay.subtract(1, 'day');

  const { memberId } = useUser();

  useEffect(() => {
    if (memberId) {
      API.get<RewardPointResponse>(`/member/totalReward/${memberId}`)
        .then(response => {
          setRewardPoint(response.data.rewardPoint);
        })
        .catch(error => {
          console.error(`사용자의 리워드 정보를 불러올 수 없습니다. ${error}`);
        });
    }
  }, [memberId]);

  useEffect(() => {
    if (memberId) {
      API.get<GrassApiResponse>(`/main/grass/${memberId}`)
        .then(response => {
          setGrassTotalCount(response.data.totalCount);
          setGrassMonthCount(response.data.thisMonthCount);
          setGrassColor(response.data.grassInfoDTO.colorRGB);
          setGrassList(response.data.grassInfoDTO.grassList);
        })
        .catch(error => {
          console.log('Error', error);
        });
    }
  }, [memberId]);

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

  const getGrassStyle = useCallback(
    (day: number | string) => {
      const grass = grassList.find(g => dayjs(g.createdAt).format('D') == day);
      if (grass) {
        return {
          backgroundColor: `rgb(${grassColor})`,
          opacity: grass.transparency,
        };
      }
      return {};
    },
    [grassList, grassColor],
  );

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
            총 {grassTotalCount ? grassTotalCount : 0}개의 기록을 보유하고
            있어요!
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
              {currentMonth}월 일기는 현재까지 총{' '}
              {grassMonthCount ? grassMonthCount : 0}
              개가 작성되었어요
            </span>

            {grassTotalCount ? (
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
          <AnimateReward n={rewardPoint} />
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

const BottomSection = () => {
  return (
    <>
      <div {...stylex.props(BottomSectionStyle.container)}>
        <div {...stylex.props(BottomSectionStyle.contentWrapper)}>
          <div {...stylex.props(BottomSectionStyle.title)}>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Trophy.png"
              alt="Trophy"
              width="25"
              height="25"
            />
            <h1>이번 주 TOP 10</h1>
          </div>
          <span>다른 사람의 하루를 구경하러 가볼까요?</span>
        </div>
        <Link to="/share">
          <button {...stylex.props(BottomSectionStyle.btn)}>
            더 보러가기 <i className="fa-solid fa-chevron-right"></i>
          </button>
        </Link>
      </div>
    </>
  );
};

const Main = () => {
  const navigate = useNavigate();
  const setIsAuthenticated = useSetRecoilState(isAuthenticatedAtom);
  const setIsLoading = useSetRecoilState(isLoadingAtom);

  useEffect(() => {
    const initLoad = async () => {
      setIsLoading(true);
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('accessToken');

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        const mainURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.pushState({ path: mainURL }, '', mainURL);

        setIsAuthenticated(true);
      }

      if (!accessToken) {
        const isAuthenticated = await checkAuth();
        setIsAuthenticated(isAuthenticated);

        if (!isAuthenticated) navigate('/');
      }

      setIsLoading(false);
    };

    initLoad();
  }, [navigate]);

  return (
    <Container>
      <Header />
      <TopSection />
      <MiddleSection />
      <BottomSection />
      <PopularFeed />
    </Container>
  );
};

export default Main;

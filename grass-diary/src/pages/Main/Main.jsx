import stylex from '@stylexjs/stylex';
import Swal from 'sweetalert2';
import dayjs from 'dayjs';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import API from '@services';
import mainCharacter from '@icon/mainCharacter.png';
import subCharacter from '@icon/subCharacter.png';
import useUser from '@hooks/useUser';
import AnimateReward from './AnimateReward';
import { checkAuth } from '@utils/authUtils';
import { Top10Feed, Header } from '@components';

const styles = stylex.create({
  title: {
    fontSize: '80px',
    color: 'green',
    fontWeight: 'bold',
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: '200px',
    backgroundColor: '#F9F9F9',
    height: 400,
    border: 'solid 1px #F9F9F9',
    borderRadius: '30px',
  },

  bannerContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  },

  bannerTitle: {
    display: 'flex',
    flexDirection: 'column',
    fontWeight: 'bold',
    fontSize: 25,
  },

  writeButton: {
    backgroundColor: {
      default: 'white',
      ':hover': 'black',
    },
    color: {
      default: 'black',
      ':hover': 'white',
    },
    padding: '10px 20px',
    margin: 0,
    cursor: 'pointer',
    border: 'solid outset 1px #E0E0E0',
    borderRadius: '20px',
    boxShadow: '1px 1px 1px 1px #E0E0E0',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },

  character: {
    width: 300,
    height: 300,
  },

  bottomContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '200px',
    paddingTop: '50px',
  },

  bottomLeftBox: {
    display: 'flex',
    gap: '100px',
    backgroundColor: '#F9F9F9',
    border: 'solid 1px #F9F9F9',
    borderRadius: '20px',
    padding: '70px',
  },

  bottomLeft: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  bottomRightBox: {
    display: 'flex',
    gap: '100px',
    backgroundColor: '#F9F9F9',
    border: 'solid 1px #F9F9F9',
    borderRadius: '20px',
    padding: '70px',
  },

  bottomRight: {
    display: 'flex',
    flexDirection: 'column',
  },
});

const MiddleSectionStyle = stylex.create({
  text: {
    fontWeight: 'bold',
    fontSize: '30px',
  },

  title: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '900px',
    paddingTop: '50px',
  },

  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: '300px',
  },

  grassContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  rewardContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  button: {
    backgroundColor: {
      default: 'white',
      ':hover': 'black',
    },
    color: {
      default: 'black',
      ':hover': 'white',
    },
    marginTop: '30px',
    padding: '10px 20px',
    cursor: 'pointer',
    border: 'solid outset 1px #E0E0E0',
    borderRadius: '20px',
    boxShadow: '1px 1px 1px 1px #E0E0E0',
    fontWeight: 'bold',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },

  grassBox: {
    backgroundColor: '#e0e0e0',
    width: '20px',
    height: '20px',
    margin: '2px',
    borderRadius: '5px',
  },

  calendar: {
    display: 'flex',
    flexWrap: 'wrap',
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
    justifyContent: 'center',
    alignItems: 'center',
    gap: '800px',
    paddingTop: '50px',
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  btn: {
    fontWeight: 'bold',
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
});

const TopSection = () => {
  const [date, setDate] = useState(null);
  const [todayQuestion, setTodayQuestion] = useState(null);

  useEffect(() => {
    API.get('/main/todayInfo')
      .then(response => {
        setDate(response.data.date);
        setTodayQuestion(response.data.todayQuestion);
      })
      .catch(error => {
        console.error(`오늘의 정보를 불러올 수 없습니다. ${error}`);
      });
  }, []);

  const modal = () => {
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
  };
  return (
    <>
      <div {...stylex.props(TopSectionStyles.container)}>
        <div {...stylex.props(TopSectionStyles.bannerContainer)}>
          <div {...stylex.props(TopSectionStyles.bannerTitle)}>
            <i
              className="fa-solid fa-lightbulb"
              style={{ paddingBottom: '20px' }}
            ></i>
            <div>{date ? <p>{date}</p> : <p>Loading...</p>}</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <i className="fa-solid fa-circle-question"></i>
            <div>{todayQuestion ? <>{todayQuestion}</> : <>Loading...</>}</div>
          </div>
          <Link to="/creatediary">
            <button {...stylex.props(TopSectionStyles.writeButton)}>
              오늘의 일기 쓰러가기
            </button>
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
        <div {...stylex.props(TopSectionStyles.bottomLeftBox)}>
          <div>
            <button {...stylex.props(styles.button)}>
              <i className="fa-solid fa-book" style={{ fontSize: '50px' }}></i>
            </button>
          </div>

          <div {...stylex.props(TopSectionStyles.bottomLeft)}>
            <Link to="/mypage">
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
              >
                나의 일기장
                <button {...stylex.props(styles.button)}>
                  <i
                    className="fa-regular fa-circle-right"
                    style={{ fontSize: '25px', paddingLeft: '90px' }}
                  ></i>
                </button>
              </div>
            </Link>
            <div>나의 하루들은 어떻게 흘러갔을까?</div>
          </div>
        </div>
        <div {...stylex.props(TopSectionStyles.bottomRightBox)}>
          <div>
            <button {...stylex.props(styles.button)}>
              <i
                className="fa-solid fa-user-group"
                style={{ fontSize: '50px' }}
              ></i>
            </button>
          </div>
          <div {...stylex.props(TopSectionStyles.bottomRight)}>
            <div
              onClick={modal}
              style={{
                fontWeight: 'bold',
                fontSize: '20px',
                marginBottom: '10px',
                cursor: 'pointer',
              }}
            >
              교환 일기장
              <button {...stylex.props(styles.button)}>
                <i
                  className="fa-regular fa-circle-right"
                  style={{ fontSize: '25px', paddingLeft: '90px' }}
                ></i>
              </button>
            </div>
            <div>친구의 일기를 확인하고</div>
            <div>나의 이야기를 들려주세요</div>
          </div>
        </div>
      </div>
    </>
  );
};

const MiddleSection = () => {
  const [rewardPoint, setRewardPoint] = useState(null);
  const [grassCount, setGrassCount] = useState(null);
  const [grassColor, setGrassColor] = useState(null);

  const currentDate = dayjs();
  const currentMonth = currentDate.format('M');
  const temporaryPoint = grassCount * 10;

  const nextMonthFirstDay = currentDate.add(1, 'month').startOf('month');
  const currentMonthLastDay = nextMonthFirstDay.subtract(1, 'day');

  const daysInMonth = Array.from(
    { length: currentMonthLastDay.date() },
    (_, i) => i + 1,
  );

  const weeksInMonth = [];
  let week = [];

  daysInMonth.forEach((day, index) => {
    week.push(day);
    if ((index + 1) % 7 === 0 || index === daysInMonth.length - 1) {
      weeksInMonth.push(week);
      week = [];
    }
  });

  const memberId = useUser();

  useEffect(() => {
    if (memberId) {
      API.get(`/member/totalReward/${memberId}`)
        .then(response => {
          setRewardPoint(response.data.rewardPoint);
        })
        .catch(error => {
          console.error(`사용자의 리워드 정보를 불러올 수 없습니다. ${error}`);
        });
    }
  }, [memberId]);

  useEffect(() => {
    API.get(`/main/grass/${memberId}`)
      .then(response => {
        setGrassCount(response.data.count);
        setGrassColor(response.data.grassInfoDTO.colorRGB);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, [memberId]);

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
        <div>
          <h2>기록 상자</h2>
          <span>
            총 {grassCount ? grassCount : 0}개의 기록을 보유하고 있어요!
          </span>
        </div>
        <div></div>
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
              {daysInMonth.map((day, index) => (
                <div
                  {...stylex.props(MiddleSectionStyle.day)}
                  key={day}
                  style={
                    index < grassCount
                      ? { backgroundColor: `rgb(${grassColor})` }
                      : {}
                  }
                >
                  {/* {day} */}
                </div>
              ))}
            </div>
          </section>
          <h2>나의 이번달 잔디</h2>
          <span>
            {currentMonth}월 일기는 현재까지 총 {grassCount ? grassCount : 0}
            개가 작성되었어요
          </span>
          {grassCount ? (
            <span>리워드를 확인 해보세요!</span>
          ) : (
            <span>일기를 쓰고 잔디를 심어보세요!</span>
          )}
          {/* <span>리워드를 확인 해보세요!</span> */}
        </div>
        <div
          className="cardSectionR"
          {...stylex.props(MiddleSectionStyle.rewardContainer)}
        >
          <img
            src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Party%20Popper.png"
            alt="Party Popper"
            width="125"
            height="125"
          />
          {/* <h1>{rewardPoint}</h1> */}
          {/* <h1>{temporaryPoint}</h1> */}
          <AnimateReward n={temporaryPoint} />
          <h2>나의 리워드</h2>
          <span>잔디를 꾸준히 심고 리워드를 받으세요</span>
          <span>테마 상점에서 다양한 아이템을 만날 수 있어요</span>
          <button onClick={modal} {...stylex.props(MiddleSectionStyle.button)}>
            테마 상점
          </button>
        </div>
      </div>
    </>
  );
};

const BottomSection = () => {
  return (
    <>
      <div {...stylex.props(BottomSectionStyle.container)}>
        <div>
          <div {...stylex.props(BottomSectionStyle.title)}>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Trophy.png"
              alt="Trophy"
              width="25"
              height="25"
            />
            <h2>이번 주 TOP 10</h2>
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

  useEffect(() => {
    const initLoad = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get('accessToken');

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);

        const mainURL = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
        window.history.pushState({ path: mainURL }, null, mainURL);
      }

      const isAuthenticated = await checkAuth();
      if (!isAuthenticated) navigate('/');
    };

    initLoad();
  }, [navigate]);

  return (
    <>
      <Header />
      <TopSection />
      <MiddleSection />
      <BottomSection />
      <Top10Feed />
      {/* <SimpleSlider /> */}
    </>
  );
};

export default Main;

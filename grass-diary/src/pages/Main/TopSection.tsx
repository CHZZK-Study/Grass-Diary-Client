import stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@components/index';
import API from '@services/index';
import mainCharacter from '@icon/mainCharacter.png';
import Swal from 'sweetalert2';

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

  button: {
    border: 'none',
    padding: 0,
    margin: 0,
    background: 'none',
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
  // 질문 데이터를 가져오는 쿼리
  const { data: question } = useQuery<QuestionResponse>({
    queryKey: ['todayQuestion'],
    queryFn: () =>
      API.get('/diary/today-question').then(response => response.data),
  });

  // 날짜 데이터를 가져오는 쿼리
  const { data: date } = useQuery<DateResponse>({
    queryKey: ['todayDate'],
    queryFn: () => API.get('/main/today-date').then(response => response.data),
  });

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
    }),
      [];
  };

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
                  {date.month}월 {date.date}일<br></br>
                  {date.day}요일 입니다.
                </p>
              ) : (
                <p>Loading...</p>
              )}
            </h1>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <i className="fa-solid fa-circle-question"></i>
            <span>
              {question?.question ? <>{question.question}</> : <>Loading...</>}
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
                <button {...stylex.props(TopSectionStyles.button)}>
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
              <button {...stylex.props(TopSectionStyles.button)}>
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

export default TopSection;

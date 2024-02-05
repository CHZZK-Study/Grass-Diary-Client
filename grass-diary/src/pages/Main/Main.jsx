import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import grass from '../../assets/icon/grass.png';
import profile from '../../assets/icon/profile.jpeg';
import mainCharacter from '../../assets/icon/mainCharacter.png';

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
    backgroundColor: 'white',
    padding: '10px 20px',
    margin: 0,
    cursor: 'pointer',
    border: 'solid 1px #E0E0E0',
    borderRadius: '20px',
    boxShadow: '1px 1px 1px 1px #E0E0E0',
    fontWeight: 'bold',
    transition: 'background-color 0.5s ease',
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
});

const DropMenu = () => {
  return (
    <>
      <div className="drop-box" {...stylex.props(styles.dropBox)}>
        <div>
          <ul {...stylex.props(styles.ulListNone)}>
            <li
              {...stylex.props(styles.dropBoxEffect)}
              onClick={(e) => {
                e.stopPropagation();
                console.log('HI');
              }}
            >
              <i className="fa-solid fa-user"></i>
              <span {...stylex.props(styles.textWithIconLeft)}>마이 페이지</span>
            </li>
            <li
              {...stylex.props(styles.dropBoxEffect)}
              onClick={(e) => {
                e.stopPropagation();
                console.log('HI');
              }}
            >
              <i className="fa-solid fa-gear"></i>
              <span {...stylex.props(styles.textWithIconLeft)}>설정</span>
            </li>
            <li
              {...stylex.props(styles.dropBoxEffect)}
              onClick={(e) => {
                e.stopPropagation();
                console.log('HI');
              }}
            >
              <i className="fa-solid fa-right-from-bracket"></i>
              <span {...stylex.props(styles.textWithIconLeft)}>로그아웃</span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

const Nav = () => {
  const [showDropMenu, setShowDropMenu] = useState(false);

  const toggleDropMenu = (e) => {
    e.stopPropagation();
    setShowDropMenu((prevState) => !prevState);
  };

  useEffect(() => {
    const closeMenu = () => {
      setShowDropMenu(false);
    };

    document.addEventListener('click', closeMenu);
    return () => {
      document.removeEventListener('click', closeMenu);
    };
  }, []);

  return (
    <>
      <div {...stylex.props(styles.navBar)}>
        <img src={grass} alt="서비스 로고 아이콘" {...stylex.props(styles.imgNav)} />
        <div {...stylex.props(styles.dropContainer)}>
          <img src={profile} alt="사용자 프로필 사진" {...stylex.props(styles.imgNav)} />
          <button {...stylex.props(styles.button)} onClick={toggleDropMenu}>
            <i className="fa-solid fa-list"></i>
          </button>
          {showDropMenu && <DropMenu closeMenu={toggleDropMenu} />}
        </div>
      </div>
    </>
  );
};

const TopSection = () => {
  return (
    <>
      <div {...stylex.props(TopSectionStyles.container)}>
        <div {...stylex.props(TopSectionStyles.bannerContainer)}>
          <div {...stylex.props(TopSectionStyles.bannerTitle)}>
            <i className="fa-solid fa-lightbulb" style={{ paddingBottom: '20px' }}></i>
            <div>오늘은</div>
            <div>11월 11일</div>
            <div>빼빼로 데이입니다</div>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <i className="fa-solid fa-circle-question"></i>
            <div>오늘 잠을 얼마나 잤나요?</div>
          </div>
          <button {...stylex.props(TopSectionStyles.writeButton)}>오늘의 일기 쓰러가기</button>
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
            <div style={{ fontWeight: 'bold', fontSize: '20px' }}>
              나의 일기장
              <button {...stylex.props(styles.button)}>
                <i
                  className="fa-regular fa-circle-right"
                  style={{ fontSize: '25px', paddingLeft: '90px' }}
                ></i>
              </button>
            </div>
            <div>나의 하루들은 어떻게 흘러갔을까?</div>
          </div>
        </div>
        <div {...stylex.props(TopSectionStyles.bottomRightBox)}>
          <div>
            <button {...stylex.props(styles.button)}>
              <i className="fa-solid fa-user-group" style={{ fontSize: '50px' }}></i>
            </button>
          </div>
          <div {...stylex.props(TopSectionStyles.bottomRight)}>
            <div
              style={{
                fontWeight: 'bold',
                fontSize: '20px',
                marginBottom: '10px',
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
  return (
    <>
      <div {...stylex.props(MiddleSectionStyle.text)}>기록 상자</div>
      <div {...stylex.props(MiddleSectionStyle.text)}>기록 상자</div>
      <div {...stylex.props(MiddleSectionStyle.text)}>총 2개의 기록을 보유하고 있어요!</div>
      <div {...stylex.props(MiddleSectionStyle.text)}>총 2개의 기록을 보유하고 있어요!</div>
    </>
  );
};

const Main = () => {
  return (
    <>
      <Nav />
      <TopSection />
      <MiddleSection />
    </>
  );
};

export default Main;

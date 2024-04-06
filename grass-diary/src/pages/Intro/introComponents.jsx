import stylex from '@stylexjs/stylex';
import styles from './styles';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginModal from './LoginModal/LoginModal';
import grassDiary from '@icon/grassDiary.png';
import useModal from '@hooks/useModal';
import { Button } from '@components';
import { checkAuth } from '@utils/authUtils';

const Container = ({ children }) => {
  return <div {...stylex.props(styles.container)}>{children}</div>;
};

const Section = ({ backgroundColor, height, children }) => (
  <section {...stylex.props(styles.mainContainer(backgroundColor, height))}>
    {children}
  </section>
);

const OpenModalButton = () => {
  const navigate = useNavigate();
  const { isModalOpen, handleOpenModal, handleCloseModal } = useModal();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = async () => {
      const accessToken = await checkAuth();
      if (accessToken) setIsLoggedIn(true);
    };

    loggedIn();
  }, []);

  const handleStartButton = () => {
    if (isLoggedIn) navigate('/main');
    else handleOpenModal();
  };

  return (
    <>
      <Button
        text="일기 시작하기"
        onClick={handleStartButton}
        width="150px"
        color="#FFF"
        backgroundColor="#28CA3B"
        border="none"
        marginTop="20px"
      />
      {!isLoggedIn && isModalOpen && (
        <LoginModal isOpen={handleOpenModal} isClose={handleCloseModal} />
      )}
    </>
  );
};

const ServiceMain = () => {
  return (
    <div {...stylex.props(styles.mainContent('row'))}>
      <div {...stylex.props(styles.mainDescription)}>
        <h1 {...stylex.props(styles.mainTitle)}>잔디 일기</h1>
        <p {...stylex.props(styles.contentDesc('1.35rem'))}>
          일상 속의 잔디, <br />
          나의 이야기를 키우다
        </p>
        <p>일상의 작은 기록들이 잔디처럼 자라나 큰 성장으로 이어져요</p>
        <OpenModalButton />
      </div>
      <div {...stylex.props(styles.mainImage)}>
        <img src={grassDiary} alt="잔디 다이어리" />
      </div>
    </div>
  );
};

const MainDesc = () => {
  return (
    <div {...stylex.props(styles.mainContent('row'))}>
      <div {...stylex.props(styles.contentImage('23.15rem', '30rem'))}></div>
      <div {...stylex.props(styles.mainDescription)}>
        <h1 {...stylex.props(styles.contentDesc('1.75rem'))}>
          우리는 <br /> 성장을 위해서 <br /> 기록합니다
        </h1>
        <p>
          변화와 성장이 함께하는 <br /> 나만의 스토리를 완성할 수 있어요
        </p>
      </div>
    </div>
  );
};

const SecondDesc = () => {
  return (
    <div {...stylex.props(styles.mainContent('column'))}>
      <div {...stylex.props(styles.mainDescription('center'))}>
        <h1 {...stylex.props(styles.contentDesc('1.75rem'))}>
          꾸준히 잔디를 심고 리워드를 획득해요
        </h1>
        <p>받은 리워드로 테마 상점에서 다양한 아이템을 만날 수 있어요</p>
      </div>
      <div {...stylex.props(styles.contentImage('43.75rem', '25rem'))}></div>
    </div>
  );
};

const StartContent = () => {
  return (
    <div {...stylex.props(styles.mainDescription('center'))}>
      <h1 {...stylex.props(styles.contentDesc('1.75rem'))}>
        지금 바로 잔디 일기를 시작해 보세요!
      </h1>
      <OpenModalButton />
    </div>
  );
};

export { Container, Section, ServiceMain, MainDesc, SecondDesc, StartContent };

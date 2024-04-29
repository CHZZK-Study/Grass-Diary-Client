import stylex from '@stylexjs/stylex';
import styles from './styles';
import { useState, useEffect } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import LoginModal from './LoginModal/LoginModal';
import grassDiary from '@icon/grassDiary.png';
import useModal from '@hooks/useModal';
import { Button } from '@components/index';
import { checkAuth } from '@utils/authUtils';
import introDiaryImage from '@icon/introDiaryImage.png';
import mainCharacter from '@icon/mainCharacter.png';

const OpenModalButton = () => {
  const navigate: NavigateFunction = useNavigate();
  const { isModalOpen, handleOpenModal, handleCloseModal }: IModalReturn =
    useModal();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const loggedIn = async () => {
      const accessToken: boolean = await checkAuth();
      if (accessToken) setIsLoggedIn(true);
    };

    loggedIn();
  }, []);

  type TStartButton = () => void;

  const handleStartButton: TStartButton = () => {
    if (isLoggedIn) navigate('/main');
    if (!isLoggedIn) handleOpenModal();
  };

  return (
    <>
      <Button
        text="일기 시작하기"
        width="150px"
        marginTop="20px"
        defaultColor="#FFF"
        hoverColor="#FFF"
        defaultBgColor="#28CA3B"
        hoverBgColor="#13b81b"
        border="none"
        onClick={handleStartButton}
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
      <div {...stylex.props(styles.mainDescription())}>
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
      <img
        {...stylex.props(styles.contentImage('35rem', '35rem'))}
        src={introDiaryImage}
        alt="Section2Image"
      />
      <div {...stylex.props(styles.mainDescription())}>
        <h1 {...stylex.props(styles.contentDesc('1.75rem'))}>
          우리는
          <br />
          성장을 위해서
          <br />
          기록합니다
        </h1>
        <p>
          변화와 성장이 함께하는
          <br />
          나만의 스토리를 완성할 수 있어요
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
      <img
        {...stylex.props(styles.contentImage('28rem', '27rem'))}
        src={mainCharacter}
        alt="mainCharacter"
      />
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

export { ServiceMain, MainDesc, SecondDesc, StartContent };

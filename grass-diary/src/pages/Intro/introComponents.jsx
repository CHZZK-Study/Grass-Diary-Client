import { useState } from 'react';
import stylex from '@stylexjs/stylex';
import styles from './styles';
import grassDiary from '../../assets/icon/grassDiary.png';
import Button from '../../components/Button';
import LoginModal from './LoginModal/LoginModal';

const Container = ({ children }) => {
  return <div {...stylex.props(styles.container)}>{children}</div>;
};

const Section = ({ backgroundColor, height, children }) => (
  <section {...stylex.props(styles.mainContainer(backgroundColor, height))}>
    {children}
  </section>
);

const ServiceMain = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  return (
    <div {...stylex.props(styles.mainContent('row'))}>
      <div {...stylex.props(styles.mainDescription)}>
        <h1 {...stylex.props(styles.mainTitle)}>잔디 일기</h1>
        <p {...stylex.props(styles.contentDesc('22px'))}>
          일상 속의 잔디, <br />
          나의 이야기를 키우다
        </p>
        <p>일상의 작은 기록들이 잔디처럼 자라나 큰 성장으로 이어져요</p>
        <Button text="일기 시작하기" onClick={handleButtonClick} />
        {isModalOpen && <LoginModal />}
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
      <div {...stylex.props(styles.contentImage('370px', '480px'))}></div>
      <div {...stylex.props(styles.mainDescription)}>
        <h1 {...stylex.props(styles.contentDesc('28px'))}>
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
        <h1 {...stylex.props(styles.contentDesc('28px'))}>
          꾸준히 잔디를 심고 리워드를 획득해요
        </h1>
        <p>받은 리워드로 테마 상점에서 다양한 아이템을 만날 수 있어요</p>
      </div>
      <div {...stylex.props(styles.contentImage('700px', '400px'))}></div>
    </div>
  );
};

const StartContent = () => {
  return (
    <div {...stylex.props(styles.mainDescription('center'))}>
      <h1 {...stylex.props(styles.contentDesc('28px'))}>
        지금 바로 잔디 일기를 시작해 보세요!
      </h1>
      <Button text="일기 시작하기" />
    </div>
  );
};

export { Container, Section, ServiceMain, MainDesc, SecondDesc, StartContent };

import * as stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import axios from 'axios';

import testImg from '../../assets/icon/profile.jpeg';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Like from '../../components/Like';
import { EllipsisIcon, EllipsisBox } from '../../components/Ellipsis';

import UnmodifyModal from './modal/UnmodifyModal';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal';
import CompleteDeleteModal from './modal/CompleteDeleteModal';

const styles = stylex.create({
  wrap: {
    background: '#F9F9F9',
    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
    height: '100vh',
    margin: '10px auto 0',
    border: '1px solid #BFBFBF',
    borderRadius: '50px 50px 0 0',
    padding: '65px 80px 0 80px',
  },
  feelBackground: {
    position: 'relative',
    width: '40px',
    height: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    border: '1px solid #BFBFBF',
  },
  feel: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: '#D2FBBF',
  },
  diaryFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '36px',
  },
});

const titleStyle = stylex.create({
  progileBox: {
    position: 'relative',
    width: '50px',
    height: '50px',
    margin: '44px 0 28px 0',
  },
  profileImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  emoji: {
    zIndex: '1',
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: 'translate(3px, 3px)',
  },
  name: {
    width: '300px',
    position: 'absolute',
    bottom: 0,
    left: '70px',
    fontSize: '13px',
  },
  diaryHeader: {
    position: 'relative',
  },
  title: {
    fontSize: '40px',
    fontWeight: '600',
    marginRight: '24px',
  },
  time: {
    fontSize: '16px',
    marginRight: '24px',
  },
  privateOrPubilc: {
    fontSize: '16px',
  },
  ellipsis: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: '7px',
    cursor: 'pointer',
  },
});

const contentStyle = stylex.create({
  diaryContent: {
    margin: '36px 0px',
    borderTop: '1px solid #BFBFBF',
  },
  hashTag: {
    color: '#28B91C',
    fontSize: '13px',
    margin: '36px 0',
  },
  content: {
    fontSize: '13px',
    lineHeight: '25px',
  },
});

const Footer = () => {
  return (
    <div {...stylex.props(styles.diaryFooter)}>
      <Like />
      <div {...stylex.props(styles.feelBackground)}>
        <div {...stylex.props(styles.feel)}></div>
      </div>
    </div>
  );
};

const Setting = () => {
  const [modifiable, setModifiable] = useState(false);
  const [unmodifyModal, setUnmodifyModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [completeDeleteModal, setCompleteDeleteModal] = useState(false);

  const showConfirmModal = () => setConfirmDeleteModal(true);

  const linkToModify = () => {
    if (!modifiable && !unmodifyModal) {
      setUnmodifyModal(true);
      return;
    }
    // 수정 가능할 때의 로직
  };

  const deleteDiary = () => {
    setCompleteDeleteModal(true);
    // 일기 삭제 로직
  };

  return (
    <>
      <EllipsisIcon translateValue={'115px'}>
        <EllipsisBox onClick={linkToModify} text={'수정'} />
        <EllipsisBox onClick={showConfirmModal} text={'삭제'} />
      </EllipsisIcon>

      {unmodifyModal && <UnmodifyModal setter={setUnmodifyModal} />}
      {confirmDeleteModal && (
        <ConfirmDeleteModal
          setter={setConfirmDeleteModal}
          setDelete={deleteDiary}
        />
      )}
      {completeDeleteModal && (
        <CompleteDeleteModal setter={setCompleteDeleteModal} />
      )}
    </>
  );
};

const Diary = () => {
  const title = '11월 11일 목요일';
  const time = '23:01';
  const privateOrPubilc = '비공개';
  const hashTag = '#해시태그';
  const content = '오늘은 스터디 회의가 있는 날이었다.';
  const emoji = '😆';
  const userName = 'user name';

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get('http://localhost:8080/api/diary/16', config)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  return (
    <>
      <Header />
      <div {...stylex.props(styles.wrap)}>
        <BackButton />
        {/* 일기 타이틀 */}
        <div>
          <div {...stylex.props(titleStyle.progileBox)}>
            <img {...stylex.props(titleStyle.profileImg)} src={testImg}></img>
            <div {...stylex.props(titleStyle.emoji)}>{emoji}</div>
            <div {...stylex.props(titleStyle.name)}>{userName}</div>
          </div>
          <div {...stylex.props(titleStyle.diaryHeader)}>
            <span {...stylex.props(titleStyle.title)}>{title}</span>
            <span {...stylex.props(titleStyle.time)}>{time}</span>
            <span {...stylex.props(titleStyle.privateOrPubilc)}>
              {privateOrPubilc}
            </span>
            <div {...stylex.props(titleStyle.ellipsis)}>
              <Setting />
            </div>
          </div>
        </div>

        {/* 일기 내용 */}
        <div {...stylex.props(contentStyle.diaryContent)}>
          <div {...stylex.props(contentStyle.hashTag)}>{hashTag}</div>
          <p {...stylex.props(contentStyle.content)}>{content}</p>
        </div>

        {/* 일기 하단 */}
        <Footer />
      </div>
    </>
  );
};

export default Diary;

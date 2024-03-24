import * as stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../../services/index';

import testImg from '../../assets/icon/basicProfile.png';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Like from '../../components/Like';
import { EllipsisIcon, EllipsisBox } from '../../components/Ellipsis';
import EMOJI from '../../constants/emoji';

import UnmodifyModal from './modal/UnmodifyModal';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal';
import CompleteDeleteModal from './modal/CompleteDeleteModal';
import useUser from '../../hooks/useUser';

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
  feel: backgroundColor => ({
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor,
  }),
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

const Setting = id => {
  const [modifiable, setModifiable] = useState(false);
  const [unmodifyModal, setUnmodifyModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [completeDeleteModal, setCompleteDeleteModal] = useState(false);
  const createdDate = '24년 03월 14일'; // 임시 데이터
  const date = new Date();
  useEffect(() => {
    if (
      // 당일 : 일기 수정 가능
      createdDate.slice(0, 2) === String(date.getFullYear()).slice(2, 4) &&
      createdDate.slice(5, 6) == date.getMonth() + 1 &&
      createdDate.slice(8, 10) == date.getDate()
    ) {
      setModifiable(true);
    } else {
      // 그 외 시간 : 수정 불가능
      setModifiable(false);
    }
  }, []);

  const showConfirmModal = () => setConfirmDeleteModal(true);

  const linkToModify = () => {
    if (!modifiable && !unmodifyModal) {
      setUnmodifyModal(true);
      return;
    }
    // 일기 수정 가능 시,
  };

  const deleteDiary = async () => {
    await API.delete(`/diary/${id.id}`)
      .then(() => {
        console.log('삭제 완료');
        setCompleteDeleteModal(true);
      })
      .catch(err => console.log('삭제 error', err));
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
  const id = useParams().id;
  const navigate = useNavigate();
  const loginUserMemberId = useUser();
  const [diary, setDiary] = useState({});
  const [profile, setProfile] = useState();
  const [mood, setMood] = useState();
  const [likeCount, setLikeCount] = useState();
  const [writerMemberId, setWriterMemberId] = useState();

  const fetchDiaryData = async () => {
    try {
      const response = await API.get(`/diary/${id}`);
      const memberId = response.data.memberId;
      const responseMember = await API.get(`/member/profile/${memberId}`);
      console.log(response.data.transparency);
      const mood = response.data.transparency.toString()[2] - 1;
      const randomIndex = Math.floor(Math.random() * 3);

      setMood(EMOJI[mood][randomIndex]);
      setDiary(response.data);
      setProfile(responseMember.data);
      setLikeCount(response.data.likeCount);
      setWriterMemberId(memberId);
    } catch (err) {
      console.log('상세 페이지 Error >>', err);
      navigate('/non-existent-page');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDiaryData();
  }, []);

  return (
    <>
      <Header />
      <div {...stylex.props(styles.wrap)}>
        <BackButton />
        {/* 일기 타이틀  */}
        <div>
          <div {...stylex.props(titleStyle.progileBox)}>
            <img
              {...stylex.props(titleStyle.profileImg)}
              src={profile ? profile.profileImageURL : testImg}
            ></img>
            <div {...stylex.props(titleStyle.emoji)}>{mood}</div>
            <div {...stylex.props(titleStyle.name)}>
              {profile ? profile.nickName : null}
            </div>
          </div>
          <div {...stylex.props(titleStyle.diaryHeader)}>
            <span {...stylex.props(titleStyle.title)}>{diary.createdDate}</span>
            <span {...stylex.props(titleStyle.time)}>{diary.createdAt}</span>
            <span {...stylex.props(titleStyle.privateOrPubilc)}>
              {diary.isPrivate ? '비공개' : '공개'}
            </span>
            <div {...stylex.props(titleStyle.ellipsis)}>
              {loginUserMemberId === writerMemberId ? (
                <Setting id={id} />
              ) : null}
            </div>
          </div>
        </div>

        {/* 일기 내용 */}
        <div {...stylex.props(contentStyle.diaryContent)}>
          <div {...stylex.props(contentStyle.hashTag)}>
            {diary.tags?.map(tag => {
              return `#${tag.tag} `;
            })}
          </div>
          <p {...stylex.props(contentStyle.content)}>{diary.content}</p>
        </div>

        {/* 일기 하단 */}
        <div {...stylex.props(styles.diaryFooter)}>
          <Like likeCount={likeCount} setLikeCount={setLikeCount} />
          <div {...stylex.props(styles.feelBackground)}>
            <div
              {...stylex.props(
                styles.feel(`rgba(0, 255, 0, ${diary.transparency})`),
              )}
            ></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diary;

import * as stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import testImg from '@assets/icon/basicProfile.png';
import API from '@services';
import useUser from '@hooks/useUser';
import Header from '@components/Header';
import BackButton from '@components/BackButton';
import Like from '@components/Like';
import EMOJI from '@constants/emoji';
import Setting from './Setting';

const styles = stylex.create({
  wrap: {
    background: '#F9F9F9',
    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
    minHeight: '100vh',
    margin: '10px auto 0',
    border: '1px solid #BFBFBF',
    borderRadius: '50px 50px 0 0',
    padding: '65px 80px 0 80px',
  },
  feelBackground: {
    position: 'relative',
    width: '40px',
    height: '40px',
    marginLeft: '20px',
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
    minHeight: '200px',
  },
});

const Diary = () => {
  const id = useParams().id;
  const loginUserMemberId = useUser();
  const [diary, setDiary] = useState({});
  const [profile, setProfile] = useState();
  const [mood, setMood] = useState();
  const [liked, setliked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [writerMemberId, setWriterMemberId] = useState();

  const fetchDiaryData = async () => {
    try {
      const response = await API.get(`/diary/${id}`);
      const memberId = response.data.memberId;
      const responseMember = await API.get(`/member/profile/${memberId}`);

      setMood(EMOJI[response.data.transparency * 10]);
      setDiary(response.data);
      setProfile(responseMember.data);
      setliked(response.data.likedByLogInMember);
      setLikeCount(response.data.likeCount);
      setWriterMemberId(memberId);
    } catch (error) {
      console.error(`일기 상세 정보를 불러올 수 없습니다. ${error}`);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchDiaryData();
  }, []);

  const createMarkup = htmlContent => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

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
                <Setting id={id} createdDate={diary.createdDate} />
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
          <div
            {...stylex.props(contentStyle.content)}
            dangerouslySetInnerHTML={createMarkup(diary.content)}
          />
        </div>

        {/* 일기 하단 */}
        <div {...stylex.props(styles.diaryFooter)}>
          <Like
            diaryId={id}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
            liked={liked}
          />
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

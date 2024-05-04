import stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';

import { Header, BackButton, Like, Container } from '@components/index';
import useUser from '@recoil/user/useUser';
import EMOJI from '@constants/emoji';
import Setting from './Setting';
import { useDiaryDetail } from '@hooks/useDiaryDetail';
import { useWriterProfile } from '@hooks/useWriterProfile';

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

interface IDiaryData {
  diary: IDiary;
  writerMemberId: number;
  profile: IProfile;
  mood: string;
}

const Diary = () => {
  const { id: diaryId } = useParams();
  const { memberId } = useUser();
  const [likeCount, setLikeCount] = useState(0);
  const { data: detail } = useDiaryDetail(diaryId);
  const writerId = detail?.data.memberId;
  const { data: writer } = useWriterProfile(writerId);

  useEffect(() => {
    if (detail) {
      setLikeCount(detail.data.likeCount);
    }
  }, [detail]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const createMarkup = (htmlContent: string | undefined) => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  return (
    <Container>
      <Header />
      <div {...stylex.props(styles.wrap)}>
        <BackButton />
        {/* 일기 타이틀  */}
        <div>
          <div {...stylex.props(titleStyle.progileBox)}>
            <img
              {...stylex.props(titleStyle.profileImg)}
              src={writer?.data.profileImageURL}
            ></img>
            <div {...stylex.props(titleStyle.emoji)}>
              {EMOJI[detail?.data.transparency * 10]}
            </div>
            <div {...stylex.props(titleStyle.name)}>
              {writer?.data.nickName}
            </div>
          </div>
          <div {...stylex.props(titleStyle.diaryHeader)}>
            <span {...stylex.props(titleStyle.title)}>
              {detail?.data.createdDate}
            </span>
            <span {...stylex.props(titleStyle.time)}>
              {detail?.data.createdAt}
            </span>
            <span {...stylex.props(titleStyle.privateOrPubilc)}>
              {detail?.data.isPrivate ? '비공개' : '공개'}
            </span>
            <div {...stylex.props(titleStyle.ellipsis)}>
              {memberId === detail?.data.memberId ? (
                <Setting id={diaryId} createdDate={detail?.data.createdDate} />
              ) : null}
            </div>
          </div>
        </div>

        {/* 일기 내용 */}
        <div {...stylex.props(contentStyle.diaryContent)}>
          <div {...stylex.props(contentStyle.hashTag)}>
            {detail?.data.tags?.map(tag => {
              return `#${tag.tag} `;
            })}
          </div>
          <div
            {...stylex.props(contentStyle.content)}
            dangerouslySetInnerHTML={createMarkup(detail?.data.content)}
          />
        </div>

        {/* 일기 하단 */}
        <div {...stylex.props(styles.diaryFooter)}>
          <Like
            diaryId={diaryId}
            likeCount={likeCount}
            setLikeCount={setLikeCount}
            liked={detail?.data.likedByLogInMember}
          />
          <div {...stylex.props(styles.feelBackground)}>
            <div
              {...stylex.props(
                styles.feel(`rgba(0, 255, 0, ${detail?.data.transparency})`),
              )}
            ></div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Diary;

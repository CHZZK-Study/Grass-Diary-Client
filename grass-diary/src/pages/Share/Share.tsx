import stylex from '@stylexjs/stylex';
import { useEffect, useRef, useState } from 'react';

import API from '@services/index';
import { Container, Feed, Header, Top10Feed } from '@components/index';

const styles = stylex.create({
  container: {
    height: '100vh',
    margin: 'auto',
    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
  },
  top10Title: {
    fontSize: '26px',
    fontWeight: '600',
    margin: '40px 0 10px 0',
  },

  latestTitle: {
    margin: '80px 0 10px 0',
    fontSize: '18px',
    fontWeight: '500',
  },
  latestFeed: {
    display: 'flex',
    flexFlow: 'row wrap',
  },
  observer: {
    margin: 'auto',
    width: '50px',
    height: '50px',
  },
  noFeed: {
    width: '100vw',
    height: '150px',
    textAlign: 'center',
    lineHeight: '250px',
  },
});

interface ILatesData {
  diaryId: number;
  title: string;
  diaryContent: string;
  diaryLikeCount: number;
  profile: string;
  nickname: string;
}

const Share = () => {
  const [cursorId, setCursorId] = useState(922337203685477600);
  const [latestDatas, setLatestDatas] = useState<ILatesData[]>([]);
  const [noFeed, setNoFeed] = useState(true);
  const target = useRef<HTMLDivElement>(null);

  const getProfileApi = async (memberId: number) => {
    const profile = await API.get(`/member/profile/${memberId}`).then(
      res => res.data.profileImageURL,
    );
    return profile;
  };

  const getApi = async () => {
    try {
      const res = await API.get(
        `/shared/diaries/latest?cursorId=${cursorId}&size=3`,
      ).then(res => res.data.diaries);

      const initData = await Promise.all(
        res.map(async (data: ILatestResponse) => {
          const profile = await getProfileApi(data.memberId);
          const title =
            `${data.createdAt.slice(2, 4)}년 ` +
            `${data.createdAt.slice(5, 7)}월 ` +
            `${data.createdAt.slice(8, 10)}일`;

          return {
            diaryId: data.diaryId,
            title: title,
            diaryContent: data.content,
            diaryLikeCount: data.diaryLikeCount,
            profile: profile,
            nickname: data.nickname,
          };
        }),
      );

      if (initData.length > 0) {
        setCursorId(initData.at(-1).diaryId);
        setLatestDatas(prev => [...prev, ...initData]);
        setNoFeed(false);
      }
    } catch (error) {
      console.error(`최신 일기 목록을 불러올 수 없습니다. ${error}`);
    }
  };

  const callback: IntersectionObserverCallback = async ([entry]) => {
    if (entry.isIntersecting) {
      getApi();
    }
  };

  // 무한 스크롤
  useEffect(() => {
    if (latestDatas.length === 0) {
      window.scrollTo(0, 0);
    }

    const observer = new IntersectionObserver(callback, { threshold: 1 });
    const { current } = target;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [latestDatas]);

  return (
    <Container>
      <Header />
      <div {...stylex.props(styles.container)}>
        <section>
          <div {...stylex.props(styles.top10Title)}>🏆 이번 주 TOP 10</div>
          <Top10Feed />
        </section>

        <div>
          <div {...stylex.props(styles.latestTitle)}>
            우리들의 다채로운 하루를 들어보세요
          </div>
          <div {...stylex.props(styles.latestFeed)}>
            {latestDatas.map(data => {
              return (
                <Feed
                  key={data.diaryId}
                  likeCount={data.diaryLikeCount}
                  link={`/diary/${data.diaryId}`}
                  title={data.title}
                  content={data.diaryContent}
                  name={data.nickname}
                  profile={data.profile}
                />
              );
            })}
            {noFeed ? (
              <div {...stylex.props(styles.noFeed)}>
                공개된 일기가 아직 없어요
              </div>
            ) : null}
          </div>
          <div ref={target} {...stylex.props(styles.observer)}></div>
        </div>
      </div>
    </Container>
  );
};

export default Share;

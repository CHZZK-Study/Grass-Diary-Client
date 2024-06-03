import stylex from '@stylexjs/stylex';
import { Fragment, useEffect, useRef } from 'react';
import { Container, Feed, Header, PopularFeed } from '@components/index';
import { useLatestDiaries } from '@hooks/useLatestDiaries';

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
    width: '100%',
    height: '80px',
  },
  noFeed: {
    width: '100vw',
    height: '150px',
    textAlign: 'center',
    lineHeight: '250px',
  },
});

const Share = () => {
  const target = useRef<HTMLDivElement>(null);
  const { latest, fetchNextPage } = useLatestDiaries();

  const feedList = latest?.map((group, i) => (
    <Fragment key={i}>
      {group &&
        group?.map(data => {
          return (
            <Feed
              key={data.diaryId}
              likeCount={data.diaryLikeCount}
              link={`/diary/${data.diaryId}`}
              createdAt={data.createdAt}
              content={data.content}
              name={data.nickname}
              memberId={data.memberId}
            />
          );
        })}
    </Fragment>
  ));

  const callback: IntersectionObserverCallback = async ([entry]) => {
    if (entry.isIntersecting) {
      fetchNextPage();
    }
  };

  // 무한 스크롤
  useEffect(() => {
    if (latest?.length === 0) {
      window.scrollTo(0, 0);
    }

    const observer = new IntersectionObserver(callback, { threshold: 0.3 });
    const { current } = target;

    if (current) {
      observer.observe(current);
    }

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [latest]);

  return (
    <Container>
      <Header />
      <div {...stylex.props(styles.container)}>
        <section>
          <div {...stylex.props(styles.top10Title)}>🏆 이번 주 TOP 10</div>
          <PopularFeed />
        </section>

        <div>
          <div {...stylex.props(styles.latestTitle)}>
            우리들의 다채로운 하루를 들어보세요
          </div>
          <div {...stylex.props(styles.latestFeed)}>
            {feedList}
            {!latest ? (
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

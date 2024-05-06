import stylex from '@stylexjs/stylex';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

import { Feed } from '@components/index';
import { usePopularDiaries } from '@hooks/usePopularDiaries';

const styles = stylex.create({
  slider: {
    margin: 'auto',
    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
  },
  noFeed: {
    height: '440px',
    textAlign: 'center',
    lineHeight: '440px',
  },
});

const PopularFeed = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
  };

  const { data: top10 } = usePopularDiaries();

  return (
    <div className="slider-container" {...stylex.props(styles.slider)}>
      {top10?.length > 3 ? (
        <Slider {...settings}>
          {top10?.map(data => {
            const title =
              `${data.createdAt.slice(2, 4)}년 ` +
              `${data.createdAt.slice(5, 7)}월 ` +
              `${data.createdAt.slice(8, 10)}일`;
            return (
              <Feed
                key={data.diaryId}
                likeCount={data.diaryLikeCount}
                link={`/diary/${data.diaryId}`}
                title={title}
                content={data.diaryContent}
                name={data.nickname}
                memberId={data.memberId}
              />
            );
          })}
        </Slider>
      ) : (
        top10?.map(data => {
          const title =
            `${data.createdAt.slice(2, 4)}년 ` +
            `${data.createdAt.slice(5, 7)}월 ` +
            `${data.createdAt.slice(8, 10)}일`;
          return (
            <Feed
              key={data.diaryId}
              likeCount={data.diaryLikeCount}
              link={`/diary/${data.diaryId}`}
              title={title}
              content={data.diaryContent}
              name={data.nickname}
              memberId={data.memberId}
            />
          );
        })
      )}
      {!top10 ? (
        <div {...stylex.props(styles.noFeed)}>
          이번 주는 공개된 일기가 아직 없어요
        </div>
      ) : null}
    </div>
  );
};

export default PopularFeed;

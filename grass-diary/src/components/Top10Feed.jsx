import { useEffect, useState } from 'react';
import * as stylex from '@stylexjs/stylex';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import API from '../services';
import Feed from './Feed';

const styles = stylex.create({
  slider: {
    margin: 'auto',
    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
  },
  noFeed: {
    height: '150px',
    textAlign: 'center',
    lineHeight: '150px',
  },
});

const Top10Feed = () => {
  const [top10Datas, setTop10Datas] = useState();
  const [noFeed, setNoFeed] = useState(true);
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };

  const getProfileApi = async memberId => {
    const profile = await API.get(`/member/profile/${memberId}`).then(
      res => res.data.profileImageURL,
    );
    return profile;
  };

  const getDiaryApi = async () => {
    try {
      const res = await API.get('/shared/diaries/popular').then(res => {
        if (res.data.length > 0) setNoFeed(false);
        return res.data;
      });

      const initData = await Promise.all(
        res.map(async data => {
          const profile = await getProfileApi(data.memberId);
          const title =
            `${data.createdAt.slice(2, 4)}년 ` +
            `${data.createdAt.slice(5, 7)}월 ` +
            `${data.createdAt.slice(8, 10)}일`;
          return {
            diaryId: data.diaryId,
            title: title,
            diaryContent: data.diaryContent,
            diaryLikeCount: data.diaryLikeCount,
            profile: profile,
            nickname: data.nickname,
          };
        }),
      );
      setTop10Datas(initData);
    } catch (error) {
      console.error(`TOP 10 정보를 불러올 수 없습니다. ${error}`);
    }
  };

  useEffect(() => {
    getDiaryApi();
  }, []);

  return (
    <div className="slider-container" {...stylex.props(styles.slider)}>
      {top10Datas?.length > 3 ? (
        <Slider {...settings}>
          {top10Datas?.map(data => {
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
        </Slider>
      ) : (
        top10Datas?.map(data => {
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
        })
      )}
      {noFeed ? (
        <div {...stylex.props(styles.noFeed)}>
          이번 주는 공개된 일기가 아직 없어요
        </div>
      ) : null}
    </div>
  );
};

export default Top10Feed;

import { useEffect, useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import API from '../services';
import Feed from './Feed';

const Top10Feed = () => {
  const [top10Datas, setTop10Datas] = useState();
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
      const res = await API.get('/shared/diaries/popular').then(
        res => res.data,
      );

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
    } catch (err) {
      console.log('top 10 error', err);
    }
  };

  useEffect(() => {
    getDiaryApi();
  }, []);

  return (
    <div className="slider-container">
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
    </div>
  );
};

export default Top10Feed;

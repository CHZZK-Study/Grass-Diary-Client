import * as stylex from '@stylexjs/stylex';
import Header from '../../components/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import API from '../../services';

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
});

const feed = stylex.create({
  box: {
    backgroundColor: '#EAEAEA',
    borderRadius: '20px',
    margin: '10px',
    padding: '20px 30px',
    width: '360px',
    height: '440px',
    ':hover': {
      transform: 'scale(1.02)',
    },
    transition: '0.3s',
    overflow: 'hidden',
  },
  like: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'flex-end',
  },
  header: {
    display: 'flex',
  },
  img: {
    width: '40px',
    height: '40px',
    objectFit: 'cover',
    borderRadius: '50%',
  },
  name: {
    lineHeight: '40px',
    marginLeft: '10px',
    fontSize: '13px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '600',
    margin: '20px 0',
  },
  content: {
    height: '300px',
    lineHeight: '27px',
    overflow: 'hidden',
  },
});

const Feed = ({ likeCount, link, title, content, name, profile }) => {
  return (
    <Link to={link}>
      <article {...stylex.props(feed.box)}>
        <div {...stylex.props(feed.like)}>
          <span>
            <i className="fa-solid fa-heart"></i>
          </span>
          <span>{likeCount}</span>
        </div>
        <div {...stylex.props(feed.header)}>
          <img {...stylex.props(feed.img)} src={profile}></img>
          <div {...stylex.props(feed.name)}>{name}</div>
        </div>

        <div {...stylex.props(feed.title)}>{title}</div>
        <div {...stylex.props(feed.content)}>
          {content && content.length > 350
            ? `${content.slice(0, 350)}...`
            : content}
        </div>
      </article>
    </Link>
  );
};
const PauseOnHover = ({ getProfileApi }) => {
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

const Share = () => {
  const [cursorId, setCursorId] = useState(922337203685477600);
  const [latestDatas, setLatestDatas] = useState([]);
  const target = useRef();

  const getProfileApi = async memberId => {
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
        res.map(async data => {
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
      } else {
        console.log('불러올 데이터가 없습니다.');
      }
    } catch (err) {
      console.log('latest error', err);
    }
  };

  const callback = async ([entry]) => {
    if (entry.isIntersecting) {
      getApi();
    }
  };

  useEffect(() => {
    if (latestDatas.length === 0) {
      window.scrollTo(0, 0);
    }

    const observer = new IntersectionObserver(callback, { threshold: 1 });
    observer.observe(target.current);

    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [latestDatas]);

  return (
    <>
      <Header />
      <div {...stylex.props(styles.container)}>
        <section>
          <div {...stylex.props(styles.top10Title)}>🏆 이번 주 TOP 10</div>
          <PauseOnHover getProfileApi={getProfileApi} />
        </section>

        <div>
          <div {...stylex.props(styles.latestTitle)}>
            우리들의 다채로운 하루를 들어보세요
          </div>
          <div {...stylex.props(styles.latestFeed)}>
            {latestDatas?.map(data => {
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
          </div>
          <div ref={target} {...stylex.props(styles.observer)}></div>
        </div>
      </div>
    </>
  );
};

export default Share;

import * as stylex from '@stylexjs/stylex';
import Header from '../../components/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

const styles = stylex.create({
  container: {
    height: '100vh',
    margin: 'auto',
    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
  },
  topWrapper: {
    width: '100%',
  },
  topTitle: {
    fontSize: '26px',
    fontWeight: '600',
    marginTop: '40px',
  },
  feedContainer: {
    position: 'relative',
    display: 'flex',
    height: '440px',
    margin: '20px 0',
  },
  dragFeed: {
    display: 'flex',
    flexShrink: 0,
    transition: '1s',
  },
  scollBar: {
    width: '342px',
    height: '2px',
    position: 'absolute',
    bottom: 0,
    left: 0,
    backgroundColor: '#000000',
  },
  normalWrapper: {
    marginTop: '80px',
  },
  normalTitle: {
    fontSize: '18px',
    fontWeight: '500',
  },
  normalContainer: {
    margin: '38px 0',
  },
});

const feed = stylex.create({
  box: {
    position: 'relative',
    flexShrink: 0,
    width: '360px',
    height: '440px',
    backgroundColor: '#EAEAEA',
    borderRadius: '20px 20px 0px 0px',
    marginRight: '20px',
    transition: '0.3s',
    // ':hover': {
    //   transform: 'scale(1.02)',
    //   transformOrigin: 'bottom',
    // },
    userSelect: 'none',
  },
  likeContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: '10px 18px',
    display: 'flex',
  },
  like: {
    marginRight: '5px',
  },
  likeCount: {
    margin: 'auto 0',
    fontSize: '13px',
    fontWeight: 'bold',
  },
  content: {
    height: '500px',
    padding: '30px',
  },
});

const Top10Feed = () => {
  return (
    <div {...stylex.props(feed.box)}>
      <span {...stylex.props(feed.likeContainer)}>
        <span {...stylex.props(feed.like)}>
          <i className="fa-solid fa-heart"></i>
        </span>
        <span {...stylex.props(feed.likeCount)}>100</span>
      </span>
      <div {...stylex.props(feed.likeCount)}></div>
      <div {...stylex.props(feed.content)}>일기 피드 내용</div>
    </div>
  );
};

function MultipleItems() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Top10Feed />
        <Top10Feed />
        <Top10Feed />
        <Top10Feed />
        <Top10Feed />
        <Top10Feed />
        <Top10Feed />
        <Top10Feed />
        <Top10Feed />
        <Top10Feed />
      </Slider>
    </div>
  );
}

const Feed = () => {
  return (
    <div {...stylex.props(feed.box)}>
      <div {...stylex.props(feed.content)}>일기 피드 내용</div>
    </div>
  );
};

const Share = () => {
  return (
    <>
      <Header />
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.topWrapper)}>
          <div {...stylex.props(styles.topTitle)}>🏆 이번 주 TOP 10</div>
          {/* <div {...stylex.props(styles.feedContainer)}>
            <div {...stylex.props(styles.dragFeed)}>
              <Top10Feed likeCount={'100'} />
              <Top10Feed likeCount={'80'} />
              <Top10Feed likeCount={'70'} />
              <Top10Feed likeCount={'60'} />
              <Top10Feed likeCount={'50'} />
              <Top10Feed likeCount={'40'} />
              <Top10Feed likeCount={'30'} />
              <Top10Feed likeCount={'20'} />
              <Top10Feed likeCount={'10'} />
              <Top10Feed likeCount={'00'} />
            </div>
            <div {...stylex.props(styles.scollBar)}></div> */}
          <MultipleItems />
        </div>
        {/* </div> */}

        <div {...stylex.props(styles.normalWrapper)}>
          <div {...stylex.props(styles.normalTitle)}>
            우리들의 다채로운 하루를 들어보세요
          </div>
          <div {...stylex.props(styles.feedContainer, styles.normalContainer)}>
            <Feed />
            <Feed />
            <Feed />
          </div>
          <div {...stylex.props(styles.feedContainer, styles.normalContainer)}>
            <Feed />
            <Feed />
            <Feed />
          </div>
          <div {...stylex.props(styles.feedContainer, styles.normalContainer)}>
            <Feed />
            <Feed />
            <Feed />
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;

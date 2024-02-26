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
});

const slider = stylex.create({
  box: {
    backgroundColor: '#EAEAEA',
    borderRadius: '20px 20px 0px 0px',
    margin: '10px',
    padding: '20px',
    width: '360px',
    height: '440px',
    ':hover': {
      transform: 'scale(1.02)',
    },
    transition: '0.3s',
  },
  like: {
    display: 'flex',
    gap: '5px',
    justifyContent: 'flex-end',
  },
});

const Feed = ({ likeCount }) => {
  return (
    <div>
      <article {...stylex.props(slider.box)}>
        <div {...stylex.props(slider.like)}>
          <span>
            <i className="fa-solid fa-heart"></i>
          </span>
          <span>{likeCount}</span>
        </div>
        <div>일기 내용</div>
      </article>
    </div>
  );
};

function PauseOnHover() {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Feed likeCount={1} />
        <Feed likeCount={2} />
        <Feed likeCount={3} />
        <Feed likeCount={4} />
        <Feed likeCount={5} />
        <Feed likeCount={6} />
        <Feed likeCount={7} />
        <Feed likeCount={8} />
        <Feed likeCount={9} />
        <Feed likeCount={10} />
      </Slider>
    </div>
  );
}

const Share = () => {
  return (
    <>
      <Header />
      <div {...stylex.props(styles.container)}>
        <section>
          <div {...stylex.props(styles.top10Title)}>🏆 이번 주 TOP 10</div>
          <PauseOnHover />
        </section>

        <div>
          <div {...stylex.props(styles.latestTitle)}>
            우리들의 다채로운 하루를 들어보세요
          </div>
          <div {...stylex.props(styles.latestFeed)}>
            <Feed />
            <Feed />
            <Feed />
            <Feed />
            <Feed />
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

import * as stylex from '@stylexjs/stylex';
import Header from '../../components/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';

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

const Feed = ({ likeCount, link }) => {
  return (
    <Link to={link}>
      <article {...stylex.props(slider.box)}>
        <div {...stylex.props(slider.like)}>
          <span>
            <i className="fa-solid fa-heart"></i>
          </span>
          <span>{likeCount}</span>
        </div>
        <div>일기 내용</div>
      </article>
    </Link>
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
        <Feed likeCount={1} link={'/diary/view'} />
        <Feed likeCount={2} link={'/diary/view'} />
        <Feed likeCount={3} link={'/diary/view'} />
        <Feed likeCount={4} link={'/diary/view'} />
        <Feed likeCount={5} link={'/diary/view'} />
        <Feed likeCount={6} link={'/diary/view'} />
        <Feed likeCount={7} link={'/diary/view'} />
        <Feed likeCount={8} link={'/diary/view'} />
        <Feed likeCount={9} link={'/diary/view'} />
        <Feed likeCount={10} link={'/diary/view'} />
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
            <Feed link={'/diary/view'} />
            <Feed link={'/diary/view'} />
            <Feed link={'/diary/view'} />
            <Feed link={'/diary/view'} />
            <Feed link={'/diary/view'} />
            <Feed link={'/diary/view'} />
            <Feed link={'/diary/view'} />
            <Feed link={'/diary/view'} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;

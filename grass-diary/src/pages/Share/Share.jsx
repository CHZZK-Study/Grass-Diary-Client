import * as stylex from '@stylexjs/stylex';
import Header from '../../components/Header';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

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

const Feed = ({ likeCount, link, title, content }) => {
  return (
    <Link to={link}>
      <article {...stylex.props(feed.box)}>
        <div {...stylex.props(feed.like)}>
          <span>
            <i className="fa-solid fa-heart"></i>
          </span>
          <span>{likeCount}</span>
        </div>
        <div {...stylex.props(feed.title)}>{title}</div>
        <div {...stylex.props(feed.content)}>
          {content && content.length > 420
            ? `${content.slice(0, 425)}...`
            : content}
        </div>
      </article>
    </Link>
  );
};

function PauseOnHover() {
  useEffect(() => {
    axios
      .get('http://localhost:8080/api/diary/1')
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  const title = '일기 제목';
  const content =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil suscipit corporis quibusdam quas. Aspernatur aperiam aut aliquid maiores expedita repudiandae deleniti quisquam corrupti neque illo facilis, rerum voluptatum, nsecessitatibus quo.Lorem ipsum dolor sitamet consectetur adipisicing elit. Nihil suscipit corporis quibusdam  quas. Aspernatur aperiam aut aliquid maiores expedita repudiandae deleniti quisquam corrupti neque illo facilis, rerum voluptatum, elit.Nihil suscipit corporis quibusdam  quas. Aspernatur aperiam aut aliquid maiores expedita repudiandae deleniti quisquam corrupti neque illo facilis, rerum voluptatum, elit.';

  return (
    <div className="slider-container">
      <Slider {...settings}>
        <Feed
          likeCount={1}
          link={'/diary/view'}
          title={title}
          content={content}
        />
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
  const title = '일기 제목';
  const content =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil suscipit corporis quibusdam quas. Aspernatur aperiam aut aliquid maiores expedita repudiandae deleniti quisquam corrupti neque illo facilis, rerum voluptatum, nsecessitatibus quo.Lorem ipsum dolor sitamet consectetur adipisicing elit. Nihil suscipit corporis quibusdam  quas. Aspernatur aperiam aut aliquid maiores expedita repudiandae deleniti quisquam corrupti neque illo facilis, rerum voluptatum, elit.Nihil suscipit corporis quibusdam  quas. Aspernatur aperiam aut aliquid maiores expedita repudiandae deleniti quisquam corrupti neque illo facilis, rerum voluptatum, elit.';
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
            <Feed link={'/diary/view'} title={title} content={content} />
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

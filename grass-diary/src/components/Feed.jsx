import * as stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import NormalLike from './normalLike';

const feed = stylex.create({
  box: {
    display: 'inline-block',
    backgroundColor: '#F9F9F9',
    boxShadow: `rgba(149, 157, 165, 0.2) 2px 2px 4px`,
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
        <NormalLike likeCount={likeCount} justifyContent={'flex-end'} />
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

export default Feed;

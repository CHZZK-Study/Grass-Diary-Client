import * as stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

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
  const createMarkup = htmlContent => {
    return { __html: DOMPurify.sanitize(htmlContent) };
  };

  const processedContent =
    content && content.length > 350 ? `${content.slice(0, 350)}...` : content;

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
        <div
          {...stylex.props(feed.content)}
          dangerouslySetInnerHTML={createMarkup(processedContent)}
        />
      </article>
    </Link>
  );
};

export default Feed;

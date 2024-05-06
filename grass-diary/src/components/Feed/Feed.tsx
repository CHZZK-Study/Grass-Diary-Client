import stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import { NormalLike } from '@components/index';
import { useWriterProfile } from '@hooks/useWriterProfile';

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
    margin: '18px 0',
  },
  content: {
    height: '260px',
    lineHeight: '27px',
    overflow: 'hidden',
  },
});

interface propsType {
  likeCount: number;
  link: string;
  createdAt: string;
  content: string;
  name: string;
  memberId: number;
}

const Feed = ({
  likeCount,
  link,
  createdAt,
  content,
  name,
  memberId,
}: propsType) => {
  const { data: writer } = useWriterProfile(memberId);

  const title =
    `${createdAt.slice(2, 4)}년 ` +
    `${createdAt.slice(5, 7)}월 ` +
    `${createdAt.slice(8, 10)}일`;

  const extractTextFromHTML = (htmlString: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');

    return doc.body.textContent || '';
  };

  const textWithoutTags = () => {
    if (content && content.length > 210) {
      return `${extractTextFromHTML(content).slice(0, 210)}...`;
    }
    return extractTextFromHTML(content);
  };

  return (
    <Link to={link}>
      <article {...stylex.props(feed.box)}>
        <NormalLike likeCount={likeCount} justifyContent={'flex-end'} />
        <div {...stylex.props(feed.header)}>
          <img {...stylex.props(feed.img)} src={writer?.profileImageURL}></img>
          <div {...stylex.props(feed.name)}>{name}</div>
        </div>

        <div {...stylex.props(feed.title)}>{title}</div>
        <div {...stylex.props(feed.content)}>{textWithoutTags()}</div>
      </article>
    </Link>
  );
};

export default Feed;

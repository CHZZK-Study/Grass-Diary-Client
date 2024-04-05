import stylex from '@stylexjs/stylex';

const feed = stylex.create({
  like: justifyContent => ({
    display: 'flex',
    gap: '15px',
    justifyContent: justifyContent,
  }),
});

const NormalLike = ({ likeCount, justifyContent }) => {
  return (
    <div {...stylex.props(feed.like(justifyContent))}>
      <span>
        <i className="fa-solid fa-heart"></i>
      </span>
      <span>{likeCount}</span>
    </div>
  );
};

export default NormalLike;

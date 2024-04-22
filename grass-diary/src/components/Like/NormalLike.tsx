import stylex from '@stylexjs/stylex';

const feed = stylex.create({
  like: (justifyContent: string) => ({
    display: 'flex',
    gap: '15px',

    justifyContent,
  }),
});

interface INormalLike {
  likeCount: number;
  justifyContent: string;
}

const NormalLike = ({ likeCount, justifyContent }: INormalLike) => {
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

import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';

const pushLike = stylex.keyframes({
  '0%': { fontSize: '19px' },
  '50%': { fontSize: '24px' },
  '80%': { fontSize: '18px' },
  '100%': { fontSize: '20px' },
});

const pushDislike = stylex.keyframes({
  '0%': { fontSize: '18px' },
  '50%': { fontSize: '24px' },
  '80%': { fontSize: '18px' },
  '100%': { fontSize: '20px' },
});

const styles = stylex.create({
  likeContainer: {
    margin: 'auto 10px',
    fontSize: '20px',

    cursor: 'pointer',
  },
  dislike: {
    animationName: pushDislike,
    animationDuration: '0.5s',
  },
  like: {
    color: 'red',
    animationName: pushLike,
    animationDuration: '0.5s',
  },
  count: {
    margin: 'auto 10px auto 0 ',
    fontSize: '15px',
    fontWeight: '600',
  },
});

const Like = ({ likeCount }) => {
  const [like, setlike] = useState(false);

  const clickLike = e => {
    setlike(current => !current);
  };

  return (
    <>
      <div {...stylex.props(styles.likeContainer)}>
        {like ? (
          <span {...stylex.props(styles.like)}>
            <i onClick={clickLike} className="fa-solid fa-heart"></i>
          </span>
        ) : (
          <span {...stylex.props(styles.dislike)}>
            <i onClick={clickLike} className="fa-regular fa-heart"></i>
          </span>
        )}
      </div>
      <span {...stylex.props(styles.count)}>{likeCount}</span>
    </>
  );
};

export default Like;

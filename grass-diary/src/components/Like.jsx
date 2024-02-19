import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';

const pushLike = stylex.keyframes({
  '0%': { transform: 'scale(0.9)' },
  '50%': { transform: 'scale(1.2)' },
  '80%': { transform: 'scale(0.9)' },
  '100%': { transform: 'scale(1)' },
});

const pushDislike = stylex.keyframes({
  '0%': { transform: 'scale(0.8)' },
  '50%': { transform: 'scale(1.2)' },
  '80%': { transform: 'scale(0.9)' },
  '100%': { transform: 'scale(1)' },
});

const styles = stylex.create({
  likeContainer: {
    width: '30px',
    height: '40px',
    lineHeight: '40px',
    fontSize: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  dislike: {
    animationName: pushDislike,
    animationDuration: '0.5s',
  },
  like: {
    animationName: pushLike,
    animationDuration: '0.5s',
    color: 'red',
  },
});

const Like = () => {
  const [like, setlike] = useState(false);

  const clickLike = e => {
    setlike(current => !current);
  };
  return (
    <div {...stylex.props(styles.likeContainer)}>
      {like ? (
        <div {...stylex.props(styles.like)}>
          <i onClick={clickLike} className="fa-solid fa-heart"></i>
        </div>
      ) : (
        <div {...stylex.props(styles.dislike)}>
          <i onClick={clickLike} className="fa-regular fa-heart"></i>
        </div>
      )}
    </div>
  );
};

export default Like;

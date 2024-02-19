import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';

const styles = stylex.create({
  likeContainer: {
    width: '30px',
    height: '40px',
    lineHeight: '40px',
    fontSize: '20px',
    textAlign: 'center',
    cursor: 'pointer',
  },
  like: {
    transition: '1s',
    color: '#ff0000',
  },
});

const Like = () => {
  const [like, setlike] = useState(false);

  const clickLike = () => {
    setlike(current => !current);
  };
  return (
    <div {...stylex.props(styles.likeContainer)}>
      {like ? (
        <div {...stylex.props(styles.like)}>
          <i onClick={clickLike} className="fa-solid fa-heart"></i>
        </div>
      ) : (
        <i onClick={clickLike} className="fa-regular fa-heart"></i>
      )}
    </div>
  );
};

export default Like;

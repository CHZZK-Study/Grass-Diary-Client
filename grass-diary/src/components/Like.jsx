import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import API from '../services';

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

const Like = ({ likeCount, setLikeCount }) => {
  const [initLike, setInitLike] = useState(false); // true이면 이미 누른 견적 있음. delete 가능 false => 한번도 누르지 않음 post 가능
  const [like, setlike] = useState(false); // ture=> 하트 눌려있는 상태. delete 가능 상태, false => 하트 안눌린 상태. post 가능 상태

  const clickLike = () => {
    if (like) {
      API.delete(`/diary/like/22/1`)
        .then(() => {
          setlike(false);
          setLikeCount(prev => (prev -= 1));
          console.log('좋아요 취소');
        })
        .catch(err => {
          console.log('like delete error', err);
        });
    } else {
      API.post(`/diary/like/22/1`)
        .then(() => {
          setlike(true);
          setLikeCount(prev => (prev += 1));
          console.log('좋아요');
        })
        .catch(err => console.log('like post error', err));
    }
  };

  useEffect(() => {
    if (initLike) {
      // 첫 렌더링 시, ture 누른 견적 있음. delete 가능
      setlike(true);
    } else {
      // 첫 렌더링 시, false 한번도 누르지 않음 post 가능
      setlike(false);
    }
  }, []);

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

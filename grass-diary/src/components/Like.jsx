import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import API from '../services';

const beat1 = stylex.keyframes({
  '0%': { transform: 'scale(0.8)' },
  '50%': { transform: 'scale(1.2)' },
  '80%': { transform: 'scale(0.9)' },
  '100%': { transform: 'scale(1.0)' },
});

const beat2 = stylex.keyframes({
  '0%': { transform: 'scale(0.9)' },
  '50%': { transform: 'scale(1.2)' },
  '80%': { transform: 'scale(0.9)' },
  '100%': { transform: 'scale(1.0)' },
});

const styles = stylex.create({
  likeContainer: {
    display: 'flex',
    width: '35px',
    justifyContent: 'space-between',
    textAlign: 'center',
    margin: '0px 10px',
    cursor: 'pointer',
    gap: '5px',
  },
  heart: {
    width: '20px',
    height: '40px',
    lineHeight: '40px',
    animationName: beat1,
    animationDuration: '0.5s',
  },
  like: {
    animationName: beat2,
    color: 'red',
  },
  count: {
    fontSize: '15px',
    lineHeight: '40px',
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
          <div {...stylex.props(styles.heart, styles.like)}>
            <i onClick={clickLike} className="fa-solid fa-heart"></i>
          </div>
        ) : (
          <div {...stylex.props(styles.heart)}>
            <i onClick={clickLike} className="fa-regular fa-heart"></i>
          </div>
        )}
        <div {...stylex.props(styles.count)}>{likeCount}</div>
      </div>
    </>
  );
};

export default Like;

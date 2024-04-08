import stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import API from '@services';
import useUser from '@recoil/user/useUser';

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
    margin: '0px 15px',
    cursor: 'pointer',
    gap: '10px',
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
    lineHeight: '40px',
    fontWeight: '600',
  },
});

const Like = ({ diaryId, likeCount, setLikeCount, liked }) => {
  const [canLike, setCanLike] = useState(false); // ture=> 하트 눌려있는 상태. delete 가능 상태, false => 하트 안눌린 상태. post 가능 상태
  const { memberId } = useUser();

  const clickLike = () => {
    if (canLike) {
      API.post(`/diary/like/${diaryId}/${memberId}`)
        .then(() => {
          setCanLike(false);
          setLikeCount(prev => (prev += 1));
        })
        .catch(error =>
          console.error(`사용자 좋아요 정보를 불러올 수 없습니다. ${error}`),
        );
    } else {
      API.delete(`/diary/like/${diaryId}/${memberId}`)
        .then(() => {
          setCanLike(true);
          setLikeCount(prev => (prev -= 1));
        })
        .catch(error => {
          console.error(`사용자의 좋아요 정보를 삭제할 수 없습니다. ${error}`);
        });
    }
  };

  useEffect(() => {
    if (liked) {
      // 첫 렌더링 시, ture 누른 적 있음. delete 가능
      setCanLike(false);
    } else {
      // 첫 렌더링 시, false 한번도 누르지 않음 post 가능
      setCanLike(true);
    }
  }, [liked]);

  return (
    <>
      <div {...stylex.props(styles.likeContainer)}>
        {!canLike ? (
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

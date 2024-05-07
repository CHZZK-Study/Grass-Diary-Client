import stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import useUser from '@recoil/user/useUser';
import { useCountLike } from '@hooks/useCountLike';

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

interface ILike {
  diaryId: string | undefined;
  likeCount: number;
  setLikeCount: React.Dispatch<React.SetStateAction<number>>;
  liked: boolean | undefined;
}

const Like = ({ diaryId, likeCount, setLikeCount, liked }: ILike) => {
  const [isRed, setIsRed] = useState(false);
  const { memberId } = useUser();
  const { postLike, deleteLike, postSuccess, deleteSuccess } = useCountLike({
    diaryId,
    memberId,
  });

  useEffect(() => {
    if (postSuccess) {
      setIsRed(true);
      setLikeCount(prev => (prev += 1));
    }
  }, [postSuccess]);

  useEffect(() => {
    if (deleteSuccess) {
      setIsRed(false);
      setLikeCount(prev => (prev -= 1));
    }
  }, [deleteSuccess]);

  useEffect(() => {
    liked ? setIsRed(true) : setIsRed(false);
  }, [liked]);

  return (
    <>
      <div {...stylex.props(styles.likeContainer)}>
        {isRed ? (
          <div {...stylex.props(styles.heart, styles.like)}>
            <i onClick={() => deleteLike()} className="fa-solid fa-heart"></i>
          </div>
        ) : (
          <div {...stylex.props(styles.heart)}>
            <i onClick={() => postLike()} className="fa-regular fa-heart"></i>
          </div>
        )}
        <div {...stylex.props(styles.count)}>{likeCount}</div>
      </div>
    </>
  );
};

export default Like;

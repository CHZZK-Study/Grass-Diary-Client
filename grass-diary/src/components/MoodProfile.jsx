import { useState, useMemo } from 'react';
import Profile from './Profile';
import stylex from '@stylexjs/stylex';
import EMOJI from '../constants/emoji';

const styles = stylex.create({
  emoji: {
    fontSize: '22px',
    zIndex: '1',
    position: 'relative',
    transform: 'translate(-19px, 33px)',
  },
});

const MoodProfile = ({ diary, index }) => {
  const [mood, setMood] = useState([]);

  useMemo(() => {
    const moods = [];

    for (let i = 0; i < diary.length; i++) {
      let mood = diary[i].transparency.toString()[2] - 1;
      let randomIndex = Math.floor(Math.random() * 3);

      moods.push(EMOJI[mood][randomIndex]);
    }

    setMood(moods);
  }, [diary]);

  return (
    <>
      <Profile width="60px" height="60px" />
      <div {...stylex.props(styles.emoji)}>{mood[index]}</div>
    </>
  );
};

export default MoodProfile;

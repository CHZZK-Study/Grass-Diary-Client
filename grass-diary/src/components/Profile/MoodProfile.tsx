import stylex from '@stylexjs/stylex';
import { useState, useMemo } from 'react';
import { Profile } from '@components/index';
import EMOJI from '@constants/emoji';

const styles = stylex.create({
  emoji: {
    fontSize: '22px',
    zIndex: '1',
    position: 'relative',
    transform: 'translate(-19px, 33px)',
  },
});

const MoodProfile = ({ diary, index }: IMoodProfile) => {
  const [mood, setMood] = useState<string[]>([]);

  useMemo(() => {
    const moods: string[] = [];

    for (let i = 0; i < diary.length; i++) {
      let diaryMood: string = diary[i].transparency!.toString()[2];
      moods.push(EMOJI[diaryMood]);
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

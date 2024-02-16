import * as stylex from '@stylexjs/stylex';
import { useRef } from 'react';

import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import Like from '../../components/Like';
import Title from './Title';
import Content from './Content';

const styles = stylex.create({
  wrap: {
    background: '#F9F9F9',
    width: '100vw',
    margin: 'auto',
    border: '1px solid #BFBFBF',
    borderRadius: '50px 50px 0 0',
    padding: '65px 100px 0 100px',

    maxWidth: '1200px',
  },
  feelBackground: {
    marginLeft: '20px',
    width: '40px',
    height: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    border: '1px solid #BFBFBF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feel: {
    width: '34px',
    height: '34px',
    borderRadius: '50%',
    backgroundColor: '#D2FBBF',
  },
  diaryFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '36px',
  },
});

const Diary = () => {
  const title = '11월 11일 목요일';
  const time = '23:01';
  const privateOrPubilc = '비공개';
  const hashTag = '#해시태그';
  const content = '오늘은 스터디 회의가 있는 날이었다.';

  return (
    <>
      <Header />
      <div {...stylex.props(styles.wrap)}>
        <BackButton />
        <Title title={title} time={time} privateOrPubilc={privateOrPubilc} />
        <Content hashTag={hashTag} content={content} />

        <div {...stylex.props(styles.diaryFooter)}>
          <Like />
          <div {...stylex.props(styles.feelBackground)}>
            <div {...stylex.props(styles.feel)}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diary;

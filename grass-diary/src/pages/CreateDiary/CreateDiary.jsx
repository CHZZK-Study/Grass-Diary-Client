import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import QuillEditor from './QuillEditor';
import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
dayjs.locale('ko');

const CreateDiaryStyle = stylex.create({
  container: {
    background: '#F9F9F9',
    width: '100vw',
    margin: 'auto',
    border: '1px solid #BFBFBF',
    borderRadius: '50px 50px 0 0',
    padding: '65px 100px',
    maxWidth: '1200px',
  },

  title: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
  },

  borderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '100px',
  },

  inputStyle: {
    backgroundColor: 'white',
    border: 'solid 1px #BFBFBF',
    borderRadius: '10px',
    padding: '20px',
    width: '700px',
    height: '50px',
    outline: 'none',
    resize: 'none',
  },

  btnStyle: {
    backgroundColor: {
      default: 'white',
      ':hover': 'black',
    },
    color: {
      default: 'black',
      ':hover': 'white',
    },
    padding: '10px 50px',
    border: 'solid 1px #bfbfbf',
    borderRadius: '10px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },

  todayMood: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CreateDiary = () => {
  const [inputValue, setInputValue] = useState('');
  const [isPrivate, setIsPrivate] = useState(true);
  const [moodValue, setMoodValue] = useState(5);
  const emoticons = [
    '😠',
    '😕',
    '😐',
    '🙂',
    '😀',
    '😄',
    '😊',
    '🤗',
    '😍',
    '🥳',
    '🎉',
  ];

  const selectedEmoticon = emoticons[moodValue];

  const currentDate = dayjs();
  const currentMonth = currentDate.format('M');
  const currentDay = currentDate.format('DD');
  const currentDDay = currentDate.format('ddd');

  const handlePrivateChange = () => {
    setIsPrivate(true);
    console.log('비공개');
  };

  const handlePublicChange = () => {
    setIsPrivate(false);
    console.log('공개');
  };

  const handleMoodChange = e => {
    setMoodValue(parseInt(e.target.value));
  };

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  return (
    <>
      <header>
        <Header />
      </header>
      <main {...stylex.props(CreateDiaryStyle.container)}>
        <BackButton link={'/main'} />
        <section {...stylex.props(CreateDiaryStyle.title)}>
          <h2>
            {currentMonth}월 {currentDay}일 {currentDDay}요일
          </h2>
        </section>
        <section>
          <article {...stylex.props(CreateDiaryStyle.subtitle)}>
            <label>
              <input
                type="radio"
                value="private"
                checked={isPrivate}
                onChange={handlePrivateChange}
              />
              비공개
              <input
                type="radio"
                value="public"
                checked={!isPrivate}
                onChange={handlePublicChange}
              />
              공개
            </label>
            <div {...stylex.props(CreateDiaryStyle.todayMood)}>
              <div style={{ fontSize: '30px' }}>{selectedEmoticon}</div>
              <div>오늘의 기분</div>
              <input
                type="range"
                name="todayMood"
                min="0"
                max="10"
                list="values"
                value={moodValue}
                onChange={handleMoodChange}
              />
              <datalist id="values">
                <option value="0" label="0"></option>
                <option value="2" label="2"></option>
                <option value="4" label="4"></option>
                <option value="6" label="6"></option>
                <option value="8" label="8"></option>
                <option value="10" label="10"></option>
              </datalist>
            </div>
          </article>
        </section>
        <QuillEditor />
        <section>
          <article {...stylex.props(CreateDiaryStyle.borderFooter)}>
            <input
              {...stylex.props(CreateDiaryStyle.inputStyle)}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder={inputValue ? '' : '#해시태그'}
            />
            <button {...stylex.props(CreateDiaryStyle.btnStyle)}>저장</button>
          </article>
        </section>
      </main>
    </>
  );
};

export default CreateDiary;

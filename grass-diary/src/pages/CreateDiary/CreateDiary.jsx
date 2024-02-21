import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';

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
  },

  border: {
    backgroundColor: 'white',
    border: 'solid 1px #BFBFBF',
    borderRadius: '10px',
    height: '1000px',
  },

  borderLine: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: '5px',
    borderBottom: 'solid 1px #bfbfbf',
    margin: 0,
    padding: '20px',
  },

  borderContent: {
    padding: '20px',
  },

  borderFooter: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: '50px',
  },

  textAreaStyle: {
    width: '950px',
    height: '850px',
    border: 'none',
    outline: 'none',
    resize: 'none',
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
});

const CreateDiary = () => {
  const [textValue, setTextValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = e => {
    setInputValue(e.target.value);
  };

  const handleTextChange = e => {
    setTextValue(e.target.value);
  };

  return (
    <>
      <header>
        <h1>Nav</h1>
      </header>
      <main {...stylex.props(CreateDiaryStyle.container)}>
        <section {...stylex.props(CreateDiaryStyle.title)}>
          <h2>11월 11일 목요일</h2>
        </section>
        <section>
          <article {...stylex.props(CreateDiaryStyle.subtitle)}>
            <label>
              <input type="checkbox" />
              비공개
              <input type="checkbox" />
              공개
            </label>
            <p>오늘의 기분</p>
          </article>
        </section>
        <section>
          <article {...stylex.props(CreateDiaryStyle.border)}>
            <p {...stylex.props(CreateDiaryStyle.borderLine)}>
              <i className="fa-regular fa-image"></i> 사진
            </p>
            <p {...stylex.props(CreateDiaryStyle.borderContent)}>
              <textarea
                {...stylex.props(CreateDiaryStyle.textAreaStyle)}
                type="text"
                value={textValue}
                onChange={handleTextChange}
                placeholder={textValue ? '' : '오늘 잠은 얼마나 잤나요?'}
              />
            </p>
          </article>
        </section>
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

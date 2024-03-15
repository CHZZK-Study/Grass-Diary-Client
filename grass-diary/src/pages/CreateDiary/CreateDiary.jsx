import * as stylex from '@stylexjs/stylex';
import { useEffect, useState } from 'react';
import Header from '../../components/Header';
import Swal from 'sweetalert2';
import BackButton from '../../components/BackButton';
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
    padding: '30px',
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

  imgBtn: {
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },

  todayMood: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CreateDiary = () => {
  const [textValue, setTextValue] = useState('');
  const [inputValue, setInputValue] = useState('');

  const [todayQuestion, setTodayQuestion] = useState();
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

  const token = localStorage.getItem('accessToken');
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/api/main/todayInfo', config)
      .then(response => {
        setTodayQuestion(response.data.todayQuestion);
      })
      .catch(error => {
        console.log('오늘의 질문 에러', error);
      });
  }, []);

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

  const handleTextChange = e => {
    setTextValue(e.target.value);
  };

  const imageUpload = async () => {
    const { value: file } = await Swal.fire({
      confirmButtonColor: '#28CA3B',
      confirmButtonText: '확인',
      title: '사진 선택',
      input: 'file',
      inputAttributes: {
        accept: 'image/*',
        'aria-label': 'Upload your profile picture',
      },
    });
    if (file) {
      const reader = new FileReader();
      reader.onload = e => {
        Swal.fire({
          confirmButtonColor: '#28CA3B',
          confirmButtonText: '확인',
          imageUrl: e.target.result,
          imageAlt: 'The uploaded picture',
        });
      };
      reader.readAsDataURL(file);
    }
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
        <section>
          <article {...stylex.props(CreateDiaryStyle.border)}>
            <p {...stylex.props(CreateDiaryStyle.borderLine)}>
              <button
                onClick={imageUpload}
                {...stylex.props(CreateDiaryStyle.imgBtn)}
              >
                <i className="fa-regular fa-image"></i> 사진
              </button>
            </p>
            <p {...stylex.props(CreateDiaryStyle.borderContent)}>
              <textarea
                {...stylex.props(CreateDiaryStyle.textAreaStyle)}
                type="text"
                value={textValue}
                onChange={handleTextChange}
                placeholder={textValue ? '' : todayQuestion}
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

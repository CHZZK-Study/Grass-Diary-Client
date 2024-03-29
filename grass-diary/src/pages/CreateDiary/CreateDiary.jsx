import * as stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../../services';
import Header from '../../components/Header';
import BackButton from '../../components/BackButton';
import QuillEditor from './QuillEditor';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import EMOJI from '../../constants/emoji';
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

  hashtag: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    paddingTop: '20px',
  },

  hashtagBox: {
    // backgroundColor: {
    //   default: 'white',
    //   ':hover': 'black',
    // },
    // color: {
    //   default: 'black',
    //   ':hover': 'white',
    // },
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    padding: '10px 15px',
    border: 'solid 1px #bfbfbf',
    borderRadius: '30px',
    fontSize: '15px',
    fontWeight: 'bold',
    transition: 'all 0.3s ease',
  },

  hashtagBtn: {
    // color: {
    //   default: 'black',
    //   ':hover': 'white',
    // },
    background: 'none',
    border: 'none',
    fontSize: '12px',
    cursor: 'pointer',
  },
});

const CreateDiary = () => {
  const navigate = useNavigate();

  const [hashtag, setHashtag] = useState('');
  const [hashArr, setHashArr] = useState([]);
  const [quillContent, setQuillContent] = useState(null);
  const [isPrivate, setIsPrivate] = useState(true);
  const [moodValue, setMoodValue] = useState(5);

  const selectedEmoticon = EMOJI[moodValue];
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

  const onChangeHashtag = e => {
    setHashtag(e.target.value);
  };

  const addHashtag = e => {
    // Enter키 또는 Space키가 눌렸을 때
    if (
      (e.key === 'Enter' || e.key === ' ') &&
      hashtag.trim() !== '' &&
      hashArr.length < 15
    ) {
      // 새로운 해시태그를 배열에 추가
      setHashArr(prev => [...prev, hashtag.trim()]);
      // 입력 필드 초기화
      setHashtag('');
    }
  };

  // 해시태그를 배열에서 제거하는 함수
  const removeHashtag = index => {
    setHashArr(prev => prev.filter((_, i) => i !== index));
  };

  const [diaryInfo, setDiaryInfo] = useState({
    hashArr: [],
    moodValue: 5,
    currentMonth: '',
    currentDay: '',
    currentDDay: '',
    quillContent: '',
    isPrivate: true,
  });

  useEffect(() => {
    setDiaryInfo(prevState => ({
      ...prevState,
      hashArr,
      moodValue,
      quillContent,
      currentMonth: currentDate.format('M'),
      currentDay: currentDate.format('DD'),
      currentDDay: currentDate.format('ddd'),
      isPrivate,
    }));
  }, [hashArr, moodValue, quillContent, isPrivate]);

  const handleSave = async () => {
    const memberId = 1; // 실제 멤버 ID로 대체
    const { quillContent, isPrivate, hashArr, moodValue } = diaryInfo;

    const requestBody = {
      content: quillContent,
      isPrivate,
      conditionLevel: `LEVEL_${moodValue}`,
      hashtags: hashArr,
      month: currentMonth,
      date: currentDay,
      day: currentDDay,
    };

    if (!quillContent || !quillContent.trim()) {
      Swal.fire({
        title: '일기를 작성해주세요!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#28CA3B',
        confirmButtonText: '확인',
      });
      return; // 저장 중단
    }

    try {
      const response = await API.post(`/diary/${memberId}`, requestBody);
      console.log(response.data);
      navigate('/share');
    } catch (error) {
      console.error(error);
    }
    console.log(requestBody);
  };
  console.log(diaryInfo);

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
                min="1"
                max="9"
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
        <QuillEditor onContentChange={setQuillContent} />
        <section>
          <article {...stylex.props(CreateDiaryStyle.borderFooter)}>
            <input
              {...stylex.props(CreateDiaryStyle.inputStyle)}
              type="text"
              value={hashtag}
              onChange={onChangeHashtag}
              onKeyUp={addHashtag}
              placeholder={hashtag ? '' : '#해시태그'}
            />
            <button
              onClick={handleSave}
              {...stylex.props(CreateDiaryStyle.btnStyle)}
            >
              저장
            </button>
          </article>
          <div {...stylex.props(CreateDiaryStyle.hashtag)}>
            {hashArr.map((tag, index) => (
              <span key={index} {...stylex.props(CreateDiaryStyle.hashtagBox)}>
                {tag}
                <button
                  {...stylex.props(CreateDiaryStyle.hashtagBtn)}
                  onClick={() => removeHashtag(index)}
                >
                  X
                </button>
              </span>
            ))}
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateDiary;

import stylex from '@stylexjs/stylex';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';
import QuillEditor from './QuillEditor';

import API from '@services/index';
import useUser from '@recoil/user/useUser';
import { Header, BackButton, Button } from '@components/index';
import EMOJI from '@constants/emoji';
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
    background: 'none',
    border: 'none',
    fontSize: '12px',
    cursor: 'pointer',
  },
});

type HashTag = string;
type MoodValue = number;

type DiaryInfo = {
  hashArr: HashTag[];
  moodValue: MoodValue;
  currentMonth: string;
  currentDay: string;
  currentDDay: string;
  quillContent: string | null;
  isPrivate: boolean;
};

const CreateDiary: React.FC = () => {
  const { id: diaryId } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [hashtag, setHashtag] = useState<string>('');
  const [hashArr, setHashArr] = useState<HashTag[]>([]);
  const [quillContent, setQuillContent] = useState<string | null>(null);
  const [isPrivate, setIsPrivate] = useState<boolean>(true);
  const [moodValue, setMoodValue] = useState<MoodValue>(5);

  const selectedEmoticon = EMOJI[moodValue];
  const currentDate = dayjs();
  const currentMonth: string = currentDate.format('M');
  const currentDay: string = currentDate.format('DD');
  const currentDDay: string = currentDate.format('ddd');

  const handlePrivateChange = () => {
    setIsPrivate(true);
  };

  const handlePublicChange = () => {
    setIsPrivate(false);
  };

  const handleMoodChange = e => {
    setMoodValue(parseInt(e.target.value));
  };

  const onChangeHashtag = e => {
    setHashtag(e.target.value);
  };

  // 해시태그 로직 함수
  const addHashtag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const inputText = (e.target as HTMLInputElement).value.trim();
      const validCharsPattern = /[가-힣A-Za-z0-9]+/g;

      const matches = inputText.match(validCharsPattern);
      if (matches && matches.length > 0 && hashArr.length < 15) {
        const hashtagText = matches.join('');
        setHashArr(prev => [...prev, hashtagText]);
        setHashtag('');
      }
    }
  };

  // 해시태그를 배열에서 제거하는 함수
  const removeHashtag = (index: number) => {
    setHashArr(prev => prev.filter((_, i) => i !== index));
  };

  const [diaryInfo, setDiaryInfo] = useState<DiaryInfo>({
    hashArr: [],
    moodValue: 0,
    currentMonth: '',
    currentDay: '',
    currentDDay: '',
    quillContent: null,
    isPrivate: false,
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

  const checkWritingPermission = () => {
    const lastWritingDate = localStorage.getItem('lastWritingDate');
    const currentDate = dayjs().format('DD/MM/YYYY');

    if (lastWritingDate === currentDate) {
      return false;
    }
    return true;
  };

  const { memberId } = useUser();

  const handleSave = async () => {
    if (!checkWritingPermission()) {
      Swal.fire({
        title: '하루에 한 번만 쓸 수 있어요!',
        icon: 'warning',
        showCancelButton: false,
        confirmButtonColor: '#28CA3B',
        confirmButtonText: '확인',
      });
      return;
    }

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
      if (diaryId) {
        await API.patch(`/diary/${diaryId}`, requestBody);
        navigate(`/diary/${diaryId}`, { replace: true, state: 'editcomplete' });
      } else {
        await API.post(`/diary/${memberId}`, requestBody);
        navigate('/share');
      }
    } catch (error) {
      console.error(error);
    }
    const currentDate = dayjs().format('DD/MM/YYYY');
    localStorage.setItem('lastWritingDate', currentDate);
  };

  // 수정 기능일 때의 코드

  type Tag = {
    id: number;
    tag: string;
  };

  const fetchDiaryData = async () => {
    try {
      if (diaryId) {
        const response = await API.get(`/diary/${diaryId}`);
        const tags = response.data.tags.map((tag: Tag) => tag.tag);

        setHashArr(tags);
        setIsPrivate(response.data.isPrivate);
        setMoodValue(response.data.transparency * 10);
        setQuillContent(response.data.content);
      }
    } catch (error) {
      console.error(`사용자의 일기 정보를 불러올 수 없습니다. ${error}`);
    }
  };

  useEffect(() => {
    fetchDiaryData();
  }, []);

  return (
    <>
      <header>
        <Header />
      </header>
      <main {...stylex.props(CreateDiaryStyle.container)}>
        <BackButton goBackTo={'/main'} />
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
        <QuillEditor
          onContentChange={setQuillContent}
          quillContent={quillContent}
        />
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
            <Button
              text="저장"
              width="120px"
              defaultColor="#2d2d2d"
              hoverColor="#FFF"
              defaultBgColor="#FFFFFF"
              hoverBgColor="#111111"
              border="1px solid #bfbfbf"
              onClick={handleSave}
            />
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

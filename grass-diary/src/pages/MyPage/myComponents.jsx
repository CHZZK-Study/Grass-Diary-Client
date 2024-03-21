import stylex from '@stylexjs/stylex';
import styles from './style';
import { useState, useEffect, useMemo } from 'react';

import Like from '../../components/Like';
import Button from '../../components/Button';
import diaryImage from '../../assets/icon/diaryImage.png';
import basicProfile from '../../assets/icon/basicProfile.png';
import API from '../../services';
import useUser from '../../hooks/useUser';

const Container = ({ children }) => {
  return <div {...stylex.props(styles.container)}>{children}</div>;
};

const MainContainer = () => {
  const [toggleButton, setToggleButton] = useState('나의 일기장');

  const handleToggleButton = buttonName => {
    setToggleButton(buttonName);
  };

  return (
    <div {...stylex.props(styles.mainContainer)}>
      <div {...stylex.props(styles.profileSection)}>
        <Profile />
        <ToggleButton
          buttonLabel={toggleButton}
          handleToggleButton={handleToggleButton}
        />
      </div>
      <div {...stylex.props(styles.mainSection)}>
        <SearchBar />
        {toggleButton === '나의 일기장' ? (
          <Diary />
        ) : (
          <p>현재 교환 일기가 없습니다.</p>
        )}
      </div>
    </div>
  );
};

const ToggleButton = ({ buttonLabel, handleToggleButton }) => {
  const buttonLabels = ['나의 일기장', '교환 일기장'];

  return (
    <div {...stylex.props(styles.profileToggle)}>
      {buttonLabels.map(label => (
        <button
          {...stylex.props(
            buttonLabel === label ? styles.toggleButton : styles.basicButton,
          )}
          onClick={() => handleToggleButton(label)}
          key={label}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const memberId = useUser();

  useEffect(() => {
    if (memberId) {
      API.get(`/member/profile/${memberId}`)
        .then(response => {
          setProfile(response.data);
        })
        .catch(error => {
          console.error(`사용자 프로필을 조회할 수 없습니다. ${error}`);
        });
    }
  }, [memberId]);

  return (
    <div {...stylex.props(styles.profileDetails)}>
      <div {...stylex.props(styles.profileLeft)}>
        <img
          {...stylex.props(styles.profileImage)}
          src={
            profile.profileImageURL !== null
              ? profile.profileImageURL
              : basicProfile
          }
        ></img>
        <div>
          <Button
            text="교환 일기 신청"
            width="150px"
            color="#000"
            backgroundColor="#FFFFFF"
            border="2px solid #929292"
          />
        </div>
      </div>
      <div {...stylex.props(styles.profileRight)}>
        <div {...stylex.props(styles.nameSection)}>
          <span>{profile.nickName}</span>
        </div>
        <Grass />
        <div>
          <span>
            {profile.profileIntro !== null
              ? profile.profileIntro
              : '소개글입니다.'}
          </span>
        </div>
      </div>
    </div>
  );
};

const Grass = () => {
  const [selectedCell, setSelectedCell] = useState(null);

  const startDate = new Date(2024, 0, 1);
  const endDate = new Date(2024, 11, 31);
  const oneDay = 24 * 60 * 60 * 1000;
  const length = Math.round(Math.abs((endDate - startDate) / oneDay)) + 1;

  const data = Array.from({ length }, (_, i) => {
    const date = new Date(startDate.getTime() + i * oneDay);

    return {
      date: `${date.getMonth() + 1}/${date.getDate()}`,
    };
  });

  const handleClick = date => {
    setSelectedCell(date);
  };

  return (
    <div {...stylex.props(styles.grassContainer)}>
      <table {...stylex.props(styles.grass)}>
        <tbody>
          {Array.from({ length: 7 }, (_, i) => (
            <tr key={i}>
              {data.slice(i * 52, (i + 1) * 52).map((item, j) => (
                <td
                  onClick={() => handleClick(item.date)}
                  key={j}
                  {...stylex.props(
                    styles.grassDate(
                      item.date === selectedCell ? '1px solid black' : 'none',
                    ),
                  )}
                ></td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <span>2024</span>
    </div>
  );
};

const SearchBar = () => {
  return (
    <div {...stylex.props(styles.searchSection)}>
      <div {...stylex.props(styles.searchIcon)}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input
        {...stylex.props(styles.searchBar)}
        placeholder="일기 검색하기"
      ></input>
    </div>
  );
};

const Diary = () => {
  const [diaryList, setDiaryList] = useState([]);
  const [mood, setMood] = useState([]);
  const memberId = useUser();

  const emoji = [
    ['🤯', '🤬', '😭'],
    ['👿', '😡', '🤢'],
    ['😵‍💫', '😱', '🤕'],
    ['😰', '😢', '😤'],
    ['😕', '🤔', '🙄'],
    ['😌', '🙂', '😶'],
    ['😊', '😀', '🫢'],
    ['🤗', '😃', '😆'],
    ['🤣', '😆', '😍'],
  ];

  useEffect(() => {
    if (memberId) {
      API.get(`/diary/main/${memberId}`)
        .then(response => {
          setDiaryList(response.data.content);
        })
        .catch(error => {
          console.log(`사용자의 일기를 조회할 수 없습니다. ${error}`);
        });
    }
  }, [memberId]);

  useMemo(() => {
    const moods = [];

    for (let i = 0; i < diaryList.length; i++) {
      let mood = diaryList[i].transparency.toString()[2] - 1;
      let randomIndex = Math.floor(Math.random() * 3);
      moods.push(emoji[mood][randomIndex]);
    }

    setMood(moods);
  }, [diaryList]);

  return (
    <div {...stylex.props(styles.diaryList)}>
      {diaryList.map((diary, index) => (
        <div {...stylex.props(styles.diary)} key={index}>
          <div {...stylex.props(styles.smallProfileSection)}>
            <img
              {...stylex.props(styles.smallProfile)}
              src={basicProfile}
            ></img>
            <div {...stylex.props(styles.emoji)}>{mood[index]}</div>
            <div {...stylex.props(styles.smallDetailes)}>
              <span {...stylex.props(styles.name)}>{diary.createdDate}</span>
              <span {...stylex.props(styles.time)}>{diary.createdAt}</span>
            </div>
          </div>
          <div {...stylex.props(styles.diaryContent)}>
            <span {...stylex.props(styles.hashtag)}>{diary.tags}</span>
            <span>{diary.content}</span>
            <img src={diaryImage}></img>
          </div>
          <div {...stylex.props(styles.likeSection)}>
            <Like />
            <span>{diary.likeCount}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export { Container, MainContainer };

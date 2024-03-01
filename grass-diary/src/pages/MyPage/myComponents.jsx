import stylex from '@stylexjs/stylex';
import styles from './style';
import { useState } from 'react';

import Like from '../../components/Like';
import Button from '../../components/Button';
import profile from '../../assets/icon/profile.jpeg';
import diaryImage from '../../assets/icon/diaryImage.png';

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
  return (
    <div {...stylex.props(styles.profileDetails)}>
      <div {...stylex.props(styles.profileLeft)}>
        <img {...stylex.props(styles.profileImage)} src={profile}></img>
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
          <span>홍길동</span>
        </div>
        <Grass />
        <div>
          <span>소개글입니다</span>
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
  return (
    <div {...stylex.props(styles.diaryList)}>
      <div {...stylex.props(styles.diary)}>
        <div {...stylex.props(styles.smallProfileSection)}>
          <img {...stylex.props(styles.smallProfile)} src={profile}></img>
          <div {...stylex.props(styles.smallDetailes)}>
            <span {...stylex.props(styles.name)}>2023년 3월 1일</span>
            <span {...stylex.props(styles.time)}>02:38</span>
          </div>
        </div>
        <div {...stylex.props(styles.diaryContent)}>
          <span {...stylex.props(styles.hashtag)}>#해시태그</span>
          <span>임시 내용</span>
          <img src={diaryImage}></img>
        </div>
        <div {...stylex.props(styles.likeSection)}>
          <Like />
          <span>3</span>
        </div>
      </div>
    </div>
  );
};

export { Container, MainContainer };

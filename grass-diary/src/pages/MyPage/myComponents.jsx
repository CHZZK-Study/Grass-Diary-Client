import stylex from '@stylexjs/stylex';
import styles from './style';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Grass from './Grass';
import Diary from './Diary';
import Button from '@components/Button';
import { EllipsisBox, EllipsisIcon } from '@components/Ellipsis';
import Profile from '@components/Profile';
import useProfile from '@hooks/useProfile';

const Container = ({ children }) => {
  return <div {...stylex.props(styles.container)}>{children}</div>;
};

const MainContainer = () => {
  const navigate = useNavigate();

  const [toggleButton, setToggleButton] = useState('나의 일기장');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [selectedDiary, setSelectedDiary] = useState([]);

  const handleToggleButton = buttonName => {
    setToggleButton(buttonName);
  };

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sortQuery = params.get('sort');

    if (sortQuery) setSortOrder(sortQuery);
  }, [window.location.search]);

  const handleSortChange = order => {
    setSortOrder(order);
    navigate(`?sort=${order}`);
  };

  return (
    <div {...stylex.props(styles.mainContainer)}>
      <div {...stylex.props(styles.profileSection)}>
        <ProfileSection setSelectedDiary={setSelectedDiary} />
        <ToggleButton
          buttonLabel={toggleButton}
          handleToggleButton={handleToggleButton}
        />
      </div>
      <div {...stylex.props(styles.mainSection)}>
        <SearchBar onSearchChange={handleSearchChange} />
        <SortButton onSortChange={handleSortChange} />
        {toggleButton === '나의 일기장' ? (
          <Diary
            searchTerm={searchTerm}
            sortOrder={sortOrder}
            selectedDiary={selectedDiary}
          />
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

const ProfileSection = ({ setSelectedDiary }) => {
  const { nickname, profileIntro } = useProfile();

  const modal = () => {
    Swal.fire({
      title: '교환 일기장',
      text: '교환 일기 서비스를 준비중이에요',
      imageUrl: '/public/img/mainCharacter.png',
      imageWidth: 300,
      imageHeight: 300,
      imageAlt: 'Custom image',
      confirmButtonColor: '#28CA3B',
      confirmButtonText: '확인',
    });
  };

  return (
    <div {...stylex.props(styles.profileDetails)}>
      <div {...stylex.props(styles.profileLeft)}>
        <Profile width="200px" height="200px" />
        <div>
          <Button
            text="교환 일기 신청"
            width="150px"
            color="#000"
            backgroundColor="#FFFFFF"
            border="2px solid #929292"
            marginTop="25px"
            onClick={modal}
          />
        </div>
      </div>
      <div {...stylex.props(styles.profileRight)}>
        <div {...stylex.props(styles.nameSection)}>
          <span>{nickname}</span>
        </div>
        <Grass setSelectedDiary={setSelectedDiary} />
        <div>
          <span>{profileIntro !== null ? profileIntro : '소개글입니다.'}</span>
        </div>
      </div>
    </div>
  );
};

const SearchBar = ({ onSearchChange }) => {
  return (
    <div {...stylex.props(styles.searchSection)}>
      <div {...stylex.props(styles.searchIcon)}>
        <i className="fa-solid fa-magnifying-glass"></i>
      </div>
      <input
        {...stylex.props(styles.searchBar)}
        placeholder="일기 검색하기"
        onChange={onSearchChange}
      ></input>
    </div>
  );
};

const SortButton = ({ onSortChange }) => {
  return (
    <div {...stylex.props(styles.sortContainer)}>
      <EllipsisIcon width="170" translateValue="145px">
        <EllipsisBox
          onClick={() => onSortChange('latest')}
          text="최신 순으로 보기"
        />
        <EllipsisBox
          onClick={() => onSortChange('oldest')}
          text="오래된 순으로 보기"
        />
      </EllipsisIcon>
    </div>
  );
};

export { Container, MainContainer };

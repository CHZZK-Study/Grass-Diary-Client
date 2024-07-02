import stylex from '@stylexjs/stylex';
import styles from './style';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Grass from './Grass';
import Diary from './Diary';
import useProfile from '@recoil/profile/useProfile';
import mainCharacter from '@icon/mainCharacter.png';
import { Button, EllipsisBox, EllipsisIcon, Profile } from '@components/index';

const MainContainer = () => {
  const navigate = useNavigate();

  const [toggleButton, setToggleButton] = useState<string>('나의 일기장');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('latest');
  const [selectedDiary, setSelectedDiary] = useState<IDiary | undefined>(
    undefined,
  );

  const handleToggleButton = (buttonName: string) => {
    setToggleButton(buttonName);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sortQuery = params.get('sort');

    if (sortQuery) setSortOrder(sortQuery);
  }, [window.location.search]);

  const handleSortChange = (order: string) => {
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

interface IToggleButton {
  buttonLabel: string;
  handleToggleButton: (label: string) => void;
}

const ToggleButton = ({ buttonLabel, handleToggleButton }: IToggleButton) => {
  const buttonLabels: string[] = ['나의 일기장', '교환 일기장'];

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

interface IProfileSection {
  setSelectedDiary: React.Dispatch<React.SetStateAction<IDiary | undefined>>;
}

const ProfileSection = ({ setSelectedDiary }: IProfileSection) => {
  const { nickName, profileIntro } = useProfile();

  const modal = () => {
    Swal.fire({
      title: '교환 일기장',
      text: '교환 일기 서비스를 준비중이에요',
      imageUrl: mainCharacter,
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
            defaultColor="#2d2d2d"
            hoverColor="#FFF"
            defaultBgColor="#FFFFFF"
            hoverBgColor="#111111"
            border="1px solid #929292"
            marginTop="25px"
            onClick={modal}
          />
        </div>
      </div>
      <div {...stylex.props(styles.profileRight)}>
        <div {...stylex.props(styles.nameSection)}>
          <span>{nickName}</span>
        </div>
        <Grass setSelectedDiary={setSelectedDiary} />
        <div>
          <span>{profileIntro !== '' ? profileIntro : '소개글입니다.'}</span>
        </div>
      </div>
    </div>
  );
};

interface ISearchBar {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ onSearchChange }: ISearchBar) => {
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

interface ISortButton {
  onSortChange: (sortOrder: string) => void;
}

const SortButton = ({ onSortChange }: ISortButton) => {
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

export { MainContainer };

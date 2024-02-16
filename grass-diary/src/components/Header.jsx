import * as stylex from '@stylexjs/stylex';
import testImg from '../assets/icon/profile.jpeg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const header = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100vw',
    height: '80px',
    padding: '0 50px',
    maxWidth: '1200px',
    margin: 'auto',
  },
  userMenu: {
    zIndex: '1',
    position: 'relative',
    marginLeft: 'auto',
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer',
  },
  profile: {
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    objectFit: 'cover',
    marginRight: '20px',
  },
});

const menuBar = stylex.create({
  container: {
    position: 'absolute',
    top: '60px',
    right: '-10px',
    width: '200px',
    padding: '20px',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: '15px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
  },
  box: {
    height: '40px',
    lineHeight: '40px',
    fontSize: '13px',
    paddingLeft: '20px',
  },
});

const MenuBar = () => {
  return (
    <div {...stylex.props(menuBar.container)}>
      <ul>
        <Link to="/">
          <li {...stylex.props(menuBar.box)}>마이페이지</li>
        </Link>
        <Link to="/">
          <li {...stylex.props(menuBar.box)}>설정</li>
        </Link>
        <Link to="/">
          <li {...stylex.props(menuBar.box)}>로그아웃</li>
        </Link>
      </ul>
    </div>
  );
};

const Header = () => {
  const [menuButton, setMenuButton] = useState(false);

  const dropDown = () => {
    setMenuButton(current => !current);
  };

  return (
    <div {...stylex.props(header.container)}>
      <span>잔디일기</span>
      <div {...stylex.props(header.userMenu)} onClick={dropDown}>
        <img {...stylex.props(header.profile)} src={testImg} alt="profile" />
        {menuButton ? (
          <i className="fa-solid fa-angle-up"></i>
        ) : (
          <i className="fa-solid fa-angle-down"></i>
        )}
        {menuButton ? <MenuBar /> : ''}
      </div>
    </div>
  );
};

export default Header;

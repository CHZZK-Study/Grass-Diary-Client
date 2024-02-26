import * as stylex from '@stylexjs/stylex';
import testImg from '../assets/icon/profile.jpeg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const header = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 20px',
    height: '80px',
    margin: 'auto',
    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
  },
  logo: {
    fontSize: '18px',
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
  arrowUp: {
    transition: '0.5s',
  },
  arrowDown: {
    transform: 'scaleY(-1)',
  },
});

const menuBar = stylex.create({
  container: {
    position: 'absolute',
    top: '62px',
    right: '-20px',
    width: '150px',
    height: '0',
    backgroundColor: 'white',
    justifyContent: 'center',
    borderRadius: '15px',
    boxShadow: 'rgba(100, 100, 111, 0.2) 0px 7px 29px 0px',
    overflow: 'hidden',
    transition: '0.5s',
  },
  toggle: {
    height: '180px',
  },
  box: {
    height: '40px',
    lineHeight: '40px',
    margin: '15px 25px',
    color: {
      default: '#000000',
      ':hover': '#28B91C',
    },
    transition: '0.2s',
  },
  span: {
    marginLeft: '10px',
    fontSize: '14px',
  },
});

const MenuBar = ({ toggle }) => {
  return (
    <div {...stylex.props(menuBar.container, toggle && menuBar.toggle)}>
      <Link to="/">
        <div {...stylex.props(menuBar.box)}>
          <i className="fa-regular fa-user"></i>
          <span {...stylex.props(menuBar.span)}>마이페이지</span>
        </div>
      </Link>
      <Link to="/">
        <div {...stylex.props(menuBar.box)}>
          <i className="fa-solid fa-gear"></i>
          <span {...stylex.props(menuBar.span)}>설정</span>
        </div>
      </Link>
      <Link to="/">
        <div {...stylex.props(menuBar.box)}>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
          <span {...stylex.props(menuBar.span)}>로그아웃</span>
        </div>
      </Link>
    </div>
  );
};

const Header = () => {
  const [toggle, setToggle] = useState(false);

  const dropDown = () => {
    setToggle(current => !current);
  };

  return (
    <div {...stylex.props(header.container)}>
      <span {...stylex.props(header.logo)}>잔디일기</span>
      <div {...stylex.props(header.userMenu)} onClick={dropDown}>
        <img {...stylex.props(header.profile)} src={testImg} alt="profile" />
        <div {...stylex.props(header.arrowUp, toggle && header.arrowDown)}>
          <i className="fa-solid fa-angle-down"></i>
        </div>
        <MenuBar toggle={toggle} />
      </div>
    </div>
  );
};

export default Header;

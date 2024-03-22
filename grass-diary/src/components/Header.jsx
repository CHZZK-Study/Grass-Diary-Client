import * as stylex from '@stylexjs/stylex';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Profile from './Profile';
import { clearAuth } from '../utils/authUtils';
import useUser from '../hooks/useUser';

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
    cursor: 'pointer',
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
  arrowUp: {
    paddingLeft: '15px',
    transition: '0.5s',
  },
  arrowDown: {
    paddingLeft: '15px',
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

const MenuBar = ({ toggle, headerRef }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/');
  };

  return (
    <div
      ref={headerRef}
      {...stylex.props(menuBar.container, toggle && menuBar.toggle)}
    >
      <Link to="/mypage">
        <div {...stylex.props(menuBar.box)}>
          <i className="fa-regular fa-user"></i>
          <span {...stylex.props(menuBar.span)}>마이페이지</span>
        </div>
      </Link>
      <Link to="/setting">
        <div {...stylex.props(menuBar.box)}>
          <i className="fa-solid fa-gear"></i>
          <span {...stylex.props(menuBar.span)}>설정</span>
        </div>
      </Link>
      <div {...stylex.props(menuBar.box)} onClick={handleLogout}>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
        <span {...stylex.props(menuBar.span)}>로그아웃</span>
      </div>
    </div>
  );
};

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const headerRef = useRef();
  const iconRef = useRef();
  const profileRef = useRef();
  const memberId = useUser();

  const dropDown = () => {
    setToggle(current => !current);
  };

  useEffect(() => {
    const closeToggle = e => {
      if (
        toggle &&
        !headerRef.current.contains(e.target) &&
        !iconRef.current.contains(e.target) &&
        !profileRef.current.contains(e.target)
      )
        setToggle(false);
    };

    document.addEventListener('click', closeToggle);

    return () => document.removeEventListener('click', closeToggle);
  }, [toggle]);

  return (
    <div {...stylex.props(header.container)}>
      <Link to="/main">
        <span {...stylex.props(header.logo)}>잔디일기</span>
      </Link>
      {memberId ? (
        <div {...stylex.props(header.userMenu)} onClick={dropDown}>
          <div ref={profileRef}>
            <Profile width="44px" height="44px" />
          </div>
          <div
            {...stylex.props(header.arrowUp, toggle && header.arrowDown)}
            ref={iconRef}
          >
            <i className="fa-solid fa-angle-down"></i>
          </div>
          <MenuBar headerRef={headerRef} toggle={toggle} />
        </div>
      ) : null}
    </div>
  );
};

export default Header;

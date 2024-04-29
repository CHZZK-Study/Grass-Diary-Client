import stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

import { Profile } from '@components/index';
import useLogout from '@hooks/useLogout';
import useUser from '@recoil/user/useUser';

const header = stylex.create({
  container: (position?: string) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px 20px',

    width: {
      default: '1140px',
      '@media (max-width: 1139px)': '100vw',
    },
    zIndex: '10',

    position,
  }),

  itemWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '100%',
  },

  logo: {
    cursor: 'pointer',
    fontSize: '22px',
    fontWeight: '500',
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
    height: '240px',
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
    marginLeft: '15px',
    fontSize: '14px',
  },
});

interface IMenuBar {
  toggle: boolean;
  headerRef: React.RefObject<HTMLDivElement>;
}

const MenuBar = ({ toggle, headerRef }: IMenuBar) => {
  const clearAuth = useLogout();

  const handleLogout = () => {
    clearAuth();
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
      <Link to="/share">
        <div {...stylex.props(menuBar.box)}>
          <i className="fa-solid fa-users"></i>
          <span {...stylex.props(menuBar.span)}>일기 피드</span>
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

type THeader = {
  position?: string;
  margin?: string;
};

const Header = ({ position, margin }: THeader) => {
  const [toggle, setToggle] = useState(false);
  const headerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { memberId } = useUser();

  const dropDown = () => {
    setToggle(current => !current);
  };

  useEffect(() => {
    const closeToggle = (e: MouseEvent) => {
      if (
        toggle &&
        headerRef.current &&
        iconRef.current &&
        profileRef.current
      ) {
        if (
          !headerRef.current.contains(e.target as HTMLElement) &&
          !iconRef.current.contains(e.target as HTMLElement) &&
          !profileRef.current.contains(e.target as HTMLElement)
        )
          setToggle(false);
      }
    };

    document.addEventListener('click', closeToggle);

    return () => document.removeEventListener('click', closeToggle);
  }, [memberId, toggle]);

  return (
    <div {...stylex.props(header.container(position, margin))}>
      <div {...stylex.props(header.itemWrapper)}>
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
    </div>
  );
};

export default Header;

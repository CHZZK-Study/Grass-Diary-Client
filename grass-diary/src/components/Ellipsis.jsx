import * as stylex from '@stylexjs/stylex';
import { useState, useRef, useEffect } from 'react';

const ellipsis = stylex.create({
  ellipsis: {
    position: 'relative',
  },
  icon: {
    zIndex: '1',
    position: 'relative',
    cursor: 'pointer',
  },
  container: translateValue => ({
    position: 'absolute',
    top: '-8px',
    width: '136px',
    border: '1px solid #BFBFBF',
    borderRadius: '20px',
    backgroundColor: '#ffffff',
    transform: `translate(-${translateValue})`,
  }),
  box: {
    height: '36px',
    fontSize: '13px',
    textAlign: 'center',
    lineHeight: '36px',
    borderBottom: {
      default: '1px solid #BFBFBF',
      ':last-child': 'none',
    },
  },
});

const EllipsisBox = ({ onClick, text }) => {
  return (
    <div onClick={onClick} {...stylex.props(ellipsis.box)}>
      {text}
    </div>
  );
};

const EllipsisIcon = ({ children, translateValue }) => {
  const [open, setOpen] = useState(false);
  const ellisisRef = useRef(null);
  const iconRef = useRef(null);

  const clickEvent = () => {
    setOpen(current => !current);
  };

  useEffect(() => {
    const closeEllispis = e => {
      if (
        open &&
        !ellisisRef.current.contains(e.target) &&
        !iconRef.current.contains(e.target)
      )
        setOpen(false);
    };

    document.addEventListener('click', closeEllispis);

    return () => document.removeEventListener('click', closeEllispis);
  }, [open]);

  return (
    <div {...stylex.props(ellipsis.ellipsis)}>
      <span ref={iconRef} onClick={clickEvent} {...stylex.props(ellipsis.icon)}>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </span>

      {open && (
        <div
          ref={ellisisRef}
          {...stylex.props(ellipsis.container(translateValue))}
        >
          <div {...stylex.props(ellipsis.box)}></div>
          {children}
        </div>
      )}
    </div>
  );
};

export { EllipsisIcon, EllipsisBox };

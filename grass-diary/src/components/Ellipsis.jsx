import stylex from '@stylexjs/stylex';
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
  container: (width, translateValue) => ({
    position: 'absolute',
    top: '-8px',
    width: `${width}px`,
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
    cursor: 'pointer',
    color: {
      default: '#000',
      ':hover': '#BFBFBF',
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

const EllipsisIcon = ({ children, width, translateValue }) => {
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
          {...stylex.props(ellipsis.container(width, translateValue))}
        >
          <div {...stylex.props(ellipsis.box)}></div>
          {children}
        </div>
      )}
    </div>
  );
};

export { EllipsisIcon, EllipsisBox };

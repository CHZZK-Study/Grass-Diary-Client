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

interface IEllipsisBox {
  onClick: () => void;
  text: string;
}

interface IEllipsisIcon {
  children: React.ReactNode;
  width: string;
  translateValue: string;
}

const EllipsisBox = ({ onClick, text }: IEllipsisBox) => {
  return (
    <div onClick={onClick} {...stylex.props(ellipsis.box)}>
      {text}
    </div>
  );
};

const EllipsisIcon = ({ children, width, translateValue }: IEllipsisIcon) => {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const clickEvent = () => {
    setOpen(current => !current);
  };

  useEffect(() => {
    const closeEllispis = (event: MouseEvent) => {
      if (open && boxRef.current && iconRef.current) {
        if (
          !boxRef.current.contains(event.target as HTMLElement) &&
          !iconRef.current.contains(event.target as HTMLElement)
        )
          setOpen(false);
      }
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
          ref={boxRef}
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

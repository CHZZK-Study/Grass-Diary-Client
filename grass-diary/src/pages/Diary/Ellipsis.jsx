import * as stylex from '@stylexjs/stylex';
import { useState } from 'react';

const styles = stylex.create({
  ellipsis: {
    zIndex: '1',
    position: 'relative',
  },
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '136px',
    border: '1px solid #BFBFBF',
    borderRadius: '20px',
    transform: 'translate(15px, -8px)',
    backgroundColor: '#ffffff',
  },
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

const Open = () => {
  return (
    <>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.box)}></div>
        <div {...stylex.props(styles.box)}>수정</div>
        <div {...stylex.props(styles.box)}>삭제</div>
      </div>
    </>
  );
};

const Ellipsis = () => {
  const [open, setOpen] = useState(false);

  const clickEllipsis = () => {
    setOpen(current => !current);
  };
  return (
    <div>
      {open ? <Open /> : null}
      <div onClick={clickEllipsis} {...stylex.props(styles.ellipsis)}>
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
    </div>
  );
};

export default Ellipsis;

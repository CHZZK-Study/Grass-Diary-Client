import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  background: {
    zIndex: '2',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: 'rgba( 0, 0, 0, 0.3 )',
    cursor: 'auto',
  },
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '30px 20px',
  },
  close: {
    textAlign: 'right',
    cursor: 'pointer',
  },
});

const UnmodifyModal = ({ setShowModal }) => {
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div {...stylex.props(styles.background)}>
      <div {...stylex.props(styles.container)}>
        <div onClick={closeModal} {...stylex.props(styles.close)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <span>
          일기는 <br />
          당일 6:00 ~ 다음 날 05:59까지 수정 가능합니다.{' '}
        </span>
      </div>
    </div>
  );
};

export default UnmodifyModal;

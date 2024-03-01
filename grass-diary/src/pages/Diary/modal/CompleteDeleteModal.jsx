import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  background: {
    zIndex: '1',
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
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '20px',
    textAlign: 'center',
  },
  close: {
    float: 'right',
    cursor: 'pointer',
    fontSize: '18px',
    color: '#bdbdbd',
  },
  text: {
    margin: '30px 10px',
  },
  bold: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
});

const CompleteDeleteModal = ({ show }) => {
  const closeModal = () => show(false);

  return (
    <div {...stylex.props(styles.background)}>
      <div {...stylex.props(styles.container)}>
        <div onClick={closeModal} {...stylex.props(styles.close)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
        <div {...stylex.props(styles.text)}>
          <span {...stylex.props(styles.bold)}>
            <i className="fa-solid fa-circle-check"></i> 일기가 삭제되었습니다
          </span>
        </div>
      </div>
    </div>
  );
};

export default CompleteDeleteModal;

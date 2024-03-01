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
    padding: '15px 25px',
    textAlign: 'center',
  },
  text: {
    margin: '30px 10px',
  },
  bold: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  ie: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '13px',
  },
  button: {
    width: '50px',
    height: '30px',
    backgroundColor: '#ffffff',
    border: '1px solid #bdbdbd',
    borderRadius: '10px',
    cursor: 'pointer',
    ':hover': {
      backgroundColor: '#28CA3B',
      color: '#ffffff',
      border: 'none',
    },
    transition: '0.3s',
  },
});

const ConfirmDeleteModal = ({ show, setDelete }) => {
  const closeModal = () => show(false);

  const deleteDiary = () => {
    setDelete();
    show(false);
  };
  return (
    <div {...stylex.props(styles.background)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.text)}>
          <span {...stylex.props(styles.bold)}>⚠ 일기를 삭제하시겠습니까?</span>
          <br />
          <div {...stylex.props(styles.ie)}>
            <button onClick={closeModal} {...stylex.props(styles.button)}>
              취소
            </button>
            <button onClick={deleteDiary} {...stylex.props(styles.button)}>
              삭제
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

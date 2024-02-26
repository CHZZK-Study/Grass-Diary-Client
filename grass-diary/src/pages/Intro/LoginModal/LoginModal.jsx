import stylex from '@stylexjs/stylex';
import googleButton from '../../../assets/loginButton/googleButton.png';

const styles = stylex.create({
  container: {
    display: 'flex',
    justifyContent: 'center',

    position: 'absolute',
    top: '0',
    left: '0',

    width: '100vw',
    height: '300vh',

    backgroundColor: '#ffffff78',
  },

  modal: {
    display: 'flex',
    flexDirection: 'column',

    position: 'fixed',
    top: '20rem',

    width: '31.5rem',
    height: '18.5rem',

    borderRadius: '0.3rem',

    boxShadow: '0 2px 12px 0 rgba(9, 8, 8, 0.1)',
    backgroundColor: '#FFF',

    gap: '0.6rem',
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: '3.75rem',
    padding: '1.2rem',

    borderBottom: '1px solid #d1d1d1',
  },

  xButton: {
    fontSize: '1.8rem',
    cursor: 'pointer',

    border: 'none',
    backgroundColor: 'transparent',
  },

  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    height: 'calc(100% - 6.5rem)',
  },

  button: {
    border: 'none',
    backgroundColor: 'transparent',

    cursor: 'pointer',
  },

  buttonImage: {
    width: '21.5rem',
    height: '4.35rem',

    borderRadius: '0.6rem',
    objectFit: 'cover',
  },

  switchText: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const LoginModal = ({ isOpen, isClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div {...stylex.props(styles.container)} onClick={isClose}>
      <div {...stylex.props(styles.modal)}>
        <div {...stylex.props(styles.modalHeader)}>
          <span>회원가입 및 로그인</span>
          <button {...stylex.props(styles.xButton)} onClick={isClose}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div {...stylex.props(styles.modalContent)}>
          <button {...stylex.props(styles.button)}>
            <img {...stylex.props(styles.buttonImage)} src={googleButton}></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;

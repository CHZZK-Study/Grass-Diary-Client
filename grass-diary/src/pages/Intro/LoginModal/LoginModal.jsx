import stylex from '@stylexjs/stylex';
import { useState } from 'react';
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
    top: '300px',

    width: '500px',
    height: '300px',

    borderRadius: '5px',

    boxShadow: '0 2px 12px 0 rgba(9, 8, 8, 0.1)',
    backgroundColor: '#FFF',

    gap: '10px',
  },

  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    height: '60px',
    padding: '20px',

    borderBottom: '1px solid #d1d1d1',
  },

  xButton: {
    fontSize: '30px',
    cursor: 'pointer',

    backgroundColor: 'transparent',
    border: 'none',
  },

  modalContent: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    height: 'calc(100% - 100px)',
    gap: '15px',
  },

  button: {
    border: 'none',
    backgroundColor: 'transparent',

    cursor: 'pointer',
  },

  buttonImage: {
    width: '350px',
    height: '70px',

    borderRadius: '10px',
    objectFit: 'cover',
  },

  switchText: {
    display: 'flex',
    justifyContent: 'center',
  },
});

const LoginModal = () => {
  const [isModalClose, setIsModalClose] = useState(false);

  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.modal)}>
        <div {...stylex.props(styles.modalHeader)}>
          <span>회원가입 및 로그인</span>
          <button {...stylex.props(styles.xButton)}>
            <i class="fa-solid fa-xmark"></i>
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

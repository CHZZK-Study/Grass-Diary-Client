import * as stylex from '@stylexjs/stylex';
import { useNavigate } from 'react-router-dom';

const styles = stylex.create({
  button: {
    backgroundColor: {
      default: '#F9F9F9',
      ':hover': '#000000',
    },
    color: {
      default: '#000000',
      ':hover': '#ffffff',
    },
    border: '1px solid #BFBFBF',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: '16px',
    transition: '0.3s',
  },
});

const BackButton = ({ goBackTo }) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (goBackTo) {
      return navigate(goBackTo);
    }
    navigate(-1);
  };
  return (
    <div>
      <button onClick={goBack} type="button" {...stylex.props(styles.button)}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
    </div>
  );
};

export default BackButton;

import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  button: {
    backgroundColor: {
      default: '#F9F9F9',
      ':hover': '#BFBFBF',
    },
    color: {
      default: 'black',
      ':hover': 'white',
    },
    border: '1px solid #BFBFBF',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: '16px',
  },
});

const BackButton = () => {
  return (
    <div>
      <button type="button" {...stylex.props(styles.button)}>
        <i className="fa-solid fa-arrow-left"></i>
      </button>
    </div>
  );
};

export default BackButton;

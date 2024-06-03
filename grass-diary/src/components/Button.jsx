import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  startButton: (width, height, color, backgroundColor, border, marginTop) => ({
    padding: '12px 10px 12px 10px',

    borderRadius: '30px',

    fontWeight: '500',
    cursor: 'pointer',

    width,
    height,
    color,
    border,
    backgroundColor,
    marginTop,
  }),
});

const Button = ({
  text,
  onClick,
  width,
  height,
  color,
  backgroundColor,
  border,
  marginTop,
}) => {
  return (
    <>
      <button
        onClick={onClick}
        {...stylex.props(
          styles.startButton(
            width,
            height,
            color,
            backgroundColor,
            border,
            marginTop,
          ),
        )}
      >
        {text}
      </button>
    </>
  );
};

export default Button;

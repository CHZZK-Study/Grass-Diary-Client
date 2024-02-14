import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  startButton: (width, color, backgroundColor, border) => ({
    marginTop: '25px',
    padding: '12px 10px 12px 10px',

    borderRadius: '30px',

    fontWeight: '500',
    cursor: 'pointer',

    width,
    color,
    border,
    backgroundColor,
  }),
});

const Button = () => {
  return (
    <button
      {...stylex.props(styles.startButton('150px', '#FFF', '#28CA3B', 'none'))}
    >
      일기 시작하기
    </button>
  );
};

export default Button;

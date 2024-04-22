import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  startButton: (
    width,
    height,
    defaultColor,
    hoverColor,
    defaultBgColor,
    hoverBgColor,
    border,
    marginTop,
  ) => ({
    padding: '12px 10px 12px 10px',
    borderRadius: '30px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: '0.5s',

    width,
    height,
    border,
    marginTop,

    color: {
      default: defaultColor,
      ':hover': hoverColor,
    },

    backgroundColor: {
      default: defaultBgColor,
      ':hover': hoverBgColor,
    },
  }),
});

interface IButton {
  text?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  defaultColor?: string;
  hoverColor?: string;
  defaultBgColor?: string;
  hoverBgColor?: string;
  border?: string;
  onClick?: () => void;
}

const Button = ({
  text,
  width,
  height,
  marginTop,
  defaultColor,
  hoverColor,
  defaultBgColor,
  hoverBgColor,
  border,
  onClick,
}: IButton) => {
  return (
    <>
      <button
        onClick={onClick}
        {...stylex.props(
          styles.startButton(
            width,
            height,
            defaultColor,
            hoverColor,
            defaultBgColor,
            hoverBgColor,
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

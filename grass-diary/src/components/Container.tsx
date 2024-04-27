import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
});

const Container = ({ children }: IContainer) => {
  return <div {...stylex.props(styles.container)}>{children}</div>;
};

export default Container;

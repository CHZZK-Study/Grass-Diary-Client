import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100vw',
    height: '100vh',
  },
  title: {
    fontSize: '80px',
    color: 'green',
    fontWeight: 'bold',
  },
});

const App = () => {
  return (
    <div {...stylex.props(styles.container)}>
      <div {...stylex.props(styles.title)}>잔디 일기</div>
    </div>
  );
};

export default App;

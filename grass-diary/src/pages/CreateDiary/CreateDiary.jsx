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

const CreateDiary = () => {
  return (
    <>
      <h1 {...stylex.props(styles.container)}>creatediary</h1>
      <h1>creatediary</h1>
      <h1>creatediary</h1>
      <h1>creatediary</h1>
      <h1>creatediary</h1>
      <h1>creatediary</h1>
    </>
  );
};

export default CreateDiary;

import * as stylex from '@stylexjs/stylex';
import Header from '../../components/Header';

const styles = stylex.create({
  wrap: {},
  content: {
    marginTop: '200px',
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
  },
});

const NonExistentDiary = () => {
  return (
    <>
      <Header />
      <div {...stylex.props(styles.content)}>존재 하지 않는 일기입니다❗</div>
    </>
  );
};

export default NonExistentDiary;

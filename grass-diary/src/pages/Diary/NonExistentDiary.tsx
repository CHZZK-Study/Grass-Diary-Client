import stylex from '@stylexjs/stylex';
import { Header, BackButton, Container } from '@components/index';

const styles = stylex.create({
  wrap: {
    padding: '65px 80px 0 80px',
  },
  content: {
    marginTop: '150px',
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
  },
});

const NonExistentDiary = () => {
  return (
    <Container>
      <Header />
      <div {...stylex.props(styles.wrap)}>
        <BackButton goBackTo={'/main'} />
        <div {...stylex.props(styles.content)}>
          <p>존재하지 않는 일기입니다❗</p>
        </div>
      </div>
    </Container>
  );
};

export default NonExistentDiary;

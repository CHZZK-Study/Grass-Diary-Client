import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  diaryContent: {
    padding: '16px 16px 100px 16px ',
  },
  hashTag: {
    color: '#28B91C',
    fontSize: '13px',
    marginBottom: '36px',
  },
  content: {
    fontSize: '13px',
    lineHeight: '25px',
  },
});

const Content = ({ hashTag, content }) => {
  return (
    <div {...stylex.props(styles.diaryContent)}>
      <div {...stylex.props(styles.hashTag)}>{hashTag}</div>
      <p {...stylex.props(styles.content)}>{content}</p>
    </div>
  );
};

export default Content;

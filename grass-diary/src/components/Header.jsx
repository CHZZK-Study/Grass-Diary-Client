import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  header: {
    display: 'flex',
    alignItems: 'center',

    width: '90%',
    height: '70px',

    padding: '10px 0 10px 20px',

    borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
    backgroundColor: '#FFF',

    '::before': {
      content: '',
      position: 'relative',

      width: '40px',
      height: '40px',

      top: '0',
      left: '0',

      background: '40px 40px url(../../assets/icon/grass.png) no-repeat',
    },
  },
});

const Header = () => {
  return (
    <div {...stylex.props(styles.header)}>
      <h2>잔디 일기</h2>
    </div>
  );
};

export default Header;

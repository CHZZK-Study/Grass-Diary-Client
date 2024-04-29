import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  contentWrap: {
    display: 'flex',
    flexDirection: 'column',

    width: '1160px',
    height: '100vh',

    backgroundColor: '#F9F9F9',
    border: '1px solid #BFBFBF',
    borderRadius: '3.2rem 3.2rem 0 0',

    gap: '0.625rem',
  },

  titleSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',
    height: '12.5rem',
  },

  title: {
    fontSize: '1.4rem',
  },

  profileSection: {
    display: 'flex',
    justifyContent: 'center',

    width: '100%',
    gap: '1.9rem',
  },

  profileLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: '30%',
  },

  profileRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    width: '55%',
    gap: '1.25rem',
  },

  settingSection: {
    display: 'flex',
    gap: '1.9rem',
  },

  textInput: (padding, height) => ({
    width: '28.2rem',

    borderRadius: '1rem',
    border: '1px solid #BFBFBF',

    resize: 'none',
    outline: 'none',

    height,
    padding,
  }),

  saveSection: {
    display: 'flex',
    justifyContent: 'space-between',

    width: '71%',
  },

  colorWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '3.1rem',
    height: '3.1rem',

    border: '1px solid #BFBFBF',
    borderRadius: '100%',
    backgroundColor: '#FFF',
  },

  grassColor: {
    width: '2.2rem',
    height: '2.2rem',

    borderRadius: '100%',
    backgroundColor: '#84FF79',
  },
});

export default styles;

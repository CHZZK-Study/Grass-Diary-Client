import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100vw',
    height: '300vh',
  },

  mainContainer: (backgroundColor, height) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',

    height,
    backgroundColor,
  }),

  mainDescription: alignItems => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    alignItems,
  }),

  mainContent: flexDirection => ({
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-evenly',

    width: '1080px',
    flexDirection,
  }),

  mainTitle: {
    fontSize: '3.75rem',
    fontWeight: '700',

    margin: '0 0 0.3rem -0.3rem',
  },

  mainImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    width: '33.75rem',
  },

  contentImage: (width, height) => ({
    border: '1px solid #c2c2c2',
    backgroundColor: '#FFF',

    width,
    height,
  }),

  contentDesc: fontSize => ({
    marginBottom: '0.6rem',
    fontSize,
  }),
});

export default styles;

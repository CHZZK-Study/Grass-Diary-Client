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

  mainDescription: (alignItems) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    alignItems,
  }),

  mainContent: (flexDirection) => ({
    display: 'flex',
    alignItems: 'center',

    justifyContent: 'space-evenly',

    width: '1080px',
    flexDirection,
  }),

  mainTitle: {
    fontSize: '60px',
    fontWeight: '700',

    margin: '0 0 5px -5px',
  },

  mainImage: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',

    width: '540px',
  },

  contentImage: (width, height) => ({
    border: '1px solid #c2c2c2',
    backgroundColor: '#FFF',

    width,
    height,
  }),

  contentDesc: (fontSize) => ({
    marginBottom: '5px',
    fontSize,
  }),
});

export default styles;

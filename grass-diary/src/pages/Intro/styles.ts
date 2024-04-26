import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100vw',
    height: 'auto',
  },

  mainContainer: (backgroundColor: string, height: string) => ({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '100%',

    height,
    backgroundColor,
  }),

  mainDescription: (alignItems?: string) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    alignItems,
  }),

  mainContent: (flexDirection: string) => ({
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

  contentImage: (width: string, height: string) => ({
    borderRadius: '30px',
    objectFit: 'cover',
    objectPosition: 'left',

    width,
    height,
  }),

  contentDesc: (fontSize: string) => ({
    marginBottom: '0.6rem',
    fontSize,
  }),
});

export default styles;

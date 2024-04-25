import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

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

  contentDesc: (fontSize?: string, margin?: string, fontWeight?: string) => ({
    lineHeight: '1.34',

    fontWeight,
    fontSize,
    margin,
  }),
});

export default styles;

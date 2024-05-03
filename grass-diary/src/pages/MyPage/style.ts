import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100%',
    maxWidth: '1200px',

    gap: '50px',
  },

  profileSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
    height: '500px',

    backgroundColor: '#F9F9F9',
    border: '1px solid #BFBFBF',
    borderRadius: '30px 30px 0 0',

    overflow: 'hidden',
  },

  profileDetails: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',

    width: '1200px',
    height: '90%',

    padding: '20px',
  },

  profileLeft: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',

    width: '25%',
    height: '100%',
  },

  profileRight: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',

    width: '70%',
    height: '100%',

    gap: '15px',
  },

  nameSection: {
    display: 'flex',
    fontSize: '20px',
  },

  grassContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  dayContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    position: 'relative',
  },

  grass: {
    width: '100%',
    position: 'relative',
  },

  grassDate: (border, backgroundColor) => ({
    position: 'relative',

    width: '13px',
    height: '13px',

    borderRadius: '100%',

    border,
    backgroundColor,
  }),

  dateBubble: {
    position: 'absolute',

    width: '50px',
    padding: '8px',

    top: '20px',
    left: '50%',
    transform: 'translateX(-50%)',

    fontSize: '11px',
    textAlign: 'center',

    border: '1px solid #BFBFBF',
    borderRadius: '20px',
    backgroundColor: '#FFF',

    zIndex: '3',
  },

  profileToggle: {
    display: 'flex',
  },

  toggleButton: {
    width: '150px',
    height: '50px',

    border: 'none',
    borderBottom: '2px solid #000',

    fontSize: '18px',
    backgroundColor: 'transparent',

    cursor: 'pointer',
  },

  basicButton: {
    width: '150px',
    height: '50px',

    border: 'none',

    fontSize: '18px',
    backgroundColor: 'transparent',

    cursor: 'pointer',
  },

  mainSection: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '70%',
    gap: '20px',
  },

  searchSection: {
    display: 'flex',

    width: '100%',
    padding: '15px 20px 15px 20px',

    borderRadius: '30px',
    border: '1px solid #BFBFBF',
  },

  searchIcon: {
    fontSize: '20px',
    paddingRight: '10px',
  },

  searchBar: {
    position: 'relative',
    width: '95%',

    border: 'none',
    outline: 'none',
  },

  sortContainer: {
    display: 'flex',
    justifyContent: 'flex-end',

    width: '95%',
  },

  diaryList: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    minHeight: '1050px',

    paddingBottom: '50px',
    overflowY: 'auto',
    gap: '50px',
  },

  diary: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',

    gap: '30px',
    padding: '40px 50px 40px 50px',

    border: '1px solid #B5B2B2',
    borderRadius: '20px',

    backgroundColor: '#FFF',
    cursor: 'pointer',
  },

  smallProfileSection: {
    display: 'flex',
  },

  smallDetailes: {
    display: 'flex',
    flexDirection: 'column',

    paddingLeft: '5px',
    gap: '3px',
  },

  name: {
    fontSize: '21px',
  },

  time: {
    color: '#BFBFBF',
  },

  hashtag: {
    color: '#777777',
  },

  diaryContent: {
    display: 'flex',
    flexDirection: 'column',

    color: '#474747',
    gap: '20px',
  },

  pageButtonWrap: {
    display: 'flex',
    justifyContent: 'center',

    paddingBottom: '60px',
    gap: '10px',
  },
});

export default styles;

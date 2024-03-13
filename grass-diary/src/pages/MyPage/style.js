import stylex from '@stylexjs/stylex';

const styles = stylex.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',

    width: '100vw',
  },

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

  profileImage: {
    width: '200px',
    height: '200px',

    objectFit: 'cover',

    borderRadius: '100%',
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
    alignItems: 'flex-end',

    gap: '10px',
  },

  grass: {
    width: '100%',
  },

  grassDate: border => ({
    borderRadius: '10px',
    backgroundColor: '#B6F69D',
    width: '10px',
    height: '13px',

    border,
  }),

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
    gap: '50px',
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

  diaryList: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    paddingBottom: '50px',

    gap: '50px',
  },

  diary: {
    display: 'flex',
    flexDirection: 'column',

    width: '100%',

    border: '1px solid #B5B2B2',
    borderRadius: '20px',

    backgroundColor: '#FFF',

    padding: '40px 50px 40px 50px',
    gap: '30px',
  },

  smallProfileSection: {
    display: 'flex',
  },

  smallProfile: {
    width: '60px',
    height: '60px',

    borderRadius: '100%',
    objectFit: 'cover',
  },

  emoji: {
    fontSize: '22px',
    zIndex: '1',
    position: 'relative',
    transform: 'translate(-19px, 33px)',
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

  likeSection: {
    display: 'flex',
    alignItems: 'center',

    gap: '3px',
  },
});

export default styles;
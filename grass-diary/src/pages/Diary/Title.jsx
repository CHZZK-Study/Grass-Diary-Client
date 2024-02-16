import * as stylex from '@stylexjs/stylex';
import testImg from '../../assets/icon/profile.jpeg';
import Ellipsis from './Ellipsis';

const styles = stylex.create({
  progileBox: {
    position: 'relative',
    width: '50px',
    height: '50px',
    margin: '44px 0 28px 0',
  },
  profileImg: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  emoji: {
    zIndex: '1',
    position: 'absolute',
    bottom: 0,
    right: 0,
    transform: 'translate(3px, 3px)',
  },
  diaryHeader: {
    position: 'relative',
    borderBottom: '1px solid #BFBFBF',
    paddingBottom: '36px',
    marginBottom: '36px',
  },
  title: {
    fontSize: '40px',
    fontWeight: '600',
    marginRight: '24px',
  },
  time: {
    fontSize: '16px',
    marginRight: '24px',
  },
  privateOrPubilc: {
    fontSize: '16px',
  },
  ellipsis: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: '36px',
    cursor: 'pointer',
  },
});

const Title = ({ title, time, privateOrPubilc }) => {
  return (
    <div>
      <div {...stylex.props(styles.progileBox)}>
        <img {...stylex.props(styles.profileImg)} src={testImg}></img>
        <div {...stylex.props(styles.emoji)}>😆</div>
      </div>

      <div {...stylex.props(styles.diaryHeader)}>
        <span {...stylex.props(styles.title)}>{title}</span>
        <span {...stylex.props(styles.time)}>{time}</span>
        <span {...stylex.props(styles.privateOrPubilc)}>{privateOrPubilc}</span>
        <div {...stylex.props(styles.ellipsis)}>
          <Ellipsis />
        </div>
      </div>
    </div>
  );
};

export default Title;

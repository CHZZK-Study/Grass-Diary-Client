import * as stylex from '@stylexjs/stylex';
import arrow from '../../assets/icon/arrow.png';
import controlBar from '../../assets/icon/controlBar.png';
import like from '../../assets/icon/like.png';
import testImg from '../../assets/testImg.avif';

const styles = stylex.create({
  nav: {
    height: '80px',
  },
  wrap: {
    background: '#F9F9F9',
    width: '100vw',
    margin: 'auto',
    border: '1px solid #BFBFBF',
    borderRadius: '50px 50px 0 0',
    padding: '65px 100px 0 100px',

    maxWidth: '1200px',
  },
  button: {
    backgroundColor: {
      default: '#F9F9F9',
      ':hover': 'green',
    },
    // color: {
    //   default: "#000000",
    //   ":hover": "#ffffff",
    // },
    border: '1px solid #BFBFBF',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    cursor: 'pointer',
    marginRight: '16px',
  },
  profileImg: {
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    margin: '44px 0 28px 0',
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
  disclosure: {
    fontSize: '16px',
  },
  controlBar: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginBottom: '36px',
  },
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
  like: {
    display: 'inline',
    marginRight: '32px',
  },
  feelBackground: {
    width: '40px',
    height: '40px',
    backgroundColor: '#ffffff',
    borderRadius: '50%',
    border: '1px solid #BFBFBF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  feel: {
    width: '34px',
    height: '34px',
    backgroundColor: '#14FF00',
    borderRadius: '50%',
  },
  diaryFooter: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginBottom: '36px',
  },
});

const Diary = () => {
  return (
    <>
      <div {...stylex.props(styles.nav)}></div>
      <div {...stylex.props(styles.wrap)}>
        <div>
          <button type="button" {...stylex.props(styles.button)}>
            <img src={arrow}></img>
          </button>
          <span>목록</span>
        </div>

        <div>
          <img {...stylex.props(styles.profileImg)} src={testImg}></img>
          <div {...stylex.props(styles.diaryHeader)}>
            <span {...stylex.props(styles.title)}>11월 11일 목요일</span>
            <span {...stylex.props(styles.time)}>23:01</span>
            <span {...stylex.props(styles.disclosure)}>비공개</span>
            <img {...stylex.props(styles.controlBar)} src={controlBar} alt="페이지 제어" />
          </div>
          <div {...stylex.props(styles.diaryContent)}>
            <div {...stylex.props(styles.hashTag)}>#해시태그 #해시태그 #해시태그</div>
            <p {...stylex.props(styles.content)}>
              오늘은 스터디 회의가 있는 날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은
              스터디 회의가 있는 날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은 스터디
              회의가 있는 날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은 스터디 회의가
              있는 날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은 스터디 회의가 있는
              날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은 스터디 회의가 있는
              날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은 스터디 회의가 있는
              날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은 스터디 회의가 있는
              날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은 스터디 회의가 있는
              날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은 스터디 회의가 있는
              날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다.오늘은 스터디 회의가 있는
              날이었다. 스터디 회의를 진행하면서 느낀 점이 있었다. 오늘은 스터디 회의가 있는
              날이었다.
              <br></br>
              <br></br>
              스터디 회의를 진행하면서 느낀 점이 있었다. 오늘은 스터디 회의가 있는 날이었다. 스터디
              회의를 진행하면서 느낀 점이 있었다.오늘은 스터디 회의가 있는 날이었다. 스터디 회의를
              진행하면서 느낀 점이 있었다.오늘은 스터디 회의가 있는 날이었다. 스터디 회의를
              진행하면서 느낀 점이 있었다.
            </p>
          </div>
        </div>
        <div {...stylex.props(styles.diaryFooter)}>
          <img {...stylex.props(styles.like)} src={like}></img>
          <div {...stylex.props(styles.feelBackground)}>
            <div {...stylex.props(styles.feel)}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Diary;

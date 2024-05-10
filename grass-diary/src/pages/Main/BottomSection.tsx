import stylex from '@stylexjs/stylex';
import { Link } from 'react-router-dom';

const BottomSectionStyle = stylex.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    width: '1200px',

    padding: '50px 0 0 10px',
  },

  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',

    gap: '10px',
  },

  title: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  btn: {
    fontSize: '20px',
    fontWeight: 'bold',
    border: 'none',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
});

const BottomSection = () => {
  return (
    <>
      <div {...stylex.props(BottomSectionStyle.container)}>
        <div {...stylex.props(BottomSectionStyle.contentWrapper)}>
          <div {...stylex.props(BottomSectionStyle.title)}>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Trophy.png"
              alt="Trophy"
              width="25"
              height="25"
            />
            <h1>이번 주 TOP 10</h1>
          </div>
          <span>다른 사람의 하루를 구경하러 가볼까요?</span>
        </div>
        <Link to="/share">
          <button {...stylex.props(BottomSectionStyle.btn)}>
            더 보러가기 <i className="fa-solid fa-chevron-right"></i>
          </button>
        </Link>
      </div>
    </>
  );
};

export default BottomSection;

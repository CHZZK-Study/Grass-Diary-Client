import * as stylex from "@stylexjs/stylex";
import testImg from "../assets/icon/profile.jpeg";
import logo from "../assets/icon/grass.png";

const header = stylex.create({
  container: {
    width: "100vw",
    height: "80px",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    maxWidth: "1200px",
    padding: "0 24px",
  },
  logo: {
    width: "60px",
    height: "60px",
    cursor: "pointer",
  },
  userMenu: {
    width: "44px",
    height: "44px",
    borderRadius: "50%",
    marginLeft: "auto",
    objectFit: "cover",
    cursor: "pointer",
  },
});

const Header = () => {
  return (
    <div {...stylex.props(header.container)}>
      <img {...stylex.props(header.logo)} src={logo} alt='잔디일기logo' />
      <span>잔디일기</span>
      <img {...stylex.props(header.userMenu)} src={testImg} alt='profile' />
    </div>
  );
};

export default Header;

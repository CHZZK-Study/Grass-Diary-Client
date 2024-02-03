import * as stylex from "@stylexjs/stylex";

const styles = stylex.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    width: "100vw",
    height: "100vh",
  },
  title: {
    fontSize: "80px",
    color: "green",
    fontWeight: "bold",
  },
});

const Main = () => {
  return (
    <>
      <h1 {...stylex.props(styles.container)}>mainpage</h1>
      <h1>mainpage</h1>
      <h1>mainpage</h1>
      <h1>mainpage</h1>
      <h1>mainpage</h1>
      <h1>mainpage</h1>
    </>
  );
};

export default Main;

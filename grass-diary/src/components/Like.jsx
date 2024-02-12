import * as stylex from "@stylexjs/stylex";
import { useState } from "react";

const styles = stylex.create({
  like: {
    fontSize: "30px",
    textAlign: "center",
    cursor: "pointer",
  },
});

const Like = () => {
  const [like, setlike] = useState(false);

  const clickLike = () => {
    setlike((current) => !current);
  };
  return (
    <div {...stylex.props(styles.like)}>
      {like ? (
        <i onClick={clickLike} className='fa-solid fa-heart'></i>
      ) : (
        <i onClick={clickLike} className='fa-regular fa-heart'></i>
      )}
    </div>
  );
};

export default Like;

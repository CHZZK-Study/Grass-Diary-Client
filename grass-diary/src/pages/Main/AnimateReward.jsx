import { useSpring, animated } from 'react-spring';

function AnimateReward({ n }) {
  const { number } = useSpring({
    from: { number: 0 },
    number: n,
    delay: 200,
    config: { mass: 1, tension: 10, friction: 3 },
  });
  return <animated.h1>{number.to(n => n.toFixed(0))}</animated.h1>;
}

export default AnimateReward;

import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

function AnimateReward({ n }) {
  const [isVisible, setIsVisible] = useState(false);
  const { number } = useSpring({
    from: { number: 0 },
    number: isVisible ? n : 0,
    delay: 200,
    config: { mass: 1, tension: 10, friction: 3 },
  });

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      });
    }, option);

    const target = document.getElementById('animateReward');
    if (target) {
      observer.observe(target);
    }

    return () => {
      if (target) {
        observer.unobserve(target);
      }
    };
  }, []);
  return (
    <animated.h1 id="animateReward">{number.to(n => n.toFixed(0))}</animated.h1>
  );
}

export default AnimateReward;

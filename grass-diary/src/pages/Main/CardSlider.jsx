import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import * as stylex from '@stylexjs/stylex';

const SlideStyle = stylex.create({
  container: {
    display: 'flex',
    padding: '50px',
  },

  slide: {
    backgroundColor: '#f9f9f9',
    borderLeft: '30px solid white',
    borderRight: '30px solid white',
    borderRadius: '30px',
    height: 400,
  },

  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PauseOnHover = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
  };
  return (
    <div className="slider-slide">
      <Slider {...settings} {...stylex.props(SlideStyle.container)}>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>1</h3>
          <div {...stylex.props(SlideStyle.content)}>
            <img
              src="https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Teddy%20Bear.png"
              alt="Teddy Bear"
              width="125"
              height="125"
            />
          </div>
        </div>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>2</h3>
        </div>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>3</h3>
        </div>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>4</h3>
        </div>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>5</h3>
        </div>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>6</h3>
        </div>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>7</h3>
        </div>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>8</h3>
        </div>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>9</h3>
        </div>
        <div {...stylex.props(SlideStyle.slide)}>
          <h3 {...stylex.props(SlideStyle.content)}>10</h3>
        </div>
      </Slider>
    </div>
  );
};

export default PauseOnHover;

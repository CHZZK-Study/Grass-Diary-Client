import stylex from '@stylexjs/stylex';
import { useEffect } from 'react';

const imageModal = stylex.create({
  background: {
    zIndex: '998',
    position: 'fixed',
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageWrap: {
    position: 'relative',
    width: '80vw',
    height: '90vh',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  },
  imageBox: {
    zIndex: '999',
    objectFit: 'contain',
  },
  closeBtn: {
    position: 'relative',
    width: '36px',
    height: '36px',
    padding: '0',
    margin: '0 10px',
    border: '1px solid #fff',
    borderRadius: '18px',
    cursor: 'pointer',
    transition: '0.3s',
    background: { default: 'none', ':hover': '#fff' },
    color: { default: '#fff', ':hover': '#000' },
  },
  closeIcon: {
    position: 'absolute',
    top: '0',
    width: '34px',
    lineHeight: '36px',
  },
});

type Props = {
  img: string;
  setImageModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const ImageModal = ({ img, setImageModal }: Props) => {
  const onClick = () => {
    setImageModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div {...stylex.props(imageModal.background)}>
      <div {...stylex.props(imageModal.imageWrap)}>
        <img src={img} {...stylex.props(imageModal.imageBox)}></img>
        <button {...stylex.props(imageModal.closeBtn)} onClick={onClick}>
          <div {...stylex.props(imageModal.closeIcon)}>
            <i className="fa-solid fa-x"></i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ImageModal;

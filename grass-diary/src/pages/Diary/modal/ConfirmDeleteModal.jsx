import stylex from '@stylexjs/stylex';
import { Button } from '@components';

const styles = stylex.create({
  background: {
    zIndex: '1',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: 'rgba( 0, 0, 0, 0.3 )',
    cursor: 'auto',
  },
  container: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#ffffff',
    borderRadius: '20px',
    padding: '15px 25px',
    textAlign: 'center',
  },
  text: {
    margin: '30px 10px',
  },
  bold: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  ie: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    fontSize: '13px',
  },
});

const ConfirmDeleteModal = ({ setter, setDelete }) => {
  const closeModal = () => setter(false);

  const deleteDiary = () => {
    setDelete();
    setter(false);
  };
  return (
    <div {...stylex.props(styles.background)}>
      <div {...stylex.props(styles.container)}>
        <div {...stylex.props(styles.text)}>
          <span {...stylex.props(styles.bold)}>
            ⚠ 일기를 삭제하시겠습니까?
          </span>
          <br />
          <div {...stylex.props(styles.ie)}>
            <Button
              text={'취소'}
              onClick={closeModal}
              width={'50px'}
              color={'#fff'}
              backgroundColor={'#28CA3B'}
              border={'none'}
            />
            <Button
              text={'삭제'}
              onClick={deleteDiary}
              width={'50px'}
              color={'#fff'}
              backgroundColor={'#28CA3B'}
              border={'none'}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

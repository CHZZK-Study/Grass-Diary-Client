import * as stylex from '@stylexjs/stylex';

import { useState, useRef, useEffect } from 'react';

import UnmodifyModal from './modal/UnmodifyModal';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal';
import CompleteDeleteModal from './modal/CompleteDeleteModal';

const ellipsis = stylex.create({
  ellipsis: {
    zIndex: '1',
    position: 'relative',
  },
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '136px',
    border: '1px solid #BFBFBF',
    borderRadius: '20px',
    transform: 'translate(15px, -8px)',
    backgroundColor: '#ffffff',
  },
  box: {
    height: '36px',
    fontSize: '13px',
    textAlign: 'center',
    lineHeight: '36px',
    borderBottom: {
      default: '1px solid #BFBFBF',
      ':last-child': 'none',
    },
  },
});

const OpenEllipsis = ({ ellisisRef, deleteDiary }) => {
  const [modifiable, setModifiable] = useState(false);
  const [unmodifyModal, setUnmodifyModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);

  const linkToModify = () => {
    if (!modifiable && !unmodifyModal) {
      setUnmodifyModal(true);
      return;
    }
    // 수정 가능할 때의 로직
  };

  const showConfirmModal = () => setConfirmDeleteModal(true);

  return (
    <>
      <div ref={ellisisRef} {...stylex.props(ellipsis.container)}>
        <div {...stylex.props(ellipsis.box)}></div>
        <div onClick={linkToModify} {...stylex.props(ellipsis.box)}>
          수정
        </div>
        <div onClick={showConfirmModal} {...stylex.props(ellipsis.box)}>
          삭제
        </div>
      </div>
      {unmodifyModal && <UnmodifyModal show={setUnmodifyModal} />}
      {confirmDeleteModal && (
        <ConfirmDeleteModal
          show={setConfirmDeleteModal}
          setDelete={deleteDiary}
        />
      )}
    </>
  );
};

const Ellipsis = () => {
  const [open, setOpen] = useState(false);
  const [completeDeleteModal, setCompleteDeleteModal] = useState(false);
  const ellisisRef = useRef(null);
  const iconRef = useRef(null);

  const clickEllipsis = () => setOpen(current => !current);

  const deleteDiary = () => setCompleteDeleteModal(true);

  useEffect(() => {
    const closeEllispis = e => {
      if (
        open &&
        !ellisisRef.current.contains(e.target) &&
        !iconRef.current.contains(e.target)
      )
        setOpen(false);
    };

    document.addEventListener('click', closeEllispis);

    return () => document.removeEventListener('click', closeEllispis);
  }, [open]);

  return (
    <div>
      {open && (
        <OpenEllipsis ellisisRef={ellisisRef} deleteDiary={deleteDiary} />
      )}
      {completeDeleteModal && (
        <CompleteDeleteModal show={setCompleteDeleteModal} />
      )}
      <div
        ref={iconRef}
        onClick={clickEllipsis}
        {...stylex.props(ellipsis.ellipsis)}
      >
        <i className="fa-solid fa-ellipsis-vertical"></i>
      </div>
    </div>
  );
};

export default Ellipsis;

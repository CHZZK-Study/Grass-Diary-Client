import { useState, useEffect } from 'react';

import API from '../../services/index';
import { EllipsisIcon, EllipsisBox } from '../../components/Ellipsis';
import UnmodifyModal from './modal/UnmodifyModal';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal';
import CompleteDeleteModal from './modal/CompleteDeleteModal';

const Setting = id => {
  const [modifiable, setModifiable] = useState(false);
  const [unmodifyModal, setUnmodifyModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [completeDeleteModal, setCompleteDeleteModal] = useState(false);
  const createdDate = '24년 03월 14일'; // 임시 데이터
  const date = new Date();
  useEffect(() => {
    if (
      // 당일 : 일기 수정 가능
      createdDate.slice(0, 2) === String(date.getFullYear()).slice(2, 4) &&
      createdDate.slice(5, 6) == date.getMonth() + 1 &&
      createdDate.slice(8, 10) == date.getDate()
    ) {
      setModifiable(true);
    } else {
      // 그 외 시간 : 수정 불가능
      setModifiable(false);
    }
  }, []);

  const showConfirmModal = () => setConfirmDeleteModal(true);

  const linkToModify = () => {
    if (!modifiable && !unmodifyModal) {
      setUnmodifyModal(true);
      return;
    }
    // 일기 수정 가능 시,
  };

  const deleteDiary = async () => {
    await API.delete(`/diary/${id.id}`)
      .then(() => {
        console.log('삭제 완료');
        setCompleteDeleteModal(true);
      })
      .catch(err => console.log('삭제 error', err));
  };

  return (
    <>
      <EllipsisIcon width="136" translateValue="115px">
        <EllipsisBox onClick={linkToModify} text="수정" />
        <EllipsisBox onClick={showConfirmModal} text="삭제" />
      </EllipsisIcon>

      {unmodifyModal && <UnmodifyModal setter={setUnmodifyModal} />}
      {confirmDeleteModal && (
        <ConfirmDeleteModal
          setter={setConfirmDeleteModal}
          setDelete={deleteDiary}
        />
      )}
      {completeDeleteModal && (
        <CompleteDeleteModal setter={setCompleteDeleteModal} />
      )}
    </>
  );
};

export default Setting;

import { useState, useEffect } from 'react';

import API from '../../services/index';
import { EllipsisIcon, EllipsisBox } from '../../components/Ellipsis';
import UnmodifyModal from './modal/UnmodifyModal';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal';
import CompleteDeleteModal from './modal/CompleteDeleteModal';
import { useNavigate } from 'react-router-dom';

const Setting = ({ id, createdDate }) => {
  const navigate = useNavigate();
  const [modifiable, setModifiable] = useState(false);
  const [unmodifyModal, setUnmodifyModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [completeDeleteModal, setCompleteDeleteModal] = useState(false);
  // const createdDate = '24년 03월 29일'; // 임시 데이터
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
    localStorage.removeItem('lastWritingDate');
    if (!modifiable && !unmodifyModal) {
      setUnmodifyModal(true);
      return;
    }
    navigate(`/editdiary/${id}`);
  };

  const deleteDiary = async () => {
    localStorage.removeItem('lastWritingDate');
    await API.delete(`/diary/${id}`)
      .then(() => {
        setCompleteDeleteModal(true);
      })
      .catch(error =>
        console.error(`사용자의 일기를 삭제할 수 없습니다. ${error}`),
      );
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

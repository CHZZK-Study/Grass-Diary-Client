import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EllipsisIcon, EllipsisBox } from '@components/index';
import UnmodifyModal from './modal/UnmodifyModal';
import ConfirmDeleteModal from './modal/ConfirmDeleteModal';

type Props = {
  diaryId: string | undefined;
  createdDate: string;
};

const Setting = ({ diaryId, createdDate }: Props) => {
  const navigate = useNavigate();
  const date = new Date();
  const [canEdit, setCanEdit] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);

  const showConfirmModal = () => setConfirmModal(true);

  const linkToModify = () => {
    localStorage.removeItem('lastWritingDate');
    if (!canEdit && !editModal) {
      setEditModal(true);
      return;
    }
    navigate(`/editdiary/${diaryId}`);
  };

  useEffect(() => {
    if (createdDate) {
      if (
        // 당일 : 일기 수정 가능
        createdDate.slice(0, 2) === String(date.getFullYear()).slice(2, 4) &&
        +createdDate.slice(5, 6) === date.getMonth() + 1 &&
        +createdDate.slice(8, 10) === date.getDate()
      ) {
        setCanEdit(true);
      } else {
        // 그 외 시간 : 수정 불가능
        setCanEdit(false);
      }
    }
  }, []);

  return (
    <>
      <EllipsisIcon width="136" translateValue="115px">
        <EllipsisBox onClick={linkToModify} text="수정" />
        <EllipsisBox onClick={showConfirmModal} text="삭제" />
      </EllipsisIcon>

      {editModal && <UnmodifyModal setter={setEditModal} />}
      {confirmModal && (
        <ConfirmDeleteModal
          diaryId={diaryId!}
          setConfirmModal={setConfirmModal}
        />
      )}
    </>
  );
};

export default Setting;

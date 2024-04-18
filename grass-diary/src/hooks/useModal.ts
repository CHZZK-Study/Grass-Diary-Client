import { useState } from 'react';

interface IModalReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

const useModal = (): IModalReturn => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return { isModalOpen, handleOpenModal, handleCloseModal };
};

export default useModal;

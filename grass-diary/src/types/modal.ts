interface IModalReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

// Login Modal Type
interface ILoginModalProps {
  isOpen: () => void;
  isClose: () => void;
}

type TGoogleLogin = () => void;

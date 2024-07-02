interface IModalReturn {
  isModalOpen: boolean;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

// Login Modal Type
interface ILoginModalProps {
  top: string;
  isOpen: () => void;
  isClose: () => void;
}

type TGoogleLogin = () => void;

import { ButtonHTMLAttributes, MouseEvent } from "react";
import useModalOptions from "../hooks/useModalOptions";

interface ModalConfirmButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ModalConfirmButton = ({
  onClick,
  children,
  ...restProps
}: ModalConfirmButtonProps) => {
  const options = useModalOptions();

  if (!options) {
    return null;
  }

  const { closeModal, confirmContent } = options;

  const onClickConfirm = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    closeModal(true);
  };

  return (
    <button {...restProps} onClick={onClickConfirm} type="button">
      {confirmContent || children || "확인"}
    </button>
  );
};

export default ModalConfirmButton;
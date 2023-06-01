import { ButtonHTMLAttributes, MouseEvent } from "react";
import useModalOptions from "../hooks/useModalOptions";

interface ModalCancelButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {}

const ModalCancelButton = ({
  onClick,
  children,
  ...restProps
}: ModalCancelButtonProps) => {
  const options = useModalOptions();

  if (!options) {
    return null;
  }

  const { closeModal, cancelContent } = options;

  const onClickCancel = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    closeModal(false);
  };

  return (
    <button {...restProps} onClick={onClickCancel} type="button">
      {cancelContent || children || "취소"}
    </button>
  );
};

export default ModalCancelButton;
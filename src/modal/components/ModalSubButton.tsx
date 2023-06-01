import { ButtonHTMLAttributes, MouseEvent } from "react";
import useModalOptions from "../hooks/useModalOptions";

interface ModalSubButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  actionType: string;
}

const ModalSubButton = ({
  onClick,
  children,
  actionType,
  ...restProps
}: ModalSubButtonProps) => {
  const options = useModalOptions();

  if (!options) {
    return null;
  }

  const { closeModal, subContent } = options;

  const onClickSub = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    closeModal(actionType);
  };

  return (
    <button {...restProps} onClick={onClickSub} type="button">
      {subContent || children || "서브"}
    </button>
  );
};

export default ModalSubButton;
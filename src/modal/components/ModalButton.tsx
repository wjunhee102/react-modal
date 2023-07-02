import { ButtonHTMLAttributes, MouseEvent } from "react";
import useModalOptions from "../hooks/useModalOptions";
import { ModalComponentProps } from "../types";
import { ModalConfirmType } from "../services/modalStateManager";

function getContent(
  children: React.ReactNode,
  { confirmContent, cancelContent, subBtnContent }: ModalComponentProps,
  confirmType?: ModalConfirmType
) {
  if (children) {
    return children;
  }

  if (!confirmType) {
    return cancelContent;
  }

  if (confirmType === true) {
    return confirmContent;
  }

  return subBtnContent;
}

interface ModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  confirmType?: ModalConfirmType;
}

const ModalButton = ({
  onClick,
  children,
  confirmType,
  ...restProps
}: ModalButtonProps) => {
  const options = useModalOptions();

  if (!options) {
    return null;
  }

  const { action } = options;

  const onClickSub = (e: MouseEvent<HTMLButtonElement>) => {
    onClick && onClick(e);
    action(confirmType);
  };

  const content = getContent(children, options, confirmType);

  if (!content) {
    return null;
  }

  return (
    <button {...restProps} onClick={onClickSub} type="button">
      {content}
    </button>
  );
};

export default ModalButton;

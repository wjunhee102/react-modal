import { HTMLAttributes } from "react";
import useModalOptions from "../hooks/useModalOptions";

interface ModalContentProps extends HTMLAttributes<HTMLDivElement> {}

const ModalContent = ({ children, ...restProps }: ModalContentProps) => {
  const options = useModalOptions();

  if (!options) {
    return null;
  }

  const { content } = options;

  return <div {...restProps}>{content || children}</div>;
};

export default ModalContent;
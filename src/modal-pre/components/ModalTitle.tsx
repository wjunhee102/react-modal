import { HTMLAttributes } from "react";
import useModalOptions from "../hooks/useModalOptions";

interface ModalTitleProps extends HTMLAttributes<HTMLHeadingElement> {}

const ModalTitle = ({ children, ...restProps }: ModalTitleProps) => {
  const options = useModalOptions();

  if (!options) {
    return null;
  }

  const { title } = options;

  return <h2 {...restProps}>{title || children}</h2>;
};

export default ModalTitle;
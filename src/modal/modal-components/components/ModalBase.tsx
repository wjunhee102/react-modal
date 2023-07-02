import { HTMLAttributes, useMemo } from "react";
import ModalTitle from "../../components/ModalTitle";
import ModalCancelButton from "../../components/ModalCancelButton";
import ModalContent from "../../components/ModalContent";
import ModalConfirmButton from "../../components/ModalConfirmButton";
import ModalSubButton from "../../components/ModalSubButton";
import XIcon from "./XIcon";
import ModalButton from "../../components/ModalButton";
import useModalOptions from "../../hooks/useModalOptions";
import ModalSubTitle from "../../components/ModalSubTitle";
import { ModalConfirmType } from "../../services/modalStateManager";

import styles from "../Modals.module.scss";

const Header = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...restProps} className={`${styles.header} ${className || ""}`}>
      {children}
    </div>
  );
};

const HeaderLeft = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...restProps} className={`${styles.headerLeft} ${className || ""}`}>
      {children}
    </div>
  );
};

const Tag = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <ModalSubTitle
      {...restProps}
      className={`${styles.tag} ${className || ""}`}
    >
      {children}
    </ModalSubTitle>
  );
};

const CircleIconBox = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...restProps}
      className={`${styles.circleIconBox} ${className || ""}`}
    >
      {children}
    </div>
  );
};

const Title = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <ModalTitle {...restProps} className={`${styles.title} ${className || ""}`}>
      {children}
    </ModalTitle>
  );
};

const HeaderRight = ({
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  const options = useModalOptions();

  if (!options) {
    return null;
  }

  const { action } = options;

  const onClickCancel = () => {
    action(false);
  };

  return (
    <div
      {...restProps}
      className={`
        ${styles.headerRight}
        ${className || ""}`}
    >
      <button
        type="button"
        className={styles.cancelBtn}
        onClick={onClickCancel}
      >
        <XIcon />
      </button>
    </div>
  );
};

const Main = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...restProps} className={`${styles.main} ${className || ""}`}>
      {children}
    </div>
  );
};

const Info = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p {...restProps} className={`${styles.info} ${className || ""}`}>
      {children}
    </p>
  );
};

const InfoContent = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <ModalContent
      {...restProps}
      className={`${styles.info} ${className || ""}`}
    >
      {children}
    </ModalContent>
  );
};

const Question = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p {...restProps} className={`${styles.question} ${className || ""}`}>
      {children}
    </p>
  );
};

const QuestionContent = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <ModalContent
      {...restProps}
      className={`${styles.question} ${className || ""}`}
    >
      {children}
    </ModalContent>
  );
};

const Footer = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...restProps} className={`${styles.footer} ${className || ""}`}>
      {children}
    </div>
  );
};

const CancelButton = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <ModalCancelButton
      {...restProps}
      className={`${styles.closeBtn} ${className || ""}`}
    >
      {children}
    </ModalCancelButton>
  );
};

const ConfirmButton = ({
  className,
  children,
  ...restProps
}: HTMLAttributes<HTMLButtonElement>) => {
  return (
    <ModalConfirmButton
      {...restProps}
      className={`${styles.closeBtn} ${styles.confirmBtn} ${className || ""}`}
    >
      {children}
    </ModalConfirmButton>
  );
};

interface SubButtonProps extends HTMLAttributes<HTMLButtonElement> {
  confirmType: ModalConfirmType;
}

const SubButton = ({ className, children, ...restProps }: SubButtonProps) => {
  return (
    <ModalSubButton
      {...restProps}
      className={`${styles.closeBtn} ${styles.subBtn} ${className || ""}`}
    >
      {children}
    </ModalSubButton>
  );
};

interface AsyncButtonProps extends HTMLAttributes<HTMLButtonElement> {
  duration?: number;
  confirmType: ModalConfirmType;
  setCallbackResult?: (result?: boolean) => void;
}

const Button = ({
  className,
  confirmType,
  children,
  ...restProps
}: AsyncButtonProps) => {
  const btnType = (() => {
    switch (confirmType) {
      case true:
        return styles.confirmBtn;
      case false:
        return styles.cancelBtn;
      default:
        return styles.subBtn;
    }
  })();

  return (
    <ModalButton
      {...restProps}
      confirmType={confirmType}
      className={`${styles.closeBtn} ${btnType} ${className || ""}`}
    >
      {children}
    </ModalButton>
  );
};

const MarginBox = ({
  className,
  ...restProps
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div {...restProps} className={`${styles.marginBox} ${className || ""}`} />
  );
};

interface ModalBaseProps extends HTMLAttributes<HTMLDivElement> {
  type?: "confirm" | "alert" | "warn" | "error" | "success" | "info";
}

const ModalBase = ({
  className,
  children,
  type,
  ...restProps
}: ModalBaseProps) => {
  const modalType = useMemo(() => {
    switch (type) {
      case "confirm":
        return styles.confirm;
      case "alert":
        return styles.alert;
      case "warn":
        return styles.warn;
      case "error":
        return styles.error;
      case "success":
        return styles.success;
      case "info":
        return styles.info;
      default:
        return "";
    }
  }, [type]);

  return (
    <div
      {...restProps}
      className={`${styles.modal} ${modalType} ${className || ""}`}
    >
      <div className={styles.modalContainer}>{children}</div>
    </div>
  );
};

ModalBase.Header = Header;
ModalBase.HeaderLeft = HeaderLeft;
ModalBase.HeaderRight = HeaderRight;
ModalBase.Tag = Tag;
ModalBase.CircleIconBox = CircleIconBox;
ModalBase.Title = Title;
ModalBase.Main = Main;
ModalBase.Info = Info;
ModalBase.InfoContent = InfoContent;
ModalBase.Question = Question;
ModalBase.QuestionContent = QuestionContent;
ModalBase.Footer = Footer;
ModalBase.CancelButton = CancelButton;
ModalBase.ConfirmButton = ConfirmButton;
ModalBase.SubButton = SubButton;
ModalBase.Button = Button;
ModalBase.MarginBox = MarginBox;

export default ModalBase;

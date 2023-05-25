import { useEffect, useMemo, useState } from "react";
import { ModalCallbackType, ModalFiber, ModalOptions } from "../entities/types";

import styles from "./Modal.module.scss";

interface ModalProps extends ModalFiber {
  breakPoint: number;
}

const Modal = ({ breakPoint, component: Component, options }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const { coverColor, coverOpacity, duration, position, isClose } = options;

  const transition = useMemo(
    () =>
      duration && duration > 0 ? `all ${duration / 1000}s ease-in-out` : "",
    [duration]
  );

  const modalOptions: ModalOptions = useMemo(
    () => ({
      ...options,
      closeModal: (callback?: ModalCallbackType, props?: any) => {
        setIsOpen(false);
        options.closeModal(callback, props);
      },
    }),
    [options]
  );

  const modalPosition = useMemo(() => {
    const settedPosition =
      typeof position === "function" ? position(breakPoint) : position;

    switch (settedPosition) {
      case "top":
        return styles.top;
      case "center":
        return styles.center;
      case "bottom":
        return styles.bottom;
      case "left":
        return styles.left;
      case "right":
        return styles.right;
      default:
        return styles.center;
    }
    // eslint-disable-next-line
  }, [breakPoint]);

  const coverCallback = useMemo(() => {
    const { coverCallbackType } = options;

    switch (coverCallbackType) {
      case "none":
        return undefined;

      case "cancel":
        return {
          callback: options.cancelModalCallback,
          props: options.cancelModalCallbackProps,
        };
      case "confirm":
        return {
          callback: options.confirmModalCallback,
          props: options.confirmModalCallbackProps,
        };
      case "sub":
        return {
          callback: options.subModalCallback,
          props: options.subModalCallbackProps,
        };
      default:
        return {
          // eslint-disable-next-line
          callback: () => {},
          props: {},
        };
    }
  }, [options]);

  const onCloseModal = () => {
    if (isPending || !coverCallback) {
      return;
    }
    const { callback, props } = coverCallback;

    modalOptions.closeModal(callback, props);
  };

  useEffect(() => {
    let asyncOpenModal: NodeJS.Timeout | null = null;
    let asyncPendingModal: NodeJS.Timeout | null = null;

    if (setTimeout) {
      asyncOpenModal = setTimeout(() => {
        setIsOpen(true);
      }, 10);
      asyncPendingModal = setTimeout(() => {
        setIsPending(false);
      }, (options.duration || 0) + 10);
    } else {
      setIsOpen(true);
      setIsPending(false);
    }

    return () => {
      if (clearTimeout) {
        asyncOpenModal && clearTimeout(asyncOpenModal);
        asyncPendingModal && clearTimeout(asyncPendingModal);
      }
      setIsOpen(false);
      setIsPending(false);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isOpen) {
      // eslint-disable-next-line
      return () => {};
    }
    let asyncPendingModal: NodeJS.Timeout | null = null;

    setIsPending(true);

    if (setTimeout) {
      asyncPendingModal = setTimeout(() => {
        setIsPending(false);
      }, options.duration || 0);
    } else {
      setIsPending(false);
    }

    return () => {
      if (clearTimeout) {
        asyncPendingModal && clearTimeout(asyncPendingModal);
      }
    };
    // eslint-disable-next-line
  }, [isOpen]);

  useEffect(() => {
    if (!isPending && isClose) {
      modalOptions.closeModal();
    }
    // eslint-disable-next-line
  }, [isClose, isPending]);

  return (
    <div className={styles.modal}>
      <button
        className={`${styles.closeModalCover} ${isOpen ? "" : styles.close}`}
        style={{
          backgroundColor: coverColor || "rgb(0, 0, 0)",
          opacity: coverOpacity || 0.5,
          transition,
        }}
        type="button"
        onClick={onCloseModal}
      >
        {" "}
      </button>
      <div className={styles.modalContentContainer}>
        <div
          className={`${styles.modalContent} ${modalPosition} ${
            isOpen ? styles.open : ""
          }`}
          style={{
            transition,
          }}
        >
          <Component {...modalOptions} />
        </div>
      </div>
    </div>
  );
};

export default Modal;

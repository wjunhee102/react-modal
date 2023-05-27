import { useEffect, useMemo, useState } from "react";
import ModalManager from "../services/modalManager";
import { ModalCallbackType, ModalFiber, ModalOptions } from "../entities/types";

import "./modal.css";

interface ModalProps extends ModalFiber {
  modalManager: ModalManager;
  breakPoint: number;
}

const Modal = ({ modalManager, breakPoint, component: Component, options }: ModalProps) => {
  const [isInit, setInit] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(true);

  const { coverColor, coverOpacity, duration, transitionOptions, position, isClose } = options;

  const transition = modalManager.getModalTrainsition(duration, transitionOptions);

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

  const modalPosition = (() => {
    const settedPosition =
      typeof position === "function" ? position(breakPoint) : position;

    const {
      initial,
      active,
      final
    } = modalManager.getModalPosition(settedPosition);

    if (!isInit) {
      return initial;
    }

    if (isOpen) {
      return active;
    }

    return final;
  })();

  const onCloseModal = () => {
    if (isPending || !coverCallback || modalManager.getIsPending()) {
      console.log("pending", isPending, !coverCallback, modalManager.getIsPending());
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
        setInit(true);
      }, 10);
      asyncPendingModal = setTimeout(() => {
        setIsPending(false);
      }, (options.duration || 0) + 10);
    } else {
      setIsOpen(true);
      setInit(true);
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
    <div className="modalWrapper-r">
      <button
        className={`closeModalCover-r ${isOpen ? "" : "close-r"}`}
        style={{
          backgroundColor: coverColor || "rgb(0, 0, 0)",
          opacity: coverOpacity || 0.5,
          ...transition,
        }}
        type="button"
        onClick={onCloseModal}
      >
        {" "}
      </button>
      <div className="modalContentContainer-r">
        <div
          className="modalContent-r"
          style={{
            ...modalPosition,
            ...transition,
            pointerEvents: (!isPending || isOpen) ? "auto" : "none"
          }}
        >
          <Component {...modalOptions} />
        </div>
      </div>
    </div>
  );
};

export default Modal;

import React, { useEffect, useMemo, useState } from "react";
import ModalManager from "../services/modalManager";
import ModalContext from "../services/modalContext";
import {
  ModalActionType,
  ModalFiber,
  ModalOptions,
  ModalPositionState,
} from "../entities/types";
import { MODAL_POSITION, MODAL_POSITION_STATE } from "../contants/constants";
import { delay } from "../utils/delay";

interface ModalProps extends ModalFiber {
  modalManager: ModalManager;
  breakPoint: number;
  isPending: boolean;
}

const Modal = ({
  modalManager,
  breakPoint,
  isPending,
  options,
  component: Component,
}: ModalProps) => {
  const [positionState, setPositionState] = useState<ModalPositionState>(
    MODAL_POSITION_STATE.initial
  );

  const { isClose, backCoverActionType } = options;

  const isActive = positionState === MODAL_POSITION_STATE.active;

  const modalOptions: ModalOptions = useMemo(
    () => ({
      ...options,
      closeModal: (actionType?: ModalActionType) => {
        if (isPending) {
          return;
        }
        setPositionState(MODAL_POSITION_STATE.final);
        options.closeModal(actionType);
      },
      positionState,
    }),
    [options, isPending, positionState]
  );

  const {
    modalStyle,
    backCoverStyle,
  }: {
    modalStyle: React.CSSProperties;
    backCoverStyle: React.CSSProperties;
  } = useMemo(() => {
    const {
      backCoverColor,
      backCoverOpacity,
      duration,
      transitionOptions,
      position,
    } = options;

    const settedPosition =
      typeof position === "function" ? position(breakPoint) : position;

    const backCoverPosition = modalManager.getCurrentModalPosition(
      positionState,
      MODAL_POSITION.backCover
    );
    const modalPosition = modalManager.getCurrentModalPosition(
      positionState,
      settedPosition
    );
    const transition = modalManager.getModalTrainsition(
      duration,
      transitionOptions
    );
    const isActiveState = positionState === MODAL_POSITION_STATE.active;

    return {
      modalStyle: {
        pointerEvents: isActiveState ? "auto" : "none",
        ...transition,
        ...modalPosition,
      },
      backCoverStyle: {
        cursor: isActiveState ? "pointer" : "default",
        ...transition,
        ...backCoverPosition,
        background:
          (isActiveState && backCoverColor) || backCoverPosition.background,
        opacity:
          (isActiveState && backCoverOpacity) || backCoverPosition.opacity,
      },
    };
  }, [options, modalManager, breakPoint, positionState]);

  const onCloseModal = () => {
    if (isPending || modalManager.getIsPending()) {
      return;
    }
    modalOptions.closeModal(backCoverActionType);
  };

  useEffect(() => {
    let asyncOpenModal: NodeJS.Timeout | null = null;

    if (setTimeout) {
      asyncOpenModal = setTimeout(() => {
        setPositionState(MODAL_POSITION_STATE.active);
      }, 10);
    } else {
      setPositionState(MODAL_POSITION_STATE.active);
    }

    return () => {
      if (clearTimeout) {
        asyncOpenModal && clearTimeout(asyncOpenModal);
      }
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (positionState === MODAL_POSITION_STATE.active) {
      return;
    }

    const { duration, call } = options;

    call(delay, duration ?? 0);
    // eslint-disable-next-line
  }, [positionState]);

  useEffect(() => {
    if (!isPending && isClose) {
      modalOptions.closeModal();
    }
    // eslint-disable-next-line
  }, [isClose, isPending]);

  return (
    <div className="modalWrapper-r">
      <button
        className={`closeModalCover-r ${isActive ? "" : "close-r"}`}
        style={backCoverStyle}
        type="button"
        onClick={onCloseModal}
      >
        {" "}
      </button>
      <div className="modalContentContainer-r">
        <div className="modalContent-r" style={modalStyle}>
          <ModalContext.Provider value={modalOptions}>
            <Component {...modalOptions} />
          </ModalContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Modal;
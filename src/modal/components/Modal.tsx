import { useEffect, useMemo, useState } from "react";
import ModalManager from "../services/modalManager";
import { 
  ModalCallbackType, 
  ModalFiber, 
  ModalOptions, 
  ModalPositionState 
} from "../entities/types";
import { 
  MODAL_CALLBACK_TYPE, 
  MODAL_POSITION, 
  MODAL_POSITION_STATE 
} from "../contants/constants";
import { delay } from "../utils/delay";

interface ModalProps extends ModalFiber {
  modalManager: ModalManager;
  breakPoint: number;
  isPending: boolean;
}

const Modal = (
  { 
    modalManager, 
    breakPoint, 
    isPending,
    options, 
    component: Component 
  }: ModalProps
) => {
  const [positionState, setPositionState] = useState<ModalPositionState>(MODAL_POSITION_STATE.initial);

  const { isClose } = options;

  const isActive = positionState === MODAL_POSITION_STATE.active;

  const modalOptions: ModalOptions = useMemo(
    () => ({
      ...options,
      closeModal: (callback?: ModalCallbackType, props?: any) => {
        if (isPending) {
          return;
        }
        setPositionState(MODAL_POSITION_STATE.final);
        options.closeModal(callback, props);
      },
    }),
    [options, isPending]
  );

  const backCoverCallback = useMemo(() => {
    const { backCoverCallbackType } = options;

    switch (backCoverCallbackType) {
      case MODAL_CALLBACK_TYPE.block:
        return undefined;

      case MODAL_CALLBACK_TYPE.cancel:
        return {
          callback: options.cancelModalCallback,
          props: options.cancelModalCallbackProps,
        };
      case MODAL_CALLBACK_TYPE.confirm:
        return {
          callback: options.confirmModalCallback,
          props: options.confirmModalCallbackProps,
        };
      case MODAL_CALLBACK_TYPE.sub:
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
    
    const backCoverStyle = modalManager.getCurrentModalPosition(positionState, MODAL_POSITION.backCover);
    const modalStyle = modalManager.getCurrentModalPosition(positionState, settedPosition);
    const transition = modalManager.getModalTrainsition(duration, transitionOptions);
    const isActiveState = positionState === MODAL_POSITION_STATE.active;

    return {
      modalStyle: {
        pointerEvents: isActiveState ? "auto" : "none",
        ...transition,
        ...modalStyle,
      },
      backCoverStyle: {
        cursor: isActiveState ? "pointer" : "default",
        ...transition,
        ...backCoverStyle,
        background: (isActiveState && backCoverColor) || backCoverStyle.background,
        opacity: (isActiveState && backCoverOpacity) || backCoverStyle.opacity,
      }
    }
  }, [
    options, 
    modalManager, 
    breakPoint, 
    positionState
  ]);

  const onCloseModal = () => {
    if (
      isPending || 
      !backCoverCallback || 
      modalManager.getIsPending()
    ) {
      return;
    }
    const { callback, props } = backCoverCallback;

    modalOptions.closeModal(callback, props);
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

    const {
      duration,
      call,
    } = options;

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
        <div
          className="modalContent-r"
          style={modalStyle}
        >
          <Component {...modalOptions} />
        </div>
      </div>
    </div>
  );
};

export default Modal;

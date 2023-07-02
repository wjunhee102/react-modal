import {
  CloseModal,
  ModalCallback,
  ModalDispatchOptions,
} from "../entities/types";

function setDuration(duration: number) {
  const appliedDuration = duration;

  return appliedDuration < 0 ? 0 : appliedDuration;
}

interface GetCloseModalPropsNew {
  id: number;
  options: ModalDispatchOptions;
  callback: any;
  closeModal: any;
  getIsPending: () => boolean;
  startPending: () => void;
  endPending: () => void;
}

function setCloseModal(setModal: (state: boolean) => void) {
  return function (
    {
    id,
    options,
    closeModal,
    getIsPending,
    startPending,
    endPending,
  }: GetCloseModalPropsNew
  ) {
    const { duration, callback } = options;

    /**
     * setCloseModal에서는 positionState를 바꾸는 함수와
     * actionState를 바꾸는 함수를 받을 예정.
     */

    /**
     * 1.
     * callback을 선행 실행
     * actionState(pending)으로 변경
     * 결과값 전달
     * boolean이면 actionState = "success" | "error"로 변경
     * function을 받으면 closeModal과 같이 실행
     * 
     * 중요한 접은 눌렀을 때 콜백을 실행하고 콜백이 함수를 리턴하면 애니메이션이 끝나는 지점에서 한번 더 실행 시키는 게 목적임.
     */

  }
}

export function getCloseModalNew({
  id,
  options,
  closeModal,
  getIsPending,
  startPending,
  endPending,
}: GetCloseModalProps): ModalCallback {
  const { duration, callback } = options;

  const close: ModalCallback = (actionType) => {
    startPending();

    const removedName = callback && callback(actionType);

    if (!removedName) {
      closeModal(id);
      endPending();

      return;
    }

    closeModal([id, removedName]);
    endPending();
  };

  if (duration === undefined) {
    return (actionType) => {
      const isPending = getIsPending();

      if (isPending) {
        return;
      }

      close(actionType);
    };
  }

  const appliedDuration = setDuration(duration);

  return (actionType) => {
    const isPending = getIsPending();
    if (isPending) {
      return;
    }

    if (setTimeout === undefined) {
      close(actionType);
      return;
    }

    setTimeout(() => {
      close(actionType);
    }, appliedDuration);
  };
}


interface GetCloseModalProps {
  id: number;
  options: ModalDispatchOptions;
  closeModal: CloseModal;
  getIsPending: () => boolean;
  startPending: () => void;
  endPending: () => void;
}

export function getCloseModal({
  id,
  options,
  closeModal,
  getIsPending,
  startPending,
  endPending,
}: GetCloseModalProps): ModalCallback {
  const { duration, callback } = options;

  const close: ModalCallback = (actionType) => {
    startPending();

    const removedName = callback && callback(actionType);

    if (!removedName) {
      closeModal(id);
      endPending();

      return;
    }

    closeModal([id, removedName]);
    endPending();
  };

  if (duration === undefined) {
    return (actionType) => {
      const isPending = getIsPending();

      if (isPending) {
        return;
      }

      close(actionType);
    };
  }

  const appliedDuration = setDuration(duration);

  return (actionType) => {
    const isPending = getIsPending();
    if (isPending) {
      return;
    }

    if (setTimeout === undefined) {
      close(actionType);
      return;
    }

    setTimeout(() => {
      close(actionType);
    }, appliedDuration);
  };
}

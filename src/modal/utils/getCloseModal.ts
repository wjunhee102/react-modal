import {
  CloseModal,
  ModalCallback,
  ModalDispatchOptions,
} from "../entities/types";

function setDuration(duration: number) {
  const settedDuration = duration;

  return settedDuration < 0 ? 0 : settedDuration;
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

  const settedDuration = setDuration(duration);

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
    }, settedDuration);
  };
}

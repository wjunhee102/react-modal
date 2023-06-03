import {
  CloseModal,
  ModalCallback,
  ModalDispatchOptions,
} from "../entities/types";

function setDuration(duration: number) {
  const appliedDuration = duration;

  return appliedDuration < 0 ? 0 : appliedDuration;
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

import {
  ModalCallbackType,
  ModalDispatchOptions,
} from "../entities/types";
import ModalManager from "../services/modalManager";

function setDuration(duration: number) {
  const appliedDuration = duration;

  return appliedDuration < 0 ? 0 : appliedDuration;
}

interface GetCloseModalProps {
  id: number,
  options: ModalDispatchOptions,
  modalManager: ModalManager,
}

export function getCloseModal({
  id,
  options,
  modalManager,
}: GetCloseModalProps): ModalCallbackType {
  const { duration, essentialCallback, essentialCallbackProps } = options;
  const closeModal = modalManager.remove;

  const close = (callback?: ModalCallbackType, props?: any) => {
    modalManager.startPending();

    essentialCallback && essentialCallback(essentialCallbackProps);
    const removedName = callback && callback(props);

    if (!removedName) {
      closeModal(id);
      modalManager.endPending();

      return;
    }

    closeModal([id, removedName]);
    modalManager.endPending();
  };

  if (duration === undefined) {
    return (callback?: ModalCallbackType, props?: any) => {
      const isPending = modalManager.getIsPending();

      if (isPending) {
        return;
      }

      close(callback, props);
    };
  }

  const appliedDuration = setDuration(duration);

  return (callback?: ModalCallbackType, props?: any) => {
    const isPending = modalManager.getIsPending();
    if (isPending) {
      return;
    }

    if (setTimeout === undefined) {
      close(callback, props);
      return;
    }

    setTimeout(() => {
      close(callback, props);
    }, appliedDuration);
  };
}

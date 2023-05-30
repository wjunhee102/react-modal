import {
  CloseModal,
  ModalCallbackType,
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
}: GetCloseModalProps): ModalCallbackType {
  const { duration, essentialCallback, essentialCallbackProps } = options;

  const close = (callback?: ModalCallbackType, props?: any) => {
    startPending();

    essentialCallback && essentialCallback(essentialCallbackProps);
    const removedName = callback && callback(props);

    if (!removedName) {
      closeModal(id);
      endPending();

      return;
    }

    closeModal([id, removedName]);
    endPending();
  };

  if (duration === undefined) {
    return (callback?: ModalCallbackType, props?: any) => {
      const isPending = getIsPending();

      if (isPending) {
        return;
      }

      close(callback, props);
    };
  }

  const settedDuration = setDuration(duration);

  return (callback?: ModalCallbackType, props?: any) => {
    const isPending = getIsPending();
    if (isPending) {
      return;
    }

    if (setTimeout === undefined) {
      close(callback, props);
      return;
    }

    setTimeout(() => {
      close(callback, props);
    }, settedDuration);
  };
}

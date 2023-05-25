import {
  CloseModal,
  ModalCallbackType,
  ModalDispatchOptions,
} from "../entities/types";

function setDuration(duration: number) {
  const settedDuration = duration;

  return settedDuration < 0 ? 0 : settedDuration;
}

export function getCloseModal(
  id: number,
  closeModal: CloseModal,
  options: ModalDispatchOptions
): ModalCallbackType {
  const { duration, essentialCallback, essentialCallbackProps } = options;

  const close = (callback?: ModalCallbackType, props?: any) => {
    essentialCallback && essentialCallback(essentialCallbackProps);
    const removedName = callback && callback(props);

    if (!removedName) {
      closeModal(id);
      return;
    }

    closeModal([id, removedName]);
  };

  if (duration === undefined) {
    return close;
  }

  const settedDuration = setDuration(duration);

  return (callback?: ModalCallbackType, props?: any) => {
    if (setTimeout === undefined) {
      close(callback, props);
      return;
    }

    setTimeout(() => {
      close(callback, props);
    }, settedDuration);
  };
}

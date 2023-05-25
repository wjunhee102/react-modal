import { useEffect, useState } from "react";
import ModalManager from "../services/modalManager";
import { ModalFiber } from "../entities/types";

function setUseIsOpenModal(defaultModalManager: ModalManager) {
  return (modalManager: ModalManager = defaultModalManager) => {
    const [isOpenModal, setIsOpen] = useState<boolean>(false);

    useEffect(() => {
      const listener = (modalFiberStack: ModalFiber[]) => {
        setIsOpen(modalFiberStack.length > 0);
      };

      modalManager.subscribe(listener);

      return () => {
        modalManager.unSubscribe(listener);
      };
    }, [modalManager]);

    return isOpenModal;
  };
}

export default setUseIsOpenModal;

import { useEffect, useState } from "react";
import ModalManager from "../services/modalManager";
import { ModalComponentFiber, ModalFiber } from "../entities/types";
import disableBodyScroll from "../utils/disableBodyScroll";
import Modal from "./Modal";

import styles from "./Modal.module.scss";

interface ModalDispatcherProps {
  modalManager?: ModalManager;
  modalComponentMeta?: ModalComponentFiber | ModalComponentFiber[];
  disableScroll?: boolean;
}

function setModalDispatcher(defaultModalManager: ModalManager) {
  return function ModalDispatcher({
    modalManager = defaultModalManager,
    modalComponentMeta,
    disableScroll = true,
  }: ModalDispatcherProps) {
    const [modalFiberList, setModalFiberList] = useState<ModalFiber[]>([]);
    const [breakPoint, setBreakPoint] = useState(window?.innerWidth ?? 0);
    const [isOpen, setIsOpen] = useState(false);

    const onClearModal = () => {
      if (isOpen && modalFiberList.length > 0) {
        modalManager.popModalFiber("clear");
      }
    };

    useEffect(() => {
      const listener = (modalFiberStack: ModalFiber[]) => {
        setModalFiberList(modalFiberStack);
      };

      if (modalComponentMeta) {
        modalManager.setModalComponent(modalComponentMeta);
      }

      modalManager.subscribe(listener);
      setModalFiberList(modalManager.getModalFiberStack());

      return () => {
        modalManager.unSubscribe(listener);
      };
      // eslint-disable-next-line
  }, [modalManager]);

    useEffect(() => {
      let asyncOpenModal: NodeJS.Timeout | null = null;

      if (modalFiberList.length > 0) {
        setIsOpen(true);
        disableBodyScroll(disableScroll);
      } else if (setTimeout) {
        asyncOpenModal = setTimeout(() => {
          setIsOpen(false);
          disableBodyScroll(false);
        }, 0);
      } else {
        setIsOpen(false);
        disableBodyScroll(false);
      }

      return () => {
        if (clearTimeout && asyncOpenModal) {
          clearTimeout(asyncOpenModal);
        }
      };
      // eslint-disable-next-line
    }, [modalFiberList]);

    useEffect(() => {
      const listener = () => {
        setBreakPoint(window.innerWidth);
      };

      window.addEventListener("resize", listener);

      return () => {
        window.removeEventListener("resize", listener);
        disableBodyScroll(false);
      };
    }, []);

    return (
      <div className={`${styles.modalDispatcher} ${isOpen ? styles.open : ""}`}>
        <button
          type="button"
          className={styles.modalClearBtn}
          onClick={onClearModal}
        >
          {" "}
        </button>
        {modalFiberList.map((modalFiber) => (
          <Modal key={modalFiber.id} breakPoint={breakPoint} {...modalFiber} />
        ))}
      </div>
    );
  };
}

export default setModalDispatcher;

import { useEffect, useState } from "react";
import ModalManager from "../services/modalManager";
import {
  ModalComponentFiber,
  ModalFiber,
  ModalListener,
  ModalManagerOptionsProps,
} from "../entities/types";
import disableBodyScroll from "../utils/disableBodyScroll";
import Modal from "./Modal";

import "./modal.css";

interface ModalDispatcherProps {
  modalManager?: ModalManager;
  modalMeta?: ModalComponentFiber | ModalComponentFiber[];
  options?: ModalManagerOptionsProps<any>;
  disableScroll?: boolean;
}

function setModalDispatcher(defaultModalManager: ModalManager) {
  return function ModalDispatcher({
    modalManager = defaultModalManager,
    modalMeta,
    options,
    disableScroll = true,
  }: ModalDispatcherProps) {
    const [modalFiberList, setModalFiberList] = useState<ModalFiber[]>([]);
    const [breakPoint, setBreakPoint] = useState(window?.innerWidth ?? 0);
    const [isOpen, setIsOpen] = useState(false);
    const [isPending, setIsPending] = useState(false);

    const onClearModal = () => {
      if (
        isOpen && 
        modalFiberList.length > 0 &&
        !isPending
      ) {
        modalManager.popModalFiber("clear");
      }
    };

    useEffect(() => {
      const listener: ModalListener = ({
        modalFiberStack,
        isPending: pending,
      }) => {
        setModalFiberList(modalFiberStack);
        setIsPending(pending);
      };

      if (modalMeta) {
        modalManager.setModalComponent(modalMeta);
      }

      if (options) {
        modalManager.initModalOptions(options);
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
      <div className={`modalDispatcher-r ${isOpen ? "open-r" : ""}`}>
        <button
          type="button"
          className="modalClearBtn-r"
          onClick={onClearModal}
        >
          {" "}
        </button>
        {modalFiberList.map((modalFiber) => (
          <Modal 
            key={modalFiber.id} 
            breakPoint={breakPoint} 
            modalManager={modalManager}
            isPending={isPending}
            {...modalFiber} 
          />
        ))}
      </div>
    );
  };
}

export default setModalDispatcher;

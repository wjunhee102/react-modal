import { useEffect, useState } from "react";
import { ModalDispatchOptions, ModalOptions } from "../entities/types";
import ModalManager from "../services/modalManager";

interface ModalRegistratorProps {
  open?: boolean;
  setOpen?: (open: boolean) => void;
  name?: string;
  modalManager?: ModalManager;
  options?: ModalDispatchOptions;
  children: (options: ModalOptions) => React.ReactElement;
}

const setModalRegistrator = (defaultModalManager: ModalManager) =>
  function ModalRegistrator({
    open,
    setOpen,
    children,
    name,
    modalManager = defaultModalManager,
    options = {},
  }: ModalRegistratorProps) {
    const [modalId, setModalId] = useState<number>(-1);
    const [currentName, setCurrentName] = useState<string>("");

    const essentialCallback = (props?: any) => {
      setOpen && setOpen(false);
      options && options.essentialCallback && options.essentialCallback(props);
    };

    const modalOptions = {
      ...options,
      essentialCallback,
    };

    if (name) {
      modalManager.setModalComponent({
        name,
        component: children,
      });
    }

    useEffect(() => {
      if (!name) {
        // eslint-disable-next-line
      return () => {};
      }

      if (currentName !== name) {
        setCurrentName(name);
      }

      return () => {
        modalManager.removeModalComponent(name);
      };
      // eslint-disable-next-line
  }, [name]);

    useEffect(() => {
      if (!open) {
        if (modalId === -1) {
          return;
        }

        modalManager.edit(modalId, { isClose: true });
        setModalId(-1);
        return;
      }

      const id = modalManager.open(name || children, modalOptions);
      setModalId(id);
      // eslint-disable-next-line
  }, [open]);

    return null;
  };

export default setModalRegistrator;

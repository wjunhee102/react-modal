import Manager from "./services/modalManager";
import setController from "./utils/setModalController";
import setRegistrator from "./components/ModalRegistrator";
import setDispatcher from "./components/ModalDispatcher";
import setUseIsOpen from "./hooks/useIsOpenModal";
import ConfirmButton from "./components/ModalConfirmButton";
import CancelButton from "./components/ModalCancelButton";
import SubButton from "./components/ModalSubButton";
import Content from "./components/ModalContent";
import Title from "./components/ModalTitle";
import {
  ModalOptions as Options,
  ModalActionType as ActionType,
  ModalCallback as Callback,
  ModalComponent as Component,
  ModalComponentFiber as ComponentFiber,
} from "./entities/types";

export const ModalManager = Manager;
export const setModalController = setController;
export const setModalProvider = setDispatcher;
export const setModal = setRegistrator;
export const setUseIsOpenModal = setUseIsOpen;

export const defaultModalManager = new Manager();
export const modalController = setController(defaultModalManager);
export const ModalProvider = setDispatcher(defaultModalManager);
export const Modal = setRegistrator(defaultModalManager);
export const ModalConfirmButton = ConfirmButton;
export const ModalCancelButton = CancelButton;
export const ModalSubButton = SubButton;
export const ModalContent = Content;
export const ModalTitle = Title;
export const useIsOpenModal = setUseIsOpen(defaultModalManager);
export const openModal = modalController.open;
export const closeModal = modalController.close;

export type ModalOptions = Options;
export type ModalActionType = ActionType;
export type ModalCallback = Callback;
export type ModalFC = Component;
export type ModalMeta = ComponentFiber;


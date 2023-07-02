import Manager from "./services/modalManager";
import setController from "./utils/setModalController";
import setRegistrator from "./components/ModalRegistrator";
import setDispatcher from "./components/ModalDispatcher";
import setUseIsOpen from "./hooks/useIsOpenModal";
import ConfirmButton from "./components/ModalConfirmButton";
import CancelButton from "./components/ModalCancelButton";
import SubButton from "./components/ModalSubButton";
import Button from "./components/ModalButton";
import Content from "./components/ModalContent";
import Title from "./components/ModalTitle";
import {
  ModalOptions as Options,
  ModalComponent as Component,
  ModalComponentFiber as ComponentFiber,
} from "./types";
import {
  ModalConfirmType as ConfirmType,
  ModalCallback as Callback,
} from "./services/modalStateManager";
import { ModalBase as Base } from "./modal-components";
import modalMetaList from "./modalMetaList";

export const defaultModalManager = new Manager();
export const modalController = setController(defaultModalManager);
export const ModalProvider = setDispatcher(defaultModalManager);
export const Modal = setRegistrator(defaultModalManager);
export const ModalConfirmButton = ConfirmButton;
export const ModalCancelButton = CancelButton;
export const ModalSubButton = SubButton;
export const ModalButton = Button;
export const ModalContent = Content;
export const ModalTitle = Title;
export const ModalBase = Base;
export const useIsOpenModal = setUseIsOpen(defaultModalManager);
export const openModal = modalController.open;
export const closeModal = modalController.close;

export type ModalOptions = Options;
export type ModalConfirmType = ConfirmType;
export type ModalCallback = Callback;
export type ModalFC = Component;
export type ModalMeta = ComponentFiber;

/**
 * @description
 * 모달을 추가하실려면 modalMetaList에 추가해주세요.
 */
defaultModalManager.setModalComponent(modalMetaList);

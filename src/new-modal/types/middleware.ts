import { ModalActionState, ModalConfirmType, ModalLifecycleState, ModalTransactionState } from "./common";
import { ModalCallback } from "./controller";

export interface ModalState {
  confirm: ModalConfirmType;
  callback: ModalCallback;
  isAwaitingConfirm: boolean;
  isCloseDelay: boolean; 
  closeDelay: number;
  actionState: ModalActionState;
  open: () => void;
  active: () => void;
  close: () => void;
}

export interface ModalMiddlewareProps {
  transactionState: ModalTransactionState;
  standbyTransaction: () => void;
  startTransaction: () => void;
  endTransaction: () => void;
  modalState: ModalState;
}

export type ModalMiddleware = (
  props: ModalMiddlewareProps
) => void | Promise<void>;
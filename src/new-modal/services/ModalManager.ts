import { ModalTransactionState } from "../types/common";
import { ModalComponent } from "../types/component";
import { ModalBackCoverOptions, ModalContentsOptions, ModalOptions, ModalTransitionOptions } from "../types/options";
import Modal from "./Modal";

type ModalManagerListener = (modalStack: Modal[], transactionState: ModalTransactionState) => void;

interface ModalSeed {
  component: ModalComponent;
  options: ModalOptions;
}

type ModalMap = Map<string, ModalSeed>;

class ModalManager {
  private currentId: number = 0;
  private callCount: number = 0;
  private transactionState: ModalTransactionState = "idle";
  private modalStack: Modal[] = []; 
  private listeners: ModalManagerListener[] = [];
  private transitionOptions: ModalTransitionOptions = {
    transitionDelay: 0,
    transitionProperty: "",
    transitionDuration: 0,
    transitionTimingFunction: "",
  }
  private backCoverOptions: ModalBackCoverOptions = {
    backCoverConfirm: null,
    backCoverColor: "",
    backCoverOpacity: 0,
  }
  private contentsOptions: ModalContentsOptions = {
    title: null,
    contents: null,
    confirmContents: null,
    cancelContents: null,
    subContents: null,
  }

}
export type DefaultModalName = "clear" | "unknown";

export type ModalRemovedName = DefaultModalName | string | string[];

export type ModalPosition = "center" | "bottom" | "top" | "left" | "right";
export interface ModalDispatchOptions {
  confirmModalCallback?: (props?: any) => void;
  cancelModalCallback?: (props?: any) => void;
  subModalCallback?: (props?: any) => void;
  essentialCallback?: (props?: any) => void;
  confirmModalCallbackProps?: any;
  cancelModalCallbackProps?: any;
  subModalCallbackProps?: any;
  essentialCallbackProps?: any;
  coverCallbackType?: "confirm" | "cancel" | "sub" | "none" | "block";
  coverColor?: string;
  coverOpacity?: number;
  title?: React.ReactNode;
  content?: React.ReactNode;
  confirmContent?: React.ReactNode;
  cancelContent?: React.ReactNode;
  subContent?: React.ReactNode;
  payload?: any;
  duration?: number;
  position?: ((breakPoint: number) => ModalPosition) | ModalPosition;
  required?: boolean;
}

export type ModalCallbackType = (
  payload?: any
) => void | undefined | ModalRemovedName | string;

export interface EditModalOptionsProps extends ModalDispatchOptions {
  isClose?: boolean;
}

export interface ModalOptions extends EditModalOptionsProps {
  closeModal: (callback?: ModalCallbackType, props?: any) => void;
}

export type CloseModalProps =
  | ModalRemovedName
  | number
  | [number, ModalRemovedName];

export type CloseModal = (closeModalProps: CloseModalProps) => void;

export type ModalComponent = React.FC<ModalOptions>;

export interface ModalComponentFiber {
  name: string;
  component: ModalComponent;
  defaultOptions?: ModalDispatchOptions;
}

export interface ModalFiber<T extends ModalDispatchOptions = ModalOptions> {
  id: number;
  name: string;
  component: ModalComponent;
  options: T;
}

export type ModalListener = (
  modalFiberStack: ModalFiber<ModalOptions>[]
) => void;

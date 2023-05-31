export interface ModalListenerProps {
  modalFiberStack: ModalFiber<ModalOptions>[];
  isPending: boolean;
}

export type ModalListener = (
  listenerProps: ModalListenerProps
) => void;

export type DefaultModalName = "clear" | "unknown";

export type ModalRemovedName = DefaultModalName | string | string[];

export interface ModalTransition {
  transitionProperty: string;
  transitionDuration: string;
  transitionTimingFunction: string;
  transitionDelay: string;
}

export type ModalTransitionProps = {
  [key in keyof ModalTransition]?: ModalTransition[key];
}

export type DefaultModalPosition = "default" | 
  "backCover" |
  "bottom" | 
  "top" | 
  "left" | 
  "right" | 
  "center" | 
  "leftCenterRight" | 
  "rightCenterLeft"
;

export interface PositionStyle {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  transform?: string;
  opacity?: number;
  background?: string;
}

export type ModalPositionState = "initial" | "active" | "final";

export type ModalPositionStyle = {
  [key in ModalPositionState]: PositionStyle;
}

export type ModalPositionTable<T extends string = string> = {
  [key in (DefaultModalPosition | T)]: ModalPositionStyle;
}

export type ModalPositionMap<T extends string = string> = Map<T | DefaultModalPosition, ModalPositionStyle>;

export type ModalTransitionOptions = Omit<ModalTransitionProps, "transitionDuration">;

export interface ModalManagerOptionsProps<T extends string> {
  position?: ModalPositionTable<T>;
  transition?: ModalTransitionOptions;
  duration?: number;
  backCoverColor?: string;
  backCoverOpacity?: number;
}

export type ModalBackCoverCallbackType = "confirm" | "cancel" | "sub" | "none" | "block";

export interface ModalDispatchOptions<T extends string = string> {
  confirmCallback?: (props?: any) => void;
  cancelCallback?: (props?: any) => void;
  subCallback?: (props?: any) => void;
  essentialCallback?: (props?: any) => void;
  confirmCallbackProps?: any;
  cancelCallbackProps?: any;
  subCallbackProps?: any;
  essentialCallbackProps?: any;
  backCoverCallbackType?: ModalBackCoverCallbackType;
  backCoverColor?: string;
  backCoverOpacity?: number;
  title?: React.ReactNode | React.ReactElement;
  content?: React.ReactNode | React.ReactElement;
  confirmContent?: React.ReactNode | React.ReactElement;
  cancelContent?: React.ReactNode | React.ReactElement;
  subContent?: React.ReactNode | React.ReactElement;
  payload?: any;
  duration?: number;
  transitionOptions?: ModalTransitionOptions;
  position?: ((breakPoint: number) => DefaultModalPosition | T) | DefaultModalPosition | T;
  required?: boolean;
}

export type ModalCallbackType = (
  payload?: any
) => void | undefined | ModalRemovedName | string;

export interface EditModalOptionsProps<T extends string = string> extends ModalDispatchOptions<T> {
  isClose?: boolean;
}

export type ModalAsyncCall<T = any, P = any> = (asyncCallback: (props: P) => T, asyncCallbackProps: P) => Promise<T>;

export interface ModalOptions<T extends string = string> extends EditModalOptionsProps<T> {
  closeModal: (callback?: ModalCallbackType, props?: any) => void;
  call: ModalAsyncCall;
  positionState: ModalPositionState;
}

export type CloseModalProps =
  | ModalRemovedName
  | number
  | [number, ModalRemovedName];

export type CloseModal = (closeModalProps: CloseModalProps) => void;

export type ModalComponent = React.FC<ModalOptions>;

export interface ModalComponentFiber<T extends string = string> {
  name: string;
  component: ModalComponent;
  defaultOptions?: ModalDispatchOptions<T>;
}

export interface ModalFiber<T extends ModalDispatchOptions = ModalOptions> {
  id: number;
  name: string;
  component: ModalComponent;
  options: T;
}
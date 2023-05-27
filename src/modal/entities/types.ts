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

export type DefaultModalPosition = "center" | "bottom" | "top" | "left" | "right" | "default";

export interface PositionStyle {
  left?: string;
  right?: string;
  top?: string;
  bottom?: string;
  transform?: string;
  opacity?: number;
}

export interface ModalPositionStyle {
  initial: PositionStyle;
  active: PositionStyle;
  final: PositionStyle;
}

export type ModalPositionTable<T extends string = string> = {
  [key in (DefaultModalPosition | T)]: ModalPositionStyle;
}

export type ModalPositionMap<T extends string = string> = Map<T | DefaultModalPosition, ModalPositionStyle>;

export interface ModalManagerOptionsProps<T extends string> {
  position?: ModalPositionTable<T>;
  transition?: ModalTransition;
}

export type ModalTransitionOptions = Omit<ModalTransitionProps, "transitionDuration">;


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
  title?: React.ReactNode | React.ReactElement;
  content?: React.ReactNode | React.ReactElement;
  confirmContent?: React.ReactNode | React.ReactElement;
  cancelContent?: React.ReactNode | React.ReactElement;
  subContent?: React.ReactNode | React.ReactElement;
  payload?: any;
  duration?: number;
  transitionOptions?: ModalTransitionOptions;
  position?: ((breakPoint: number) => DefaultModalPosition | string) | DefaultModalPosition | string;
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

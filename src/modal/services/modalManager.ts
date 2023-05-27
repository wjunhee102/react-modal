import { DEFAULT_POSITION, DEFAULT_TRANSITION, MODAL_NAME, MODAL_POSITION } from "../contants/constants";
import {
  ModalListener,
  ModalComponentFiber,
  ModalComponent,
  ModalFiber,
  ModalOptions,
  ModalRemovedName,
  ModalDispatchOptions,
  CloseModalProps,
  EditModalOptionsProps,
  ModalPositionMap,
  ModalPositionTable,
  ModalTransition,
  ModalManagerOptionsProps,
  ModalTransitionProps,
  ModalPositionStyle,
  ModalTransitionOptions,
} from "../entities/types";
import { checkDefaultModalName } from "../utils/checkDefaultModalName";
import { getCloseModal } from "../utils/getCloseModal";

class ModalManager<T extends string = string> {
  private currentId: number = 0;
  private isPending: boolean = false;
  private modalFiberStack: ModalFiber[] = [];
  private listeners: ModalListener[] = [];
  private modalComponentFiberMap: Map<string, ModalComponentFiber> = new Map();
  private modalPositionMap: ModalPositionMap = new Map();
  private modalTransition: ModalTransition = DEFAULT_TRANSITION;

  constructor(
    baseModalComponentFiber: ModalComponentFiber[] = [], 
    options: ModalManagerOptionsProps<T> = {}
  ) {
    baseModalComponentFiber.forEach(this.setModalComponentFiberMap);
    this.initModalOptions(options);

    this.call = this.call.bind(this);
    this.open = this.open.bind(this);
    this.remove = this.remove.bind(this);
    this.edit = this.edit.bind(this);
    this.close = this.close.bind(this);
  }

  private setModalComponentFiberMap(componentFiber: ModalComponentFiber) {
    const { name, component, defaultOptions } = componentFiber;

    if (component === undefined || checkDefaultModalName(name)) {
      return;
    }

    const currentModalComponentFiber = this.modalComponentFiberMap.get(name);

    if (
      currentModalComponentFiber &&
      currentModalComponentFiber.defaultOptions?.required
    ) {
      return;
    }

    const modalComponentFiber = {
      ...componentFiber,
      defaultOptions: {
        ...defaultOptions,
        duration: defaultOptions?.duration ?? 250,
        coverCallbackType: defaultOptions?.coverCallbackType ?? "cancel",
      },
    };

    this.modalComponentFiberMap.set(name, modalComponentFiber);
  }

  private initModalOptions(optionsProps: ModalManagerOptionsProps<T>) {
    const { position, transition } = optionsProps;
  
    const initialPosition: ModalPositionTable = {
      ...DEFAULT_POSITION,
      ...position,
    }

    this.setModalPosition(initialPosition);
    this.setModalTransition(transition);
  }

  private getSettedModalFiber(
    modalFiber: ModalFiber<ModalDispatchOptions>
  ): ModalFiber<ModalOptions> {
    const { id, options } = modalFiber;

    const closeModal = getCloseModal({ id, options, modalManager: this });

    const settedModalFiber: ModalFiber<ModalOptions> = {
      ...modalFiber,
      options: {
        ...modalFiber.options,
        closeModal,
      },
    };

    return settedModalFiber;
  }

  getIsPending() {
    return this.isPending;
  }

  getModalFiberStack() {
    return this.modalFiberStack;
  }

  getCurrentModalFiberId() {
    if (this.modalFiberStack.length === 0) {
      return 0;
    }

    return this.modalFiberStack[this.modalFiberStack.length - 1].id;
  }

  getModalTrainsition(duration: number = -1, options: ModalTransitionOptions = {}): ModalTransition {
    if (duration < 0) {
      return {
        ...this.modalTransition, 
        ...options
      };
    }

    const transitionDuration = `${duration}ms`;

    return {
      ...this.modalTransition,
      transitionDuration,
      ...options,
    }
  }

  getModalPositionMap() {
    return this.modalPositionMap;
  }

  getModalPosition(key: string = MODAL_POSITION.center): ModalPositionStyle{
    const position = this.modalPositionMap.get(key);

    if (!position) {
      const center = this.modalPositionMap.get(MODAL_POSITION.center);

      return center || DEFAULT_POSITION.center;
    }

    return position;
  }

  setModalTransition(transitionProps?: ModalTransitionProps) {
    if (transitionProps === undefined) {
      return this;
    }

    const transition = {
      ...this.modalTransition,
      ...transitionProps,
    }
    
    this.modalTransition = transition;

    return this;
  }

  setModalPosition(modalPositionTable: ModalPositionTable<T>) {
    const modalPositionList = Object.entries(modalPositionTable);

    modalPositionList.forEach(([key, value]) => {
      this.modalPositionMap.set(key, value);
    });

    return this;
  }

  setIsPending(isPending: boolean) {
    this.isPending = isPending;

    return this.isPending;
  }

  setModalComponent(
    componentFiber: ModalComponentFiber | ModalComponentFiber[]
  ) {
    if (Array.isArray(componentFiber)) {
      componentFiber.forEach((fiber) => this.setModalComponentFiberMap(fiber));
    } else {
      this.setModalComponentFiberMap(componentFiber);
    }

    return this;
  }

  removeModalComponent(name: string | string[]) {
    if (Array.isArray(name)) {
      name.forEach((n) => {
        this.modalComponentFiberMap.delete(n);
      });

      this.modalFiberStack = this.modalFiberStack.filter(
        (fiber) => !name.includes(fiber.name)
      );
    } else {
      this.modalComponentFiberMap.delete(name);

      this.modalFiberStack = this.modalFiberStack.filter(
        (fiber) => fiber.name !== name
      );
    }

    return this;
  }

  subscribe(listener: ModalListener) {
    this.listeners.push(listener);

    return this;
  }

  unSubscribe(listener: ModalListener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  async call<T = any, P =any>(asyncCallback: (props: P) => T, asyncCallbackProps: P) {
    if (typeof asyncCallback !== "function") {
      return;
    }

    this.setIsPending(true);

    try {
      const data = await asyncCallback(asyncCallbackProps);
    
      return data;
    } catch (e) {
      return e;
    } finally {
      this.setIsPending(false);
    }
  }

  notify() {
    this.listeners.forEach((listener) => listener(this.modalFiberStack));
  }

  editModalFiberProps(id: number, props: EditModalOptionsProps) {
    let fiberId = 0;

    this.modalFiberStack = this.modalFiberStack.map((fiber) => {
      if (fiber.id !== id) {
        return fiber;
      }

      fiberId = fiber.id;

      return { ...fiber, options: { ...fiber.options, ...props } };
    });

    this.notify();

    return fiberId;
  }

  pushModalFiber(
    modalFiber:
      | ModalFiber<ModalDispatchOptions>
      | ModalFiber<ModalDispatchOptions>[]
  ) {
    let settedModalFiberStack: ModalFiber<ModalOptions>[];

    if (Array.isArray(modalFiber)) {
      settedModalFiberStack = modalFiber.map((fiber) =>
        this.getSettedModalFiber(fiber)
      );
    } else {
      settedModalFiberStack = [this.getSettedModalFiber(modalFiber)];
    }

    this.modalFiberStack = [...this.modalFiberStack, ...settedModalFiberStack];

    this.notify();
  }

  filterModalFiberByType(name: string | string[]) {
    if (Array.isArray(name)) {
      this.modalFiberStack = this.modalFiberStack.filter(
        (fiber) => !name.includes(fiber.name)
      );
    } else {
      this.modalFiberStack = this.modalFiberStack.filter(
        (fiber) => fiber.name !== name
      );
    }

    return this;
  }

  popModalFiber(removedName?: ModalRemovedName) {
    if (this.modalFiberStack.length === 0) {
      this.currentId = 0;
      this.notify();

      return;
    }

    if (removedName === undefined) {
      this.modalFiberStack = this.modalFiberStack.slice(0, -1);
    } else if (removedName === MODAL_NAME.clear) {
      this.modalFiberStack = [];
      this.currentId = 0;
    } else {
      this.filterModalFiberByType(removedName);
    }

    this.notify();
  }

  /**
   * @param name
   * @param options
   * @returns 현재 등록된 모달의 id를 반환합니다. 만약 등록되지 않은 모달이라면 0을 반환합니다.
   */
  open(name: string | ModalComponent, options: ModalDispatchOptions = {}) {
    if (typeof name === "string") {
      const componentFiber = this.modalComponentFiberMap.get(name);

      if (componentFiber === undefined) {
        return 0;
      }

      const { component, defaultOptions } = componentFiber;

      this.currentId += 1;

      const modalFiber: ModalFiber<ModalDispatchOptions> = {
        id: this.currentId,
        name,
        component,
        options: {
          ...defaultOptions,
          ...options,
        },
      };

      this.pushModalFiber(modalFiber);

      return this.currentId;
    }

    if (typeof name !== "function") {
      return 0;
    }

    this.currentId += 1;

    this.pushModalFiber({
      id: this.currentId,
      name: "unknown",
      component: name,
      options,
    });

    return this.currentId;
  }

  /**
   * @param removedName
   * @returns 마지막으로 등록된 모달의 id를 반환합니다. 만약 등록된 모달이 없다면 0을 반환합니다.
   */
  remove(removedName?: CloseModalProps) {
    if (typeof removedName === "number") {
      this.modalFiberStack = this.modalFiberStack.filter(
        (fiber) => fiber.id !== removedName
      );
      this.notify();

      return this.getCurrentModalFiberId();
    }

    if (Array.isArray(removedName)) {
      this.modalFiberStack = this.modalFiberStack.filter(
        (fiber) => fiber.id !== removedName[0]
      );

      this.popModalFiber(removedName[1]);

      return this.getCurrentModalFiberId();
    }

    this.popModalFiber(removedName);

    return this.getCurrentModalFiberId();
  }

  /**
   *
   * @param id
   * @param props
   * @returns 마지막으로 등록된 모달의 id를 반환합니다. 만약 등록된 모달이 없다면 0을 반환합니다.
   */
  edit(id: number, props: EditModalOptionsProps) {
    return this.editModalFiberProps(id, props);
  }

  /**
   * @param id
   * @returns 마지막으로 등록된 모달의 id를 반환합니다. 만약 등록된 모달이 없다면 0을 반환합니다.
   */
  close(id: number) {
    return this.editModalFiberProps(id, { isClose: false });
  }
}

export default ModalManager;

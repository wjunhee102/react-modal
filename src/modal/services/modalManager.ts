import {
  DEFAULT_DURATION,
  DEFAULT_POSITION,
  DEFAULT_TRANSITION,
  MODAL_NAME,
  MODAL_POSITION,
  MODAL_POSITION_STATE,
} from "../contants/constants";
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
  ModalPositionState,
  ModalListenerProps,
} from "../entities/types";
import { checkDefaultModalName } from "../utils/checkDefaultModalName";
import { getCloseModal } from "../utils/getCloseModal";
import { getPositionKey } from "../utils/getPositionKey";

class ModalManager<T extends string = string> {
  private currentId: number = 0;
  private callCount: number = 0;
  private isPending: boolean = false;
  private modalFiberStack: ModalFiber[] = [];
  private listeners: ModalListener[] = [];
  private modalComponentFiberMap: Map<string, ModalComponentFiber> = new Map();
  private modalPositionMap: ModalPositionMap = new Map();
  private modalTransition: ModalTransition = DEFAULT_TRANSITION;
  private modalDuration: number = DEFAULT_DURATION;

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

    this.getIsPending = this.getIsPending.bind(this);
    this.startPending = this.startPending.bind(this);
    this.endPending = this.endPending.bind(this);
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
        duration: defaultOptions?.duration || this.modalDuration,
        coverCallbackType: defaultOptions?.backCoverCallbackType ?? "cancel",
      },
    };

    this.modalComponentFiberMap.set(name, modalComponentFiber);
  }

  private getSettedModalFiber(
    modalFiber: ModalFiber<ModalDispatchOptions>
  ): ModalFiber<ModalOptions> {
    const { id, options } = modalFiber;

    const closeModal = getCloseModal({
      id,
      options,
      closeModal: this.remove,
      getIsPending: this.getIsPending,
      startPending: this.startPending,
      endPending: this.endPending,
    });

    const settedModalFiber: ModalFiber<ModalOptions> = {
      ...modalFiber,
      options: {
        ...modalFiber.options,
        closeModal,
        call: this.call,
      },
    };

    return settedModalFiber;
  }

  getCallCount() {
    return this.callCount;
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

  getModalTrainsition(
    duration: number = -1,
    options: ModalTransitionOptions = {}
  ): ModalTransition {
    if (duration < 0) {
      return {
        ...this.modalTransition,
        ...options,
      };
    }

    const transitionDuration = `${duration}ms`;

    return {
      ...this.modalTransition,
      transitionDuration,
      ...options,
    };
  }

  getModalPositionMap() {
    return this.modalPositionMap;
  }

  getModalPosition(key: string = MODAL_POSITION.center): ModalPositionStyle {
    const position = this.modalPositionMap.get(key);

    if (!position) {
      const center = this.modalPositionMap.get(MODAL_POSITION.center);

      return center ?? DEFAULT_POSITION.center;
    }

    return position;
  }

  getCurrentModalPosition(
    positionState: ModalPositionState,
    position: string = MODAL_POSITION.center
  ) {
    let state: ModalPositionState = positionState;
    let key: string = position;

    const positionKey = getPositionKey(position, state);

    if (Array.isArray(positionKey)) {
      state = positionKey[0];
      key = positionKey[1];
    } else {
      key = positionKey;
    }

    const {
      initial: defaultInitial,
      active: defaultActive,
      final: defautFinal,
    } = this.getModalPosition(MODAL_POSITION.default);

    const { initial, active, final } = this.getModalPosition(key);

    if (state === MODAL_POSITION_STATE.initial) {
      return {
        ...defaultInitial,
        ...initial,
      };
    }

    if (state === MODAL_POSITION_STATE.active) {
      return {
        ...defaultActive,
        ...active,
      };
    }

    return {
      ...defautFinal,
      ...final,
    };
  }

  initModalOptions(optionsProps: ModalManagerOptionsProps<T>) {
    const { position, transition, duration } = optionsProps;

    const initialPosition: ModalPositionTable = {
      ...DEFAULT_POSITION,
      ...position,
    };

    this.setModalPosition(initialPosition);
    this.setModalTransition(transition);
    this.setModalDuration(duration);
  }

  setModalTransition(transitionProps?: ModalTransitionProps) {
    if (transitionProps === undefined) {
      return this;
    }

    const transition = {
      ...this.modalTransition,
      ...transitionProps,
    };

    this.modalTransition = transition;

    return this;
  }

  setModalDuration(duration: number = -1) {
    if (duration < 0) {
      return this;
    }

    this.modalDuration = duration;
    this.setModalTransition({ transitionDuration: `${duration}ms` });

    return this;
  }

  setModalPosition(modalPositionTable: ModalPositionTable<T>) {
    const modalPositionList = Object.entries(modalPositionTable);

    modalPositionList.forEach(([key, value]) => {
      this.modalPositionMap.set(key, value);
    });

    return this;
  }

  setCallCount(command: "add" | "remove") {
    if (command === "add") {
      this.callCount += 1;
    } else {
      this.callCount -= 1;
    }

    return this.callCount;
  }

  setIsPending(isPending: boolean) {
    this.isPending = isPending;
    this.notify();

    return isPending;
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

  startPending() {
    this.setIsPending(true);
    this.callCount += 1;

    return this.callCount;
  }

  endPending() {
    this.callCount -= 1;

    if (this.callCount < 1) {
      this.setIsPending(false);
    }

    return this.callCount;
  }

  notify() {
    const listenerProps: ModalListenerProps = {
      modalFiberStack: this.modalFiberStack,
      isPending: this.isPending,
    };

    this.listeners.forEach((listener) => listener(listenerProps));
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

  async call<F = any, P = any>(
    asyncCallback: (props: P) => F,
    asyncCallbackProps: P
  ) {
    if (typeof asyncCallback !== "function") {
      throw new Error("modalManager.ts line 372: not function");
    }

    this.startPending();

    try {
      const data = await asyncCallback(asyncCallbackProps);

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }

      if (typeof error === "string") {
        throw new Error(error);
      }

      throw new Error("modalManager.ts line 383: not error");
    } finally {
      this.endPending();
    }
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

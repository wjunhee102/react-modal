import { 
  DefaultModalName, 
  DefaultModalPosition, 
  ModalPositionTable, 
  ModalPositionState, 
  ModalTransition,
} from "../entities/types";

export const MODAL_NAME: {
  [key in DefaultModalName]: key;
} = {
  clear: "clear",
  unknown: "unknown",
};

export const DEFAULT_DURATION = 300;

export const DEFAULT_TRANSITION: ModalTransition = {
  transitionProperty: "opacity, transform, left, top, bottom, right, background, background-color",
  transitionDuration: `${DEFAULT_DURATION}ms`,
  transitionDelay: "0ms",
  transitionTimingFunction: "cubic-bezier(0.25, 0.1, 0.25, 1)",
}

export const MODAL_POSITION_STATE: {
  [key in ModalPositionState]: key
} = {
  initial: "initial",
  active: "active",
  final: "final",
}

export const MODAL_POSITION_STATE_LIST: string[] = [
  MODAL_POSITION_STATE.initial,
  MODAL_POSITION_STATE.active,
  MODAL_POSITION_STATE.final,
]

export const MODAL_POSITION: {
  [key in DefaultModalPosition]: key;
} = {
  default: "default",
  backCover: "backCover",
  center: "center",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
  leftTop: "leftTop",
  leftBottom: "leftBottom",
  rightTop: "rightTop",
  rightBottom: "rightBottom",
}

export const DEFAULT_POSITION: ModalPositionTable = {
  [MODAL_POSITION.default]: {
    [MODAL_POSITION_STATE.initial]: {
      opacity: 0,
    },
    [MODAL_POSITION_STATE.active]: {
      opacity: 1,
    },
    [MODAL_POSITION_STATE.final]: {
      opacity: 0,
    }
  },
  [MODAL_POSITION.backCover]: {
    [MODAL_POSITION_STATE.initial]: {
      top: "0",
      left: "0",
      background: "rgb(0, 0, 0)",
      opacity: 0,
    },
    [MODAL_POSITION_STATE.active]: {
      top: "0",
      left: "0",
      background: "rgb(0, 0, 0)",
      opacity: 0.5,
    },
    [MODAL_POSITION_STATE.final]: {
      top: "0",
      left: "0",
      background: "rgb(0, 0, 0)",
      opacity: 0,
    }
  },
  [MODAL_POSITION.center]: {
    [MODAL_POSITION_STATE.initial]: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) scale(0)",
    },
    [MODAL_POSITION_STATE.active]: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) scale(1)",
    },
    [MODAL_POSITION_STATE.final]: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) scale(0)",
    }
  },
  [MODAL_POSITION.bottom]: {
    [MODAL_POSITION_STATE.initial]: {
      left: "50%",
      top: "100%",
      transform: "translate(-50%, 0)"
    },
    [MODAL_POSITION_STATE.active]: {
      left: "50%",
      top: "100%",
      transform: "translate(-50%, -100%)",
    },
    [MODAL_POSITION_STATE.final]: {
      left: "50%",
      top: "100%",
      transform: "translate(-50%, 0)",
    }
  },
  [MODAL_POSITION.top]: {
    [MODAL_POSITION_STATE.initial]: {
      left: "50%",
      top: "0",
      transform: "translate(-50%, -100%)",
    },
    [MODAL_POSITION_STATE.active]: {
      left: "50%",
      top: "0",
      transform: "translate(-50%, 0)",
    },
    [MODAL_POSITION_STATE.final]: {
      left: "50%",
      top: "0",
      transform: "translate(-50%, -100%)",
    }
  },
  [MODAL_POSITION.left]: {
    [MODAL_POSITION_STATE.initial]: {
      left: "0",
      top: "50%",
      transform: "translate(-100%, -50%)"
    },
    [MODAL_POSITION_STATE.active]: {
      left: "0",
      top: "50%",
      transform: "translate(0, -50%)",
    },
    [MODAL_POSITION_STATE.final]: {
      left: "0",
      top: "50%",
      transform: "translate(-100%, -50%)",
    }
  },
  [MODAL_POSITION.right]: {
    [MODAL_POSITION_STATE.initial]: {
      left: "100%",
      top: "50%",
      transform: "translate(0, -50%)",
    },
    [MODAL_POSITION_STATE.active]: {
      left: "100%",
      top: "50%",
      transform: "translate(-100%, -50%)",
    },
    [MODAL_POSITION_STATE.final]: {
      left: "100%",
      top: "50%",
      transform: "translate(0, -50%)",
    }
  },
  [MODAL_POSITION.leftTop]: {
    [MODAL_POSITION_STATE.initial]: {
      left: "0",
      top: "0",
      transform: "translate(-100%, -100%) scale(0)"
    },
    [MODAL_POSITION_STATE.active]: {
      left: "0",
      top: "0",
      transform: "translate(0, 0) scale(1)",
    },
    [MODAL_POSITION_STATE.final]: {
      left: "0",
      top: "0",
      transform: "translate(-100%, -100%) scale(0)",
    }
  },
  [MODAL_POSITION.leftBottom]: {
    [MODAL_POSITION_STATE.initial]: {
      left: "0",
      top: "100%",
      transform: "translate(-100%, 0) scale(0)"
    },
    [MODAL_POSITION_STATE.active]: {
      left: "0",
      top: "100%",
      transform: "translate(0, -100%) scale(1)",
    },
    [MODAL_POSITION_STATE.final]: {
      left: "0",
      top: "100%",
      transform: "translate(-100%, 0) scale(0)",
    }
  },
  [MODAL_POSITION.rightTop]: {
    [MODAL_POSITION_STATE.initial]: {
      left: "100%",
      top: "0",
      transform: "translate(0, -100%) scale(0)"
    },
    [MODAL_POSITION_STATE.active]: {
      left: "100%",
      top: "0",
      transform: "translate(-100%, 0) scale(1)",
    },
    [MODAL_POSITION_STATE.final]: {
      left: "100%",
      top: "0",
      transform: "translate(0, -100%) scale(0)",
    }
  },
  [MODAL_POSITION.rightBottom]: {
    [MODAL_POSITION_STATE.initial]: {
      left: "100%",
      top: "100%",
      transform: "translate(0, 0) scale(0)"
    },
    [MODAL_POSITION_STATE.active]: {
      left: "100%",
      top: "100%",
      transform: "translate(-100%, -100%) scale(1)",
    },
    [MODAL_POSITION_STATE.final]: {
      left: "100%",
      top: "100%",
      transform: "translate(0, 0) scale(0)",
    }
  }
}
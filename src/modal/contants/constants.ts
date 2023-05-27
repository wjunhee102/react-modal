import { 
  DefaultModalName, 
  DefaultModalPosition, 
  ModalPositionTable, 
  ModalTransition
} from "../entities/types";

export const MODAL_NAME: {
  [key in DefaultModalName]: key;
} = {
  clear: "clear",
  unknown: "unknown",
};

export const DEFAULT_TRANSITION: ModalTransition = {
  transitionProperty: "all",
  transitionDuration: "300ms",
  transitionDelay: "0ms",
  transitionTimingFunction: "ease-in-out",
}

export const MODAL_POSITION: {
  [key in DefaultModalPosition]: key;
} = {
  default: "default",
  center: "center",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
}

export const DEFAULT_POSITION: ModalPositionTable = {
  default: {
    initial: {
      opacity: 0,
    },
    active: {
      opacity: 1,
    },
    final: {
      opacity: 0,
    }
  },
  center: {
    initial: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) scale(0)",
    },
    active: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) scale(1)",
    },
    final: {
      left: "50%",
      top: "50%",
      transform: "translate(-50%, -50%) scale(0)",
    }
  },
  bottom: {
    initial: {
      left: "50%",
      bottom: "0px",
      transform: "translate(-50%, 100%)"
    },
    active: {
      left: "50%",
      bottom: "0px",
      transform: "translate(-50%, 0)",
    },
    final: {
      left: "50%",
      bottom: "0px",
      transform: "translate(-50%, 100%)",
    }
  },
  top: {
    initial: {
      left: "50%",
      top: "0px",
      transform: "translate(-50%, -100%)",
    },
    active: {
      left: "50%",
      top: "0px",
      transform: "translate(-50%, 0)",
    },
    final: {
      left: "50%",
      top: "0px",
      transform: "translate(-50%, -100%)",
    }
  },
  left: {
    initial: {
      left: "0px",
      top: "50%",
      transform: "translate(-100%, -50%)"
    },
    active: {
      left: "0px",
      top: "50%",
      transform: "translate(0, -50%)",
    },
    final: {
      left: "0px",
      top: "50%",
      transform: "translate(-100%, -50%)",
    }
  },
  right: {
    initial: {
      right: "0px",
      top: "50%",
      transform: "translate(100%, -50%)",
    },
    active: {
      right: "0px",
      top: "50%",
      transform: "translate(0, -50%)",
    },
    final: {
      right: "0px",
      top: "50%",
      transform: "translate(100%, -50%)",
    }
  }
}
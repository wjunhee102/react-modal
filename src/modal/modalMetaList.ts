import { Alert, Confirm, Success, Warn, Error, Info } from "./modal-components";
import { ModalComponentFiber } from "./types";

const modalMetaList: ModalComponentFiber[] = [
  {
    name: "alert",
    component: Alert,
    defaultOptions: {
      required: true,
    },
  },
  {
    name: "confirm",
    component: Confirm,
    defaultOptions: {
      required: true,
      closeDelay: 800,
      position: (breakPoints) => (breakPoints > 425 ? "center" : "bottom"),
    },
  },
  {
    name: "success",
    component: Success,
    defaultOptions: {
      required: true,
    },
  },
  {
    name: "warn",
    component: Warn,
    defaultOptions: {
      duration: 400,
      required: true,
      position: "active-center",
    },
  },
  {
    name: "error",
    component: Error,
    defaultOptions: {
      duration: 400,
      required: true,
      position: "active-center",
    },
  },
  {
    name: "info",
    component: Info,
    defaultOptions: {
      required: true,
    },
  },
];

export default modalMetaList;

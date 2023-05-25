import { DefaultModalName } from "../entities/types";

export const MODAL_NAME: {
  [key in DefaultModalName]: key;
} = {
  clear: "clear",
  unknown: "unknown",
};

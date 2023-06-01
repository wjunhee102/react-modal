import { createContext } from "react";
import { ModalOptions } from "../entities/types";

const ModalContext = createContext<ModalOptions | null>(null);

export default ModalContext;
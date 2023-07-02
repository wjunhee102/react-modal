import { useContext } from "react";
import ModalContext from "../services/modalContext";

function useModalOptions() {
  return useContext(ModalContext);
}

export default useModalOptions;
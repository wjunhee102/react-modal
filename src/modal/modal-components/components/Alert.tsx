import { ModalComponent } from "../../types";
import ModalBase from "./ModalBase";

const Alert: ModalComponent = () => {
  return (
    <ModalBase type="alert">
      <ModalBase.Header>
        <ModalBase.HeaderLeft>
          <ModalBase.Title>알림</ModalBase.Title>
        </ModalBase.HeaderLeft>
        <ModalBase.HeaderRight />
      </ModalBase.Header>
      <ModalBase.Main>
        <ModalBase.InfoContent />
      </ModalBase.Main>
      <ModalBase.Footer>
        <ModalBase.ConfirmButton />
      </ModalBase.Footer>
    </ModalBase>
  );
};

export default Alert;

import ModalBase from "./ModalBase";
import { ModalComponent } from "../../types";
import ConfirmContent from "./ConfirmContent";

const Confirm: ModalComponent = ({ actionState, message }) => {
  return (
    <ModalBase type="confirm">
      <ModalBase.Header>
        <ModalBase.HeaderLeft>
          <ModalBase.Tag />
          <ModalBase.Title>확인</ModalBase.Title>
        </ModalBase.HeaderLeft>
      </ModalBase.Header>
      <ConfirmContent actionState={actionState} message={message}>
        <ModalBase.Main>
          <ModalBase.InfoContent />
        </ModalBase.Main>
        <ModalBase.Footer>
          <ModalBase.ConfirmButton />
          <ModalBase.MarginBox />
          <ModalBase.CancelButton />
        </ModalBase.Footer>
      </ConfirmContent>
    </ModalBase>
  );
};

export default Confirm;

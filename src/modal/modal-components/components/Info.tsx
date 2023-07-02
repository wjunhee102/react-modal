import { ModalComponent } from "../../types";
import ModalContent from "../../components/ModalContent";
import ModalTitle from "../../components/ModalTitle";
import ModalBase from "./ModalBase";

const Info: ModalComponent = () => (
  <ModalBase type="info">
    <ModalBase.Header>
      <ModalBase.HeaderLeft>
        <ModalTitle>정보</ModalTitle>
      </ModalBase.HeaderLeft>
      <ModalBase.HeaderRight />
    </ModalBase.Header>
    <ModalBase.Main>
      <ModalContent />
    </ModalBase.Main>
    <ModalBase.Footer>
      <ModalBase.CancelButton>닫기</ModalBase.CancelButton>
    </ModalBase.Footer>
  </ModalBase>
);

export default Info;

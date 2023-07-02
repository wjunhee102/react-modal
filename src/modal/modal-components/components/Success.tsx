import ModalBase from "./ModalBase";
import SuccessIcon from "./SuccessIcon";
import { ModalComponent } from "../../types";

import styles from "../Modals.module.scss";

const Success: ModalComponent = () => {
  return (
    <ModalBase type="success">
      <ModalBase.Header>
        <ModalBase.HeaderLeft>
          <ModalBase.Tag className={styles.icon}>
            <ModalBase.CircleIconBox>
              <SuccessIcon />
            </ModalBase.CircleIconBox>
          </ModalBase.Tag>
          <ModalBase.Title>성공</ModalBase.Title>
        </ModalBase.HeaderLeft>
      </ModalBase.Header>
      <ModalBase.Main>
        <ModalBase.InfoContent className={styles.info}>
          성공
        </ModalBase.InfoContent>
      </ModalBase.Main>
      <ModalBase.Footer>
        <ModalBase.ConfirmButton />
      </ModalBase.Footer>
    </ModalBase>
  );
};

export default Success;

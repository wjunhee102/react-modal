import { ModalComponent } from "../../types";
import ModalBase from "./ModalBase";
import WarnIcon from "./WarnIcon";
import { getModalStateStyle } from "../utils/getModalStateStyle";

import styles from "../Modals.module.scss";

const Warn: ModalComponent = ({ lifecycleState }) => {
  return (
    <ModalBase type="warn" className={getModalStateStyle(lifecycleState)}>
      <ModalBase.Header>
        <ModalBase.HeaderLeft>
          <ModalBase.Tag className={styles.icon}>
            <ModalBase.CircleIconBox>
              <WarnIcon />
            </ModalBase.CircleIconBox>
          </ModalBase.Tag>
          <ModalBase.Title>경고</ModalBase.Title>
        </ModalBase.HeaderLeft>
      </ModalBase.Header>
      <ModalBase.Main>
        <ModalBase.InfoContent>경고</ModalBase.InfoContent>
      </ModalBase.Main>
      <ModalBase.Footer>
        <ModalBase.ConfirmButton />
      </ModalBase.Footer>
    </ModalBase>
  );
};

export default Warn;

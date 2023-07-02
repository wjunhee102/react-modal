import ModalBase from "./ModalBase";
import ErrorIcon from "./ErrorIcon";
import { getModalStateStyle } from "../utils/getModalStateStyle";
import { ModalComponent } from "../../types";

import styles from "../Modals.module.scss";

const Error: ModalComponent = ({ lifecycleState }) => {
  return (
    <ModalBase type="error" className={getModalStateStyle(lifecycleState)}>
      <ModalBase.Header>
        <ModalBase.HeaderLeft>
          <ModalBase.Tag className={styles.icon}>
            <ModalBase.CircleIconBox>
              <ErrorIcon />
            </ModalBase.CircleIconBox>
          </ModalBase.Tag>
          <ModalBase.Title>에러</ModalBase.Title>
        </ModalBase.HeaderLeft>
      </ModalBase.Header>
      <ModalBase.Main>
        <ModalBase.InfoContent className={styles.info}>
          에러
        </ModalBase.InfoContent>
      </ModalBase.Main>
      <ModalBase.Footer>
        <ModalBase.ConfirmButton />
      </ModalBase.Footer>
    </ModalBase>
  );
};

export default Error;

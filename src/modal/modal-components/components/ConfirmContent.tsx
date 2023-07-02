import { ReactNode } from "react";

import styles from "../Modals.module.scss";
import { ModalActionState } from "../../services/modalStateManager";

const asyncState: ModalActionState[] = ["pending", "success", "error"];

interface ConfirmCheckMarkProps {
  actionState: ModalActionState;
  message: ReactNode;
}

const ConfirmCheckMark = ({ actionState, message }: ConfirmCheckMarkProps) => {
  if (!asyncState.includes(actionState)) {
    return null;
  }
  return (
    <div className={styles.checkmarkContainer}>
      <div
        className={`${styles.spinnerWrapper} ${
          actionState === "pending" ? "" : styles.loaded
        }`}
        id="wrapper"
      >
        {actionState === "success" || actionState === "pending" ? (
          <>
            <div className={styles.spinner} />
            <svg
              className={styles.checkmark}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <circle className={styles.circle} cx="12" cy="12" r="12" />
              <polyline
                className={styles.check}
                points="5.33333333 12.1666667 10 16.8333333 18.6666667 8.16666667"
              />
            </svg>
          </>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className={styles.xmark}
          >
            <path
              fillRule="evenodd"
              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </div>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};
interface ConfirmContentProps {
  actionState: ModalActionState;
  message: ReactNode;
  children?: React.ReactNode;
}

const ConfirmContent = ({
  actionState,
  message,
  children,
}: ConfirmContentProps) => {
  return (
    <div className={styles.confirmContents}>
      {actionState === "pending" ||
      actionState === "success" ||
      actionState === "error" ? (
        <ConfirmCheckMark actionState={actionState} message={message} />
      ) : (
        children
      )}
    </div>
  );
};

export default ConfirmContent;

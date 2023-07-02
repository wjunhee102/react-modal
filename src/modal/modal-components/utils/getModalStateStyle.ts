import styles from "../Modals.module.scss";

const modalStateStyle = {
  initial: styles.initial,
  active: styles.active,
  final: styles.final,
};

export function getModalStateStyle(state: string) {
  if (Object.prototype.hasOwnProperty.call(modalStateStyle, state)) {
    return modalStateStyle[state as keyof typeof modalStateStyle];
  }

  return modalStateStyle.active;
}

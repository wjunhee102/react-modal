import { DEFAULT_POSITION, MODAL_POSITION_STATE, MODAL_POSITION_STATE_LIST } from "../contants/constants";
import { ModalPositionState } from "../entities/types";

const POSITION_STATE_VALUE = {
  [MODAL_POSITION_STATE.initial]: 0,
  [MODAL_POSITION_STATE.active]: 1,
  [MODAL_POSITION_STATE.final]: 2,
}

export function getPositionKeyByState(positionList: string[]): string | [ModalPositionState, string] {
  if (
    positionList.length < 1 || 
    !MODAL_POSITION_STATE_LIST.includes(positionList[0])
  ) {
    return positionList[0] ?? DEFAULT_POSITION.center;
  }

  return positionList as [ModalPositionState, string];
}

export function getPositionKey(position: string, positionState: ModalPositionState): string | [ModalPositionState, string] {
  const positionList = position.split("-");

  if (positionList.length < 3) {
    return getPositionKeyByState(positionList);
  }

  const positionStateValue = POSITION_STATE_VALUE[positionState];

  return positionList[positionStateValue];
}
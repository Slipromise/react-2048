import {
  ActionType,
  Direction,
  goDirectionMatrixAction,
  InitMatrixAction,
} from 'definitions/Action';

export function initMatrix(
  totalCount: number,
  generateCount: number,
): InitMatrixAction {
  return { type: ActionType.INIT_MATRIX, totalCount, generateCount };
}

export function goDirectionMatrix(
  direction: Direction,
  generateCount: number,
): goDirectionMatrixAction {
  return {
    type: ActionType.GO_DIRECTION_MATRIX,
    direction,
    generateCount,
  };
}

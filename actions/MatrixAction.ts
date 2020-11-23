import {
  ActionType,
  Direction,
  GoDirectionMatrixAction,
  InitMatrixAction,
} from 'definitions/action';

export function initMatrix(
  totalCount: number,
  generateCount = 2,
): InitMatrixAction {
  return { type: ActionType.INIT_MATRIX, totalCount, generateCount };
}

export function goDirectionMatrix(
  direction: Direction,
  generateCount = 1,
): GoDirectionMatrixAction {
  return {
    type: ActionType.GO_DIRECTION_MATRIX,
    direction,
    generateCount,
  };
}

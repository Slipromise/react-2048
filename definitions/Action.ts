export enum ActionType {
  INIT_MATRIX = 'INIT_MATRIX',
  GO_DIRECTION_MATRIX = 'GO_DIRECTION_MATRIX',
}

export enum Direction {
  RIGHT,
  LEFT,
  UP,
  DOWN,
}

export interface InitMatrixAction {
  type: ActionType.INIT_MATRIX;
  totalCount: number;
  generateCount: number;
}

export interface goDirectionMatrixAction {
  type: ActionType.GO_DIRECTION_MATRIX;
  direction: Direction;
  generateCount: number;
}

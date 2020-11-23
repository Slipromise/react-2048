import {
  ActionType,
  GoDirectionMatrixAction,
  InitMatrixAction,
} from 'definitions/action';
import { MatrixItem } from 'definitions/state';
import { Action } from 'redux';
import {
  alignMatrix,
  combineMatrix,
  createMatrix,
  randomGenerate,
  sortMatrix,
  tagPosition,
} from 'utils/matrixOperate';

const initialState: MatrixItem[] = [];

const matrix = (
  state = initialState,
  action: Action<ActionType>,
): MatrixItem[] => {
  switch (action.type) {
    case ActionType.INIT_MATRIX: {
      const { totalCount, generateCount } = action as InitMatrixAction;
      let newState: MatrixItem[] = [];
      newState = createMatrix(totalCount);
      newState = randomGenerate(newState, generateCount);
      newState = tagPosition(newState);
      return newState;
    }
    case ActionType.GO_DIRECTION_MATRIX: {
      const { direction, generateCount } = action as GoDirectionMatrixAction;
      let newState = [...state];
      newState = sortMatrix(newState, direction);
      newState = combineMatrix(newState);
      newState = alignMatrix(newState);
      newState = sortMatrix(newState, direction);
      newState = randomGenerate(newState, generateCount);
      newState = tagPosition(newState);
      return newState;
    }
    default:
      return state;
  }
};

export default matrix;

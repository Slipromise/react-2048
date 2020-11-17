import {
  ActionType,
  Direction,
  goDirectionMatrixAction,
  InitMatrixAction,
} from 'definitions/Action';
import { MatrixItem } from 'definitions/State';
import { Action } from 'redux';

const initialState: MatrixItem[] = [];

let uid = 0;

const matrix = (
  state = initialState,
  action: Action<ActionType>,
): MatrixItem[] => {
  switch (action.type) {
    case ActionType.INIT_MATRIX: {
      const { totalCount, generateCount } = action as InitMatrixAction;
      let newState: MatrixItem[] = [];
      for (let i = 0; i < totalCount; i++) {
        newState.push({
          id: uid++,
          value: 0,
        });
      }
      newState = randomGenerate(newState, generateCount);
      newState = tagPosition(newState);
      return newState;
    }
    case ActionType.GO_DIRECTION_MATRIX: {
      const { direction, generateCount } = action as goDirectionMatrixAction;
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

function randomGenerate(
  matrix: MatrixItem[],
  generateCount: number,
): MatrixItem[] {
  while (generateCount > 0) {
    const zeroItems = matrix.filter((item) => item.value == 0);
    const randomIndex = Math.floor(Math.random() * zeroItems.length);
    zeroItems[randomIndex] && (zeroItems[randomIndex].value = 2);
    generateCount--;
  }
  return matrix;
}

function tagPosition(matrix: MatrixItem[]): MatrixItem[] {
  const baseCount = Math.pow(matrix.length, 1 / 2);
  return matrix.map((item, index) => {
    item.position = { x: index % baseCount, y: Math.floor(index / baseCount) };
    return item;
  });
}

function combineMatrix(matrix: MatrixItem[]): MatrixItem[] {
  const baseCount = Math.pow(matrix.length, 1 / 2);
  matrix = matrix.reduce(combineMatrixReducer(baseCount), []);
  return matrix;
}

function alignMatrix(matrix: MatrixItem[]): MatrixItem[] {
  const baseCount = Math.pow(matrix.length, 1 / 2);
  let tempItems: MatrixItem[] = [];
  matrix = matrix.reduce(
    (
      accumulator: MatrixItem[],
      curr: MatrixItem,
      index: number,
    ): MatrixItem[] => {
      if (curr.value == 0 && index % baseCount != baseCount - 1) {
        tempItems.push(curr);
        return accumulator;
      } else if (index % baseCount == baseCount - 1) {
        const result = [...accumulator, curr, ...tempItems];
        tempItems = [];
        return result;
      }
      return [...accumulator, curr];
    },
    [],
  );
  return matrix;
}

const combineMatrixReducer = (
  baseCount: number,
  tempItem: MatrixItem | null = null,
) => (
  accumulator: MatrixItem[],
  curr: MatrixItem,
  index: number,
): MatrixItem[] => {
  if (
    tempItem == null &&
    curr.value !== 0 &&
    index % baseCount != baseCount - 1
  ) {
    tempItem = curr;
    return accumulator;
  } else if (tempItem != null && tempItem.value == curr.value) {
    const result = [
      ...accumulator,
      {
        id: uid++,
        value: tempItem.value + curr.value,
        origin: [tempItem, curr],
      },
      {
        id: uid++,
        value: 0,
      },
    ];
    tempItem = null;
    return result;
  } else if (tempItem != null && index % baseCount == baseCount - 1) {
    const result = [...accumulator, tempItem, curr];
    tempItem = null;
    return result;
  } else if (
    tempItem != null &&
    tempItem.value != curr.value &&
    curr.value != 0
  ) {
    accumulator = [...accumulator, tempItem];
    tempItem = curr;
    return accumulator;
  }
  return [...accumulator, curr];
};

function sortMatrix(matrix: MatrixItem[], direction: Direction): MatrixItem[] {
  const baseCount = Math.pow(matrix.length, 1 / 2);
  const verticallyResult: MatrixItem[] = [];
  for (let i = 0; i < matrix.length; i++) {
    verticallyResult.push(
      matrix[(i % baseCount) * baseCount + Math.floor(i / baseCount)],
    );
  }
  return direction == Direction.LEFT
    ? matrix
    : direction == Direction.RIGHT
    ? matrix.reverse()
    : direction == Direction.UP
    ? verticallyResult
    : verticallyResult.reverse();
}

export default matrix;

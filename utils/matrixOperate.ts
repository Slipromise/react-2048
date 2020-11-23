import { Direction } from '../definitions/action';
import { MatrixItem } from '../definitions/state';

let uid = 0;

export function randomGenerate(
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

export function tagPosition(matrix: MatrixItem[]): MatrixItem[] {
  const baseCount = Math.pow(matrix.length, 1 / 2);
  return matrix.map((item, index) => {
    item.position = { x: index % baseCount, y: Math.floor(index / baseCount) };
    return item;
  });
}

export function combineMatrix(matrix: MatrixItem[]): MatrixItem[] {
  const baseCount = Math.pow(matrix.length, 1 / 2);
  matrix = matrix.reduce(combineMatrixReducer(baseCount), []);
  return matrix;
}

export function alignMatrix(matrix: MatrixItem[]): MatrixItem[] {
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

export const combineMatrixReducer = (
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

export function sortMatrix(
  matrix: MatrixItem[],
  direction: Direction,
): MatrixItem[] {
  matrix = [...matrix];
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

export function createMatrix(count: number): MatrixItem[] {
  const result: MatrixItem[] = [];
  for (let i = 0; i < count; i++) {
    result.push({
      id: uid++,
      value: 0,
    });
  }
  return result;
}

export function directiveMatrix(
  matrix: MatrixItem[],
): { canLeft: boolean; canRight: boolean; canUp: boolean; canDown: boolean } {
  return {
    canLeft: canLeftMatrix(matrix),
    canRight: canLeftMatrix(sortMatrix([...matrix], Direction.RIGHT)),
    canUp: canLeftMatrix(sortMatrix([...matrix], Direction.UP)),
    canDown: canLeftMatrix(sortMatrix([...matrix], Direction.DOWN)),
  };
}

export function canLeftMatrix(matrix: MatrixItem[]): boolean {
  const baseCount = Math.pow(matrix.length, 1 / 2);
  let tempForwardValue = -1;
  for (let i = 0; i < matrix.length; i++) {
    const element = matrix[i];
    if (tempForwardValue == 0 && element.value != 0) {
      return true;
    } else if (tempForwardValue != 0 && tempForwardValue == element.value) {
      return true;
    }
    tempForwardValue = i % baseCount == baseCount - 1 ? -1 : element.value;
  }
  return false;
}

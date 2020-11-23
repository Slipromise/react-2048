import { createSelector } from 'reselect';

import { GameMode, MatrixItem, Setting, Status } from '../definitions/state';
import { directiveMatrix } from '../utils/matrixOperate';
import { rootState } from '../utils/store';

export const matrixSelector = (state: rootState): MatrixItem[] => state.matrix;

export const matrixDirectiveSelector = createSelector(
  (state: rootState): MatrixItem[] => state.matrix,
  directiveMatrix,
);

export const warpMatrixSelector = createSelector(
  (state: rootState): MatrixItem[] => state.matrix,
  (items): MatrixItem[][] =>
    items.reduce((acc: MatrixItem[][], cur, index, orrin) => {
      let result: MatrixItem[][] = [];
      if (index % Math.pow(orrin.length, 1 / 2) == 0) {
        result = [...acc, [cur]];
      } else {
        const pop = acc.pop() as MatrixItem[];
        result = [...acc, [...pop, cur]];
      }
      return result;
    }, []),
);

export const matrixStatusSelector = createSelector(
  (state: rootState): MatrixItem[] => state.matrix,
  (items): { extraSecond: number; score: number; currentExponent: number } => {
    let extraSecond = 0,
      score = 0;
    let currentExponent = 0;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      let tmpExponent = 0;
      while (item.value > Math.pow(2, tmpExponent)) {
        tmpExponent++;
      }
      item.value;
      score += item.value * (tmpExponent - 1);
      extraSecond += item.value != 0 ? item.value / 2 - 1 : 0;
      currentExponent =
        tmpExponent > currentExponent ? tmpExponent : currentExponent;
    }
    return { extraSecond, score, currentExponent };
  },
);

export const statusSelector = (state: rootState): Status => state.status;

export const settingSelector = (state: rootState): Setting => state.setting;

export const isEndingSelector = (state: rootState): boolean => {
  if (state.matrix.length == 0) {
    return false;
  }
  const { canDown, canLeft, canRight, canUp } = matrixDirectiveSelector(state);
  const { extraSecond, currentExponent } = matrixStatusSelector(state);
  const { goalExponent, gameMode } = state.setting;
  const { countDownSecond } = state.status;
  if (
    currentExponent == goalExponent ||
    (!canDown && !canLeft && !canRight && !canUp) ||
    (extraSecond + countDownSecond <= 0 && gameMode == GameMode.Timer)
  ) {
    return true;
  }
  return false;
};

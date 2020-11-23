import { goDirectionMatrix } from 'actions/matrixAction';
import { Direction } from 'definitions/action';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GestureState } from 'react-use-gesture/dist/types';

import { matrixDirectiveSelector, settingSelector } from './useSelector';

export const generateOnDragEnd = (): ((
  state: GestureState<'drag'>,
) => void) => {
  const dispatch = useDispatch();
  const { canDown, canLeft, canRight, canUp } = useSelector(
    matrixDirectiveSelector,
  );
  const { generateCount } = useSelector(settingSelector);
  return useCallback(
    (gestureState) => {
      const [x, y] = gestureState.direction;
      const action =
        Math.abs(x) > Math.abs(y) && x > 0 && canRight
          ? goDirectionMatrix(Direction.RIGHT, generateCount)
          : Math.abs(x) > Math.abs(y) && x < 0 && canLeft
          ? goDirectionMatrix(Direction.LEFT, generateCount)
          : Math.abs(x) < Math.abs(y) && y > 0 && canDown
          ? goDirectionMatrix(Direction.DOWN, generateCount)
          : Math.abs(x) < Math.abs(y) && y < 0 && canUp
          ? goDirectionMatrix(Direction.UP, generateCount)
          : null;
      action && dispatch(action);
    },
    [canDown, canLeft, canRight, canUp],
  );
};

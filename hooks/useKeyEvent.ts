import { goDirectionMatrix } from 'actions/matrixAction';
import { Direction } from 'definitions/action';
import { KeyCode } from 'definitions/keyCode';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { matrixDirectiveSelector, settingSelector } from './useSelector';

const handleKeys: string[] = [
  KeyCode.a,
  KeyCode.d,
  KeyCode.w,
  KeyCode.s,
  KeyCode.left,
  KeyCode.right,
  KeyCode.up,
  KeyCode.down,
];

const useKeyEvent = (): {
  handleKeys: string[];
  onKeyEvent: (key: string) => void;
} => {
  const dispatch = useDispatch();
  const { canDown, canLeft, canRight, canUp } = useSelector(
    matrixDirectiveSelector,
  );
  const { generateCount } = useSelector(settingSelector);
  const onKeyEvent = useCallback(
    (key) => {
      switch (key) {
        case KeyCode.left:
        case KeyCode.a:
          canLeft && dispatch(goDirectionMatrix(Direction.LEFT, generateCount));
          break;
        case KeyCode.right:
        case KeyCode.d:
          canRight &&
            dispatch(goDirectionMatrix(Direction.RIGHT, generateCount));
          break;
        case KeyCode.up:
        case KeyCode.w:
          canUp && dispatch(goDirectionMatrix(Direction.UP, generateCount));
          break;
        case KeyCode.down:
        case KeyCode.s:
          canDown && dispatch(goDirectionMatrix(Direction.DOWN, generateCount));
          break;
        default:
          break;
      }
    },
    [canDown, canLeft, canRight, canUp],
  );
  return { handleKeys, onKeyEvent };
};
export default useKeyEvent;

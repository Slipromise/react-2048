import { ActionType, CountDownAction } from '../definitions/action';

export const countDownAction = (value: number): CountDownAction => ({
  type: ActionType.COUNT_DOWN,
  value,
});

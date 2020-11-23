import {
  ActionType,
  CountDownAction,
  PopupDialogAction,
} from 'definitions/action';
import { START_TIME, Status } from 'definitions/state';
import { Action } from 'redux';

const initialState: Status = {
  countDownSecond: START_TIME,
  isPaused: false,
  minCostTime: 0,
  bestScore: 0,
  dialogs: [],
};

const status = (state = initialState, action: Action<ActionType>): Status => {
  switch (action.type) {
    case ActionType.POPUP_DIALOG: {
      const { dialog } = action as PopupDialogAction;
      if (state.dialogs.includes(dialog)) {
        state.dialogs.sort((a) => (a == dialog ? -1 : 0));
      } else {
        state.dialogs.unshift(dialog);
      }
      return { ...state, isPaused: state.dialogs.length > 0 };
    }
    case ActionType.REMOVE_DIALOG: {
      const { dialog } = action as PopupDialogAction;
      state.dialogs = state.dialogs.filter((item) => item != dialog);
      return { ...state, isPaused: state.dialogs.length > 0 };
    }
    case ActionType.INIT_MATRIX: {
      return { ...state, countDownSecond: START_TIME, isPaused: false };
    }
    case ActionType.COUNT_DOWN: {
      const { value } = action as CountDownAction;
      return { ...state, countDownSecond: state.countDownSecond - value };
    }
    default:
      return state;
  }
};

export default status;

import { ActionType, SettingAction } from 'definitions/action';
import { GameMode, Setting } from 'definitions/state';
import { Action } from 'redux';

const initialState: Setting = {
  baseValue: 2,
  generateCount: 1,
  gameMode: GameMode.Standard,
  goalExponent: 11,
  spaceSideCount: 4,
};

const setting = (state = initialState, action: Action<ActionType>): Setting => {
  switch (action.type) {
    case ActionType.SETTING: {
      const {
        generateCount,
        gameMode,
        goalExponent,
        spaceSideCount,
      } = action as SettingAction;
      return {
        ...state,
        generateCount,
        gameMode,
        goalExponent,
        spaceSideCount,
      };
    }
    default:
      return state;
  }
};

export default setting;

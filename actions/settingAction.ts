import {
  ActionType,
  PopupDialogAction,
  SettingAction,
} from '../definitions/action';
import { DialogType } from '../definitions/dialog';
import { GameMode } from '../definitions/state';

export const setConfig = (settings: {
  generateCount: number;
  gameMode: GameMode;
  goalExponent: number;
  spaceSideCount: number;
}): SettingAction => ({ type: ActionType.SETTING, ...settings });

export const popupSettingDialog: PopupDialogAction = {
  type: ActionType.POPUP_DIALOG,
  dialog: DialogType.Setting,
};

export const removeSettingDialog: PopupDialogAction = {
  type: ActionType.REMOVE_DIALOG,
  dialog: DialogType.Setting,
};

import { DialogType } from './dialog';
import { GameMode } from './state';

export enum ActionType {
  INIT_MATRIX = 'INIT_MATRIX',
  GO_DIRECTION_MATRIX = 'GO_DIRECTION_MATRIX',
  SETTING = 'SETTING',
  POPUP_DIALOG = 'POPUP_DIALOG',
  REMOVE_DIALOG = 'REMOVE_DIALOG',
  COUNT_DOWN = 'COUNT_DOWN',
}

export enum Direction {
  RIGHT,
  LEFT,
  UP,
  DOWN,
}

export interface InitMatrixAction {
  type: ActionType.INIT_MATRIX;
  totalCount: number;
  generateCount: number;
}

export interface GoDirectionMatrixAction {
  type: ActionType.GO_DIRECTION_MATRIX;
  direction: Direction;
  generateCount: number;
}

export interface SettingAction {
  type: ActionType.SETTING;
  generateCount: number;
  gameMode: GameMode;
  goalExponent: number;
  spaceSideCount: number;
}

export interface PopupDialogAction {
  type: ActionType.POPUP_DIALOG | ActionType.REMOVE_DIALOG;
  dialog: DialogType;
}

export interface CountDownAction {
  type: ActionType.COUNT_DOWN;
  value: number;
}

import { DialogType } from './dialog';

export interface Setting {
  baseValue: number;
  generateCount: number;
  gameMode: GameMode;
  goalExponent: number;
  spaceSideCount: number;
}

export interface MatrixItem {
  id: number;
  value: number;
  position?: { x: number; y: number };
  origin?: MatrixItem[];
}

export enum GameMode {
  Standard,
  Timer,
}

export interface Status {
  countDownSecond: number;
  isPaused: boolean;
  minCostTime: number;
  bestScore: number;
  dialogs: DialogType[];
}

export const START_TIME = 30;

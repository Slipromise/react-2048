export enum KeyCode {
  left = 'left',
  up = 'up',
  right = 'right',
  down = 'down',
  a = 'a',
  w = 'w',
  s = 's',
  d = 'd',
}
export interface KeyboardEventHandlerProps {
  handleKeys?: string[];
  onKeyEvent?: (key: string, e: KeyboardEvent) => void;
  isDisabled?: boolean;
}

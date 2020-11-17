import { ActionType } from 'definitions/Action';
import { Setting } from 'definitions/State';
import { Action } from 'redux';

const initialState: Setting = {
  baseCount: 2,
  baseValue: 2,
  generateCount: 2,
};

const setting = (
  state = initialState,
  { type }: Action<ActionType>,
): Setting => {
  switch (type) {
    default:
      return state;
  }
};

export default setting;

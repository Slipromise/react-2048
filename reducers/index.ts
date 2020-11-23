import { combineReducers } from 'redux';

import matrix from './matrix';
import setting from './setting';
import status from './status';
export default combineReducers({ matrix, setting, status });

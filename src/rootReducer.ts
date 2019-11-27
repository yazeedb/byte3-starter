import * as Home from './features/Home/state';
import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  [Home.name]: Home.reducer
});

import { combineReducers } from '@reduxjs/toolkit';
import systemApp from './appSlice';
import auth from './authSlice';

const rootReducer = combineReducers({
  systemApp,
  auth,
});

export default rootReducer;

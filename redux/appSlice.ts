import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Alert {
  icon?: 'danger' | 'success' | 'warning';
  isVisible?: boolean;
  header?: string;
  message?: string;
  btn?: React.ReactElement | null
};

export type InitialState = {
  alert?: Alert;
};

const initialState: InitialState = {
  alert: {
    icon: 'success',
    isVisible: false,
    header: '',
    message: '',
    btn: null
  }
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleAlert(state, action: PayloadAction<Alert>) {
      if (state.alert) {
        state.alert.icon = action.payload.icon;
        state.alert.isVisible = action.payload.isVisible;
        state.alert.header = action.payload.header;
        state.alert.message = action.payload.message;
        state.alert.btn = action.payload.btn;
      }
    }
  },
});

export const { toggleAlert } = appSlice.actions;

export default appSlice.reducer;

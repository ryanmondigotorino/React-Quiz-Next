import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Modal {
  header?: string;
  isVisible: boolean;
  children?: React.ReactElement | null;
};

export interface Alert {
  icon?: 'danger' | 'success';
  isVisible?: boolean;
  header?: string;
  message?: string;
  btn?: React.ReactElement | null
};

export type InitialState = {
  modal?: Modal;
  alert?: Alert;
};

const initialState: InitialState = {
  modal: {
    header: "",
    isVisible: false,
    children: null,
  },
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
    toggleModal(state, action: PayloadAction<Modal>) {
      if (state.modal) {
        state.modal.header = action.payload.header;
        state.modal.isVisible = action.payload.isVisible;
        state.modal.children = action.payload.children;
      }
    },
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

export const { toggleModal, toggleAlert } = appSlice.actions;

export default appSlice.reducer;

import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Modal = {
  header?: string;
  isVisible: boolean;
  children?: React.ReactElement | null;
};

export type InitialState = {
  modal?: Modal;
};

const initialState: InitialState = {
  modal: {
    header: "",
    isVisible: false,
    children: null,
  },
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
  },
});

export const { toggleModal } = appSlice.actions;

export default appSlice.reducer;

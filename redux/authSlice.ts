import { createSlice } from '@reduxjs/toolkit';
import { User } from 'interfaces';

type InitialState = {
  user: User | null;
};

const initialState: InitialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser(state, action) {
      state.user = action.payload;
    },
    resetAuthState(state) {
      if (state) {
        state = initialState;
      }
    },
  },
});

export const { setAuthUser, resetAuthState } = authSlice.actions;

export default authSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'store/store';

export interface AuthState {
  tokens: object | null;
}

const initialState: AuthState = {
  tokens: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ tokens: object }>) => {
      localStorage.setItem(
        'user',
        JSON.stringify({
          tokens: action.payload.tokens,
        }),
      );
      state.tokens = action.payload.tokens;
    },
    logout: (state) => {
      localStorage.clear();
      state.tokens = null;
    },
  },
});

export const selectAuth = (state: RootState) => state.auth;
export const { setUser } = authSlice.actions;
export default authSlice.reducer;

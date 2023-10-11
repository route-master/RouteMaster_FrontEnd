/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import {
  checkCodeEmail,
  loginWithEmail,
  loginWithSocial,
  registerWithEmail,
} from './thunks';

interface State {
  tokens: {
    accessToken: {
      token: string;
      expiresIn: number;
    };
    refreshToken: {
      token: string;
      expiresIn: number;
    };
  };
  loading: boolean;
  error: string;
  success: boolean;
  isLogin: boolean;
  isCheck: boolean;
}

const emptyTokens = {
  accessToken: {
    token: '',
    expiresIn: 0,
  },
  refreshToken: {
    token: '',
    expiresIn: 0,
  },
};

const initialState: State = {
  tokens: emptyTokens,
  loading: false,
  error: '',
  success: false,
  isLogin: false,
  isCheck: false,
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.tokens = action.payload.tokens;
    },
    logout: (state) => {
      state.tokens = emptyTokens;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerWithEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerWithEmail.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
    });
    builder.addCase(registerWithEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(loginWithEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginWithEmail.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tokens = payload;
      state.isLogin = true;
    });
    builder.addCase(loginWithEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(loginWithSocial.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginWithSocial.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.tokens = payload;
      state.isLogin = true;
    });
    builder.addCase(loginWithSocial.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
    builder.addCase(checkCodeEmail.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkCodeEmail.fulfilled, (state, { payload }) => {
      state.isCheck = true;
      state.loading = false;
    });
    builder.addCase(checkCodeEmail.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || '';
    });
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;

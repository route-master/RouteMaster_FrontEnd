import { createSlice } from '@reduxjs/toolkit';
import { privacyApprove, privacyCheck } from './thunks';

interface privacyType {
  id: string;
  name: string;
  description: string;
  priority: number;
  createdAt: string;
  updatedAt: string;
}

interface privacyGroupType {
  id: string;
  name: string;
  description: string;
  privacies: privacyType[];
  type: string;
  createdAt: string;
  updatedAt: string;
  expiresDays: number;
  priority: number;
}

interface userPrivacy {
  id: string;
  privacyGroups: privacyGroupType[];
  empty: boolean;
  isApproved: boolean;
  createdAt: string;
  updatedAt: string;
  expiresAt: string;
}

interface privacyState {
  userPrivacies: userPrivacy[];
  isLoading: boolean;
  error: string;
}

const privacyInitialState: privacyState = {
  userPrivacies: [],
  isLoading: false,
  error: '',
};

const privacySlice = createSlice({
  name: 'privacy',
  initialState: privacyInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(privacyApprove.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(privacyApprove.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPrivacies = action.payload;
      })
      .addCase(privacyApprove.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(privacyCheck.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(privacyCheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userPrivacies = action.payload;
      })
      .addCase(privacyCheck.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      });
  },
});

export default privacySlice.reducer;

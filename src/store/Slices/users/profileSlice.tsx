import { createSlice } from '@reduxjs/toolkit';
import {
  getMyProfile,
  getNickNamesById,
  getNicknameById,
  getUserProfile,
  getUserProfileList,
  setProfile,
} from './thunks';

interface profile {
  id: string;
  baseUserId: string;
  nickname: string;
  birthDate: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
  accessType: string;
}

interface access {
  id: string;
  baseUserId: string;
  birthDate: boolean;
  profileImageUrl: boolean;
  createdAt: string;
  updatedAt: string;
}

interface profiles {
  profile: profile;
  access: access;
}

interface profilesState {
  profiles: profiles[];
  isLoading: boolean;
  error: string;
}

const initialState: profilesState = {
  profiles: [],
  isLoading: false,
  error: '',
};

const profilesSlice = createSlice({
  name: 'profileSlice',
  initialState,
  reducers: {
    resetProfiles: (state) => {
      state.profiles = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(setProfile.fulfilled, (state, action) => {
        state.profiles = [action.payload];
        state.isLoading = false;
      })
      .addCase(setProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.profiles = [action.payload];
        state.isLoading = false;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(getUserProfileList.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfileList.fulfilled, (state, action) => {
        state.profiles = [{ profile: action.payload, access: {} as access }];
        state.isLoading = false;
      })
      .addCase(getUserProfileList.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(getMyProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.profiles = [action.payload];
      })
      .addCase(getMyProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(getNicknameById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNicknameById.fulfilled, (state, action) => {
        state.profiles = [action.payload];
        state.isLoading = false;
      })
      .addCase(getNicknameById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      })
      .addCase(getNickNamesById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getNickNamesById.fulfilled, (state, action) => {
        state.profiles = action.payload;
        state.isLoading = false;
      })
      .addCase(getNickNamesById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || '';
      });
  },
});

export const { resetProfiles } = profilesSlice.actions;
export default profilesSlice.reducer;

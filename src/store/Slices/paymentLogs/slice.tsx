import { createSlice } from '@reduxjs/toolkit';
import { postLogs } from './thunks';

interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

const formSlice = createSlice({
  name: 'form',
  initialState: {
    logs: [] as Log[],
    loading: 'idle' as 'idle' | 'pending' | 'succeeded' | 'failed',
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postLogs.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(postLogs.fulfilled, (state) => {
        state.loading = 'succeeded';
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .addCase(postLogs.rejected, (state, action: any) => {
        state.loading = 'failed';
        state.error = action.error.message;
      });
  },
});

export default formSlice.reducer;

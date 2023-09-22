// userSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Activity {
  id?: number;
  planGroupId: number;
  name: string;
  description?: string;
  beginDate: number;
  endDate: number;
  type: string;
  planMapInfo?: object;
  thumbnailImageUrl: string;
  planPaymentLog?: object[];
}

const initialState: (Activity | object)[] = Array.from(
  { length: 24 },
  () => ({}),
);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities: (state, action: PayloadAction<(Activity | object)[]>) => {
      return action.payload;
    },
  },
});

export const { setActivities } = activitiesSlice.actions;
export default activitiesSlice.reducer;

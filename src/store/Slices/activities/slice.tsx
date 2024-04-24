import { createSlice } from '@reduxjs/toolkit';
import { fetchActivities, addActivity, deleteActivity } from './thunks';

interface Activity {
  createdAt: string | null;
  updatedAt: string | null;
  id: string;
  planGroupId: string;
  writer: string;
  name: string;
  description: string;
  beginDate: string;
  endDate: string;
  mapInfo: { lat: number; lng: number } | null;
  thumbnailImageUrl: string | null;
  activityType: 'HOTEL' | 'RESTAURANT' | 'ACTIVITY' | 'UNKNOWN';
  paymentInfo: PaymentLogs;
  referenceType: 'TOUR_API' | 'KAKAO_MAP';
  referenceId: string;
  planPaymentInfo: PaymentLogs;
}
interface PaymentLogs {
  paymentLogs: Log[];
}
interface Log {
  paid: string;
  participants: string[];
  payment: number;
}

interface ActivityState {
  activities: (Activity | object)[];
  loading: boolean;
  error: string | null;
}
const initialState: ActivityState = {
  activities: Array.from({ length: 24 }, () => ({})),
  loading: false,
  error: null,
};

const getHour = (date: string) => {
  const hour = new Date(date).getHours();
  return hour;
};

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {
    setActivities: (state, action) => {
      state.activities = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchActivities.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.activities = Array.from({ length: 24 }, () => ({}));
        action.payload.forEach((activity: Activity) => {
          const index = getHour(activity.beginDate);
          state.activities[index] = activity;
        });
      })
      .addCase(fetchActivities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
      .addCase(addActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(addActivity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
      .addCase(deleteActivity.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteActivity.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteActivity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      });
  },
});

export const { setActivities } = activitiesSlice.actions;
export default activitiesSlice.reducer;

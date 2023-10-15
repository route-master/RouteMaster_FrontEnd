import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Activity {
  createdAt: string;
  updatedAt: string;
  id: string;
  planGroupId: string;
  writer: string;
  name: string;
  description: string;
  beginDate: string;
  endDate: string;
  mapInfo: { lat: number; lng: number };
  thumbnailImageUrl: string;
  activityType: string;
  paymentInfo: PaymentLogs;
  referenceType: string;
  referenceId: string;
  planPaymentInfo?: PaymentLogs;
}
interface PaymentLogs {
  paymentLogs: Log[];
}
interface Log {
  paid: string;
  participants: string[];
  payment: number;
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

import { createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store/store';
import { fetchPlan, postPlan, deletePlan } from './thunks';

interface PlanObj {
  createdAt: string;
  updatedAt: string;
  id: string;
  writer: string;
  name: string;
  description: string;
  thumbnailimageUrl: string;
  participants: string[];
  beginDate: string;
  endDate: string;
}

interface PlanState {
  plans: PlanObj[];
  loading: boolean;
  error: string | null;
}

const initialState: PlanState = {
  plans: [],
  loading: false,
  error: null,
};

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.plans = action.payload;
      })
      .addCase(fetchPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
      .addCase(postPlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(postPlan.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(postPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      })
      .addCase(deletePlan.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePlan.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deletePlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || '';
      });
  },
});

export default plansSlice.reducer;
export const selectPlanById = (state: RootState, planId: string) => {
  return state.plans.plans.find((plan) => plan.id === planId);
};

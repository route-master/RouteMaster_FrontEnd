import { configureStore } from '@reduxjs/toolkit';
import attractionsSlice from './Slices/attractions/slice';
import activitiesReducer from './Slices/activitiesSlice';
import plansReducer from './Slices/plans/slice';

const store = configureStore({
  reducer: {
    attractionsThunk: attractionsSlice,
    activities: activitiesReducer,
    plans: plansReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/users/slice';
import attractionsSlice from './Slices/attractions/slice';
import privacySlice from './Slices/users/privacySlice';
import profileSlice from './Slices/users/profileSlice';
import activitiesReducer from './Slices/activitiesSlice';
import plansReducer from './Slices/plans/slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    attractionsThunk: attractionsSlice,
    privacy: privacySlice,
    profile: profileSlice,
    activities: activitiesReducer,
    plans: plansReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Slices/users/slice';
import attractionsReducer from './Slices/attractions/slice';
import privacyReducer from './Slices/users/privacySlice';
import profileReducer from './Slices/users/profileSlice';
import activitiesReducer from './Slices/activities/slice';
import plansReducer from './Slices/plans/slice';
import reviewsReducer from './Slices/reviews/slice';
import logsReducer from './Slices/paymentLogs/slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    attractions: attractionsReducer,
    privacy: privacyReducer,
    profile: profileReducer,
    activities: activitiesReducer,
    plans: plansReducer,
    reviews: reviewsReducer,
    logs: logsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

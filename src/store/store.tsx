import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/users/slice';
import attractionsSlice from './Slices/attractions/slice';
<<<<<<< HEAD
import privacySlice from './Slices/users/privacySlice';
import profileSlice from './Slices/users/profileSlice';
=======
import activitiesReducer from './Slices/activitiesSlice';
import plansReducer from './Slices/plans/slice';
>>>>>>> develop

const store = configureStore({
  reducer: {
    auth: authSlice,
    attractionsThunk: attractionsSlice,
<<<<<<< HEAD
    privacy: privacySlice,
    profile: profileSlice,
=======
    activities: activitiesReducer,
    plans: plansReducer,
>>>>>>> develop
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

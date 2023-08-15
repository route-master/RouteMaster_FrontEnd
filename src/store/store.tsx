import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'services/authApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authSlice from 'features/auth/authSlice';
import attractionsSlice from './Slices/attractions/slice';
import activitiesReducer from './Slices/activitiesSlice';
import plansReducer from './Slices/plans/slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
    attractionsThunk: attractionsSlice,
    activities: activitiesReducer,
    plans: plansReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
export default store;

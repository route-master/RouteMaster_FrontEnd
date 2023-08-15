import { configureStore } from '@reduxjs/toolkit';
import { authApi } from 'services/authApi';
import { setupListeners } from '@reduxjs/toolkit/query/react';
import authSlice from 'features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
setupListeners(store.dispatch);
export default store;

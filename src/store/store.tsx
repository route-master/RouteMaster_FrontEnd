import { configureStore } from '@reduxjs/toolkit';
import authSlice from './Slices/users/slice';
import attractionsSlice from './Slices/attractions/slice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    attractionsThunk: attractionsSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export default store;

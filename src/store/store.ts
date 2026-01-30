import { configureStore } from '@reduxjs/toolkit';
import { paymentsSlice } from '@/src/store/store.slice';
import { paymentsApi } from '@/src/store/api';

export const store = configureStore({
  reducer: {
    payments: paymentsSlice.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(paymentsApi.middleware)
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

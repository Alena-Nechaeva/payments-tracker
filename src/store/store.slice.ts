import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/src/store/store';
import { TBill } from '@/src/store/store.types';

type TInitialState = {
  currentBill: TBill | null;
  currentMonth: string | null;
};

const initialState: TInitialState = {
  currentBill: null,
  currentMonth: null
};

export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setCurrentBill: (state, data: PayloadAction<TBill | null>) => {
      state.currentBill = data.payload;
    },
    setCurrentMonth: (state, data: PayloadAction<string | null>) => {
      state.currentMonth = data.payload;
    }
  }
});

export const { setCurrentBill, setCurrentMonth } = paymentsSlice.actions;

export const currentBillSelect = (state: RootState) => state.payments.currentBill;
export const currentMonthSelect = (state: RootState) => state.payments.currentMonth;

export default paymentsSlice.reducer;

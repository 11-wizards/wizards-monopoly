import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface CounterState {
  serverValue: number;
  value: number;
}

const initialState: CounterState = {
  value: 0,
  serverValue: 0,
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    incrementServer: (state) => {
      state.serverValue = 2;
    },
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount, incrementServer } = counterSlice.actions;

export default counterSlice.reducer;

import { type PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = 'en' as LocaleType;

export const localeSlice = createSlice({
  name: 'locale',
  initialState,
  reducers: {
    setLocale: (_, action: PayloadAction<LocaleType>) => action.payload,
  },
});

export const { setLocale } = localeSlice.actions;

export default localeSlice.reducer;

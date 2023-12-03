import type { FormDataState, FormState } from '@/dto/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: FormState = {
  countries: [
    { code: 'US', name: 'USA' },
    { code: 'CA', name: 'Canada' },
  ],
  forms: [],
  isNewAdded: false,
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    addForm: (state: FormState, action: PayloadAction<FormDataState>) => {
      state.forms.push(action.payload);
      state.isNewAdded = true;
    },
  },
});

export const { addForm } = formSlice.actions;

export default formSlice;

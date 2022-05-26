import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import contactApi from './contactApi';
import { IContactBody, IClearMsgPayload } from './contact.types';
import { MESSAGES } from '@src/configs/constants';

export interface IContactState {
  isFetchingContact: boolean;
  fetchContactMsg: any;
}

const initialState: IContactState = {
  isFetchingContact: false,
  fetchContactMsg: null
};

export const fetchContact = createAsyncThunk(
  'contact/fetchContact',
  async (payload: IContactBody, { rejectWithValue }) => {
    try {
      const response = await contactApi.contact(payload);
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearMsg(state: any, action: PayloadAction<IClearMsgPayload>) {
      if ([`fetchContactMsg`].includes(action.payload)) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchContact.rejected, (state, action) => {
        state.isFetchingContact = false;
        state.fetchContactMsg = action.payload || action.error.message;
      })
      .addCase(fetchContact.pending, (state) => {
        state.isFetchingContact = true;
        state.fetchContactMsg = null;
      })
      .addCase(fetchContact.fulfilled, (state, action) => {
        state.isFetchingContact = false;
        state.fetchContactMsg = MESSAGES.SEND_SUCCESS;
      });
  }
});

export const { clearMsg } = contactSlice.actions;

export default contactSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookies from 'js-cookie';
import contactApi from './contactApi';
import { MESSAGES } from 'src/configs/constants';

const initialState = {
  contactsData: [],
  currentContact: null,
  totalContact: 0,

  //state for get all Contact
  isFetchingGetAllContacts: false,
  fetchGetAllContactsMsg: null,

  //state for get Contact by id
  isFetchingGetContactById: false,
  fetchGetContactByIdMsg: null,

  //state for Seen Contact
  isFetchingSeenContact: false,
  fetchSeenContactMsg: null,

  //state for delete Contact
  isFetchingDeleteContact: false,
  fetchDeleteContactMsg: null
};

export const fetchGetAllContacts = createAsyncThunk(
  'contact/fetchGetAllContacts',
  async ({ phone, check, page, pageSize }, { rejectWithValue }) => {
    try {
      const response = await contactApi.getAllContacts({
        phone,
        check,
        page,
        pageSize,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchGetContactById = createAsyncThunk(
  'contact/fetchGetContactById',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await contactApi.getContactById({
        id,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchSeenContact = createAsyncThunk(
  'contact/fetchSeenContact',
  async (id, { rejectWithValue }) => {
    try {
      const response = await contactApi.seenContact({
        id,
        token: cookies.get('token')
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const fetchDeleteContact = createAsyncThunk(
  'contact/fetchDeleteContact',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await contactApi.deleteContact({
        id,
        token: cookies.get('token')
      });
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || error?.response || error);
    }
  }
);

export const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    clearMsg(state, action) {
      if (
        [
          `fetchGetAllContactsMsg`,
          `fetchGetContactByIdMsg`,
          `fetchSeenContactMsg`,
          `fetchDeleteContactMsg`
        ].includes(action.payload)
      ) {
        state[action.payload] = null;
      }
    }
  },

  extraReducers: (builder) => {
    builder
      // Handle fetch get all Contacts
      .addCase(fetchGetAllContacts.rejected, (state, action) => {
        state.contactsData = [];
        state.totalContact = 0;
        state.isFetchingGetAllContacts = false;
        state.fetchGetAllContactsMsg = action.payload || action.error.message;
      })
      .addCase(fetchGetAllContacts.pending, (state) => {
        state.isFetchingGetAllContacts = true;
        state.contactsData = [];
        state.totalContact = 0;
        state.fetchGetAllContactsMsg = null;
      })
      .addCase(fetchGetAllContacts.fulfilled, (state, action) => {
        state.isFetchingGetAllContacts = false;
        state.fetchGetAllContactsMsg = null;
        state.contactsData = action.payload.results;
        state.totalContact = action.payload.total;
      })

      // Handle fetch get an Contact by id
      .addCase(fetchGetContactById.rejected, (state, action) => {
        state.isFetchingGetContactById = false;
        state.fetchGetContactByIdMsg = action.payload || action.error.message;
        state.currentContact = null;
      })
      .addCase(fetchGetContactById.pending, (state) => {
        state.isFetchingGetContactById = true;
        state.fetchGetContactByIdMsg = null;
        state.currentContact = null;
      })
      .addCase(fetchGetContactById.fulfilled, (state, action) => {
        state.isFetchingGetContactById = false;
        state.fetchGetContactByIdMsg = null;
        state.currentContact = action.payload;
      })

      // Handle fetch Seen  of Contact
      .addCase(fetchSeenContact.rejected, (state, action) => {
        state.isFetchingSeenContact = false;
        state.fetchSeenContactMsg = action.payload || action.error.message;
      })
      .addCase(fetchSeenContact.pending, (state) => {
        state.isFetchingSeenContact = true;
        state.fetchSeenContactMsg = null;
      })
      .addCase(fetchSeenContact.fulfilled, (state, action) => {
        state.isFetchingSeenContact = false;
        state.fetchSeenContactMsg = MESSAGES.Seen_SUCCESS;
        // state.currentContact = action.payload;
      })

      //Handle fetch delete Contact
      .addCase(fetchDeleteContact.rejected, (state, action) => {
        state.isFetchingDeleteContact = false;
        state.fetchDeleteContactMsg = action.payload || action.error.message;
      })
      .addCase(fetchDeleteContact.pending, (state, action) => {
        state.isFetchingDeleteContact = true;
        state.fetchDeleteContactMsg = null;
      })
      .addCase(fetchDeleteContact.fulfilled, (state, action) => {
        const { id } = action.payload;
        state.contactsData = state.contactsData.filter((contact) => contact.id !== id);
        state.isFetchingDeleteContact = false;
        state.fetchDeleteContactMsg = MESSAGES.DELETE_SUCCESS;
      });
  }
});

export const { clearMsg } = contactSlice.actions;

export const selectContactsData = (state) => state.contactSlice.contactsData;
export const selectTotalContact = (state) => state.contactSlice.totalContact;
export const selectCurrentContact = (state) => state.contactSlice.currentContact;

export default contactSlice.reducer;

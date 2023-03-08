import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getAllContacts,
  addContact,
  deleteContacts,
} from 'components/shared/services/contacts-api';

export const fetchAllContacts = createAsyncThunk(
  'contacts/fetch-all',
  async (_, thunkAPI) => {
    try {
      const data = await getAllContacts();
      return data;
    } catch ({ response }) {
      return thunkAPI.rejectWithValue(response.data);
    }
  }
);

export const fetchAddContact = createAsyncThunk(
  'contacts/add',
  async (data, { rejectWithValue }) => {
    try {
      const result = await addContact(data);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

export const fetchDeleteContacts = createAsyncThunk(
  'contacts/delete',
  async (id, { rejectWithValue }) => {
    try {
      const result = await deleteContacts(id);
      return result;
    } catch ({ response }) {
      return rejectWithValue(response.data);
    }
  }
);

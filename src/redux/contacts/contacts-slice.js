import { createSlice } from '@reduxjs/toolkit';

import * as actions from './contacts-actions';

const initialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  extraReducers: {
    [actions.fetchAllContactsLoading]: store => {
      store.isLoading = true;
    },
    [actions.fetchAllContactsSuccess]: (store, { payload }) => {
      store.isLoading = false;
      store.items = payload;
    },
    [actions.fetchAllContactsError]: (store, { payload }) => {
      store.isLoading = false;
      store.error = payload;
    },
    [actions.fetchAddContactLoading]: store => {
      store.isLoading = true;
    },
    [actions.fetchAddContactSuccess]: (store, { payload }) => {
      store.isLoading = false;
      store.items.push(payload);
    },
    [actions.fetchAddContactError]: (store, { payload }) => {
      store.isLoading = false;
      store.error = payload;
    },
    [actions.fetchDeleteContactsLoading]: store => {
      store.isLoading = true;
    },
    [actions.fetchDeleteContactsSuccess]: (store, { payload }) => {
      store.isLoading = false;
      const index = store.items.findIndex(item => item.id === payload);
      store.items.splice(index, 1);
    },
    [actions.fetchDeleteContactsError]: (store, { payload }) => {
      store.isLoading = false;
      store.error = payload;
    },
  },
});
export const { addContact, removeContact } = contactsSlice.actions;
export default contactsSlice.reducer;

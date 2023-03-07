import {
  getAllContacts,
  addContact,
  deleteContacts,
} from 'components/shared/services/contacts-api';
import * as actions from './contacts-actions';

export const fetchAllContacts = () => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchAllContactsLoading());
      const data = await getAllContacts();
      dispatch(actions.fetchAllContactsSuccess(data));
    } catch ({ response }) {
      dispatch(actions.fetchAllContactsError(response.data.message));
    }
  };
  return func;
};

const isDublicate = (contacts, { name }) => {
  const normalizedName = name.toLowerCase();
  const contactDubl = contacts.find(({ name }) => {
    return name.toLowerCase() === normalizedName;
  });

  return Boolean(contactDubl);
};

export const fetchAddContact = data => {
  const func = async (dispatch, getState) => {
    try {
      const { contacts } = getState();
      if (isDublicate(contacts.items, data)) {
        alert(`${data.name} is already in contacts.`);
        return false;
      }
      dispatch(actions.fetchAddContactLoading());
      const result = await addContact(data);
      dispatch(actions.fetchAddContactSuccess(result));
    } catch ({ response }) {
      dispatch(actions.fetchAddContactError(response.data.message));
    }
  };
  return func;
};

export const fetchDeleteContacts = id => {
  const func = async dispatch => {
    try {
      dispatch(actions.fetchDeleteContactsLoading());
      await deleteContacts(id);
      dispatch(actions.fetchDeleteContactsSuccess(id));
    } catch ({ response }) {
      dispatch(actions.fetchDeleteContactsError(response.data.message));
    }
  };
  return func;
};

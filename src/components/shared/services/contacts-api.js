import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://6405b0ae40597b65de3deb21.mockapi.io/contacts',
});

export const getAllContacts = async () => {
  const { data } = await contactsInstance.get('/');
  return data;
};

export const addContact = async data => {
  const { data: result } = await contactsInstance.post('/', data);
  return result;
};

export const deleteContacts = async id => {
  const { data } = await contactsInstance.delete(`/${id}`);
  return data;
};

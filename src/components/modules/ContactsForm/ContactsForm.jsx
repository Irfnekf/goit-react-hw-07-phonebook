import { useState, useEffect } from 'react';
import css from './contactsForm.module.css';
import inititalState from '../ContactsForm/initialState';

import {
  fetchAllContacts,
  fetchAddContact,
} from 'redux/contacts/contacts-operations';

import { selectContacts } from 'redux/contacts/contacts-selectors';

import { useDispatch, useSelector } from 'react-redux';

const ContactsForm = () => {
  const [state, setState] = useState({ ...inititalState });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllContacts());
  }, [dispatch]);

  const contacts = useSelector(selectContacts);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setState(prevState => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const isDublicate = contacts.find(
      contacts => contacts.name.toLowerCase() === state.name.toLowerCase()
    );
    if (isDublicate) {
      alert(`User with name ${state.name} is already in contacts`);
      return;
    }
    const result = dispatch(fetchAddContact({ name, phone }));
    if (result) {
      setState({ ...inititalState });
    }
  };

  const { name, phone } = state;

  return (
    <form action="" onSubmit={handleSubmit} className={css.form}>
      <label htmlFor="" className={css.label}>
        Name
      </label>
      <input
        className={css.input}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
      />
      <label htmlFor="" className={css.label}>
        Number
      </label>
      <input
        className={css.input}
        type="tel"
        name="phone"
        value={phone}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />

      <button type="submit" className={css.btn}>
        Add contact
      </button>
    </form>
  );
};

export default ContactsForm;

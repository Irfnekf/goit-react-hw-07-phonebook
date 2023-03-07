import css from './contactsList.module.css';

import { getFilteredContacts } from 'redux/contacts/contacts-selectors';

import { useSelector, useDispatch } from 'react-redux';

import { fetchDeleteContacts } from 'redux/contacts/contacts-operations';

const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getFilteredContacts);

  const deleteContact = id => {
    dispatch(fetchDeleteContacts(id));
  };

  const item = contacts.map(({ id, name, phone }) => (
    <li className={css.contactItem} key={id}>
      <p className={css.name}>
        {name}: <span className={css.number}>{phone}</span>
      </p>
      <button
        className={css.deleteButton}
        onClick={() => deleteContact(id)}
        type="button"
      >
        Delete
      </button>
    </li>
  ));
  return <ul>{item}</ul>;
};

export default ContactsList;

import StyledForm from './ContactForm.styled';
import StyledButton from './Button.styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/operations';
import { Toaster, toast } from 'react-hot-toast';
import { selectContacts } from 'redux/selectors';


const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNamber] = useState('');
  const dispatch = useDispatch();

  
  const { items } = useSelector(selectContacts);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'name') {
      setName(value);
    } else if (name === 'number') setNamber(value);
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    const newContact = {
       name,
       number,
    };
    const normalizedName = newContact.name.toLowerCase();
    const contactsIncludes = items.find(
      contact =>
        contact.name.toLowerCase() === normalizedName ||
        contact.number === newContact.number
    );
    if (contactsIncludes) {

      return toast.error(`${newContact.name} is already in contacts`)
     
    }

    dispatch(addContact(newContact));

    reset();
  };

  const reset = () => {
    setName('');
    setNamber('');
  };

  return (
    <div><Toaster/>
    <StyledForm onSubmit={handleSubmit}>
      <label>
        Name
        <input
          onChange={handleChange}
          type="text"
          name="name"
          value={name}
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
        />
      </label>
      <label>
        Number
        <input
          onChange={handleChange}
          type="tel"
          name="number"
          value={number}
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
        />
      </label>
      <StyledButton type="submit">Add contact</StyledButton>
    </StyledForm>
    </div>
  );
};

export default ContactForm;

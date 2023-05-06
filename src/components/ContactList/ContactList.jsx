import { memo, useEffect } from 'react';
import StyledList from './ContactsList.styled';
import { useDispatch, useSelector } from 'react-redux';

import {
  selectError,
  // selectFilteredContacts,
  selectIsLoading,
  selectFilteredAndSortedContacts,
} from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import ContactsItem from 'components/ContactItem/ContactsItem';

function ContactsList() {
  const filtered = useSelector(selectFilteredAndSortedContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <>
      {isLoading && !error && <h3>Request in progress...</h3>}
      {error && <p>{error}</p>}
      <StyledList>
        {filtered.map(contact => {
          return <ContactsItem key={contact.id} contact={contact} />;
        })}
      </StyledList>
    </>
  );
}

export default memo(ContactsList);

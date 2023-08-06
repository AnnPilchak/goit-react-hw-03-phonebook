import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import Filter from "./Filter/Filter";
import ContactList from "./ContactList/ContactList";

import {Container} from "./App.styled"

class App extends Component {
  state = {
    contacts: [],
    filter: '',
  }
  // метод для додавання нового контакту
  addContact = contact => {
    const { contacts } = this.state;
    //перевіряє чи такий контакт вже існує
    const isInContacts = contacts.find(
      ({ name }) => name.toLowerCase() === contact.name.toLowerCase()
    );
    if (isInContacts) return alert(`${contact.name} is already in contacts`);
      this.setState({ contacts: [...contacts, contact] });
  };

  // метод для видалення контакту зі списку контактів
  deleteContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };
  
  // метод для фільтрації
  handleFilter = e => {
    this.setState({ filter: e.target.value.toLowerCase() });
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    this.setState({ contacts });
  }

  componentDidUpdate = (_, prevState) => {
    const { contacts } = this.state;

    if (prevState.contacts !== contacts)
      localStorage.setItem('contacts', JSON.stringify(contacts));
  };
    
  render() {
    const { contacts, filter } = this.state;

    const filteredContacts = contacts.filter(({ name }) =>
      name.toLowerCase().includes(filter)
    );
    return (
      <Container>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact}/>
        
        <h2>Contacts</h2>
        <Filter filterValue={filter} onFilter={this.handleFilter}/>
        <ContactList contacts={filteredContacts} handleClick={this.deleteContact}/>
      </Container>
    )
  }
}
export default App;
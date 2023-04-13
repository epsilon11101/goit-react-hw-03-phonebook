import React, { Component } from "react";
import toast, { Toaster } from "react-hot-toast";

import classes from "./Form.module.css";
import ContactForm from "../ContactForm/ContactForm";
import Filter from "../Filter/Filter";
import ContactList from "../ContactList/ContactList";

import { save, load } from "../../scripts/localStorage";

const DUMMY_CONTACTS = [
  { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
  { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
  { id: "id-3", name: "Eden Clements", number: "645-17-79" },
  { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
];

class Form extends Component {
  state = {
    contacts: [],
    prevContacts: [],
    isExist: false,
  };

  componentDidMount() {
    let contacts = load("contacts");
    if (!contacts) {
      save("contacts", DUMMY_CONTACTS);
      contacts = load("contacts");
    }
    this.setState({
      contacts: contacts,
      prevContacts: contacts,
    });
  }

  filterContacts = (filterContacts) => {
    this.setState({
      contacts: filterContacts,
    });
  };

  onDeleteContact = (selectedContact) => {
    const { contacts } = this.state;
    const newContacts = contacts.filter(
      (contact) => contact.id !== selectedContact
    );

    this.setState(
      {
        contacts: [...newContacts],
        prevContacts: [...newContacts],
      },
      () => {
        save("contacts", [...this.state.contacts]);
        this.delsucess();
      }
    );
  };

  sucess = () => toast.success("added contact successfully");

  delsucess = () => toast.success("contact removed successfully");

  error = () => toast.error("this contacts is the list");

  submitHandler = (newContact) => {
    const { contacts } = this.state;

    this.setState(
      {
        isExist: contacts.some((contact) =>
          contact.name.toLowerCase().includes(newContact.name.toLowerCase())
        ),
      },
      () => {
        if (!this.state.isExist) {
          this.setState(
            {
              contacts: [...this.state.contacts, newContact],
            },
            () => {
              this.setState({ prevContacts: [...this.state.contacts] });
              save("contacts", [...this.state.contacts]);
            }
          );
          this.sucess();
        } else this.error();
      }
    );
  };

  render() {
    const { contacts, prevContacts, isExist } = this.state;

    return (
      <>
        <ContactForm
          getContact={this.submitHandler}
          className={classes.form}
          childClassName={classes.form__field}
        />

        <Toaster />

        <div>
          <Filter
            contacts={prevContacts}
            className={classes.form__field}
            filterContacts={this.filterContacts}
          />
          <ul>
            <ContactList contacts={contacts} onDelete={this.onDeleteContact} />
          </ul>
        </div>
      </>
    );
  }
}

export default Form;

import React, { Component } from "react";
import classes from "./ContactList.module.css";

class ContactList extends Component {
  onClickHandler = (id) => {
    this.props.onDelete(id);
  };

  render() {
    const { contacts } = this.props;
    return contacts.map((contact) => {
      return (
        <li key={contact.id}>
          <div className={classes.contact}>
            <span>
              {contact.name} - {contact.number}
            </span>
            <button onClick={() => this.onClickHandler(contact.id)}>
              Delete
            </button>
          </div>
        </li>
      );
    });
  }
}

export default ContactList;

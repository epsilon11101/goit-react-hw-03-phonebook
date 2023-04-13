import React, { Component } from "react";

const INITIAL_STATE = {
  filter: "",
};

class Filter extends Component {
  state = {
    filter: "",
  };

  onFilterHandler = (e) => {
    this.setState({ filter: e.target.value });
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.filter !== this.state.filter) {
      this.props.filterContacts(
        this.props.contacts.filter((contacts) =>
          contacts.name.toLowerCase().includes(this.state.filter.toLowerCase())
        )
      );
    }
  }

  render() {
    const { filter } = this.state;
    const { className: classes } = this.props;
    return (
      <div className={classes}>
        <label htmlFor="filter">Find contacts by name</label>
        <input
          type="text"
          name="filter"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="filter may contain only letters, apostrophe, dash and spaces"
          value={filter}
          onChange={this.onFilterHandler}
        />
      </div>
    );
  }
}

export default Filter;

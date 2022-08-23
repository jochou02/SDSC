import React, { Component } from 'react';
import LoggedInTester from '../buttons/LoggedInTester';

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { ical_link: ""};

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': localStorage.getItem('auth-token'),},
      body: JSON.stringify({ 
        ical_link: this.state.ical_link,})
    };
  
    fetch('http://127.0.0.1:8000/schedule/upload_schedule/', requestOptions)
      .then(response => response.json())
      .then((data) => {
        this.setState({ }, () => {
          console.log(data)})
      })
      .catch(console.log)
  }

  render() {
    return(<>
      <LoggedInTester />
      { localStorage.getItem('auth-token') }
      <br /> <br />

      <label style={{color: 'white'}}>iCal Link</label>
      <br />

      <input 
      onChange={(event) => {
        this.setState({ ical_link: event.target.value })}}>
      </input>
      <br />

      <button onClick={this.handleSubmit}>Submit</button>
    </>)
  }
}

export default Calendar
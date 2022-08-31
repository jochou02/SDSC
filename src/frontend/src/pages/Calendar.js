import React from 'react';
import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/Calendar.module.css'
import Calendars from './components/CalendarUI.js'

import Navbar from "./Navbar"

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      user_id: '',
      ical_link: '',
      cal: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getCalendar = this.getCalendar.bind(this);
  }

  componentDidMount() {
    const headers = {"Content-Type": "application/json"};

    if (localStorage.getItem('auth-token')) {
        headers["Authorization"] = localStorage.getItem('auth-token');
    }

    fetch('http://127.0.0.1:8000/connect/get_info/', { headers, })
        .then(response => response.json())
        .then((data) => {
          this.setState({user_id: data.id}, () => {
            //console.log()
            this.getCalendar()})
        })
    .catch(console.log)
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
      /*
      .then((data) => {
        this.setState({ }, () => {
          console.log()})
      })
      */
      .catch(console.log)
  }

  getCalendar() {
    const headers = {"Content-Type": "application/json"};

    if (localStorage.getItem('auth-token')) {
        headers["Authorization"] = localStorage.getItem('auth-token');
    }

    fetch('http://127.0.0.1:8000/schedule/get_schedule/', { headers, })
        .then(response => response.json())
        .then((data) => {
          this.setState({cal: data}, () => {
            //console.log(data)
          })
        })
    .catch(console.log)
  }

  /* No longer needed
  ShowCalendar({ cal }) {
    return(
      <div>
        {cal.map(e => 
        <div className={styles.eventWrapper}>
          <h1 className={styles.eventTitle}>Event: {e.event}</h1>
          <p className={styles.eventDescrip}>Description: {e.event}</p>
        </div>
        )}
      </div>
    )
  }
  */

  render() {
    return(<>
      <Navbar />

      <Calendars cal={this.state.cal}/>
      <br />

      <label className={styles.calendarLabel}>iCal Link</label>
      <br />

      <input 
      onChange={(event) => {
        this.setState({ ical_link: event.target.value })}}
      className={styles.calendarInput}>
      </input>
      <br />

      <button 
      onClick={this.handleSubmit}
      className={styles.calendarButton}>
        Submit
      </button>
      <br />
    </>)
  }
}

export default Calendar
import React from 'react';
import LoggedInTester from '../buttons/LoggedInTester';
import styles from '../styles/Calendar.module.css'
import Calendars from './components/CalendarUI.js'

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
    this.exportCalendar = this.exportCalendar.bind(this);
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
            console.log()
          })
        })
    .catch(console.log)
  }

  exportCalendar() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': localStorage.getItem('auth-token'),
      },
      body: JSON.stringify({cal: this.state.cal})
    };

    fetch('http://127.0.0.1:8000/schedule/export_schedule/', requestOptions)
    .then(response => response.json())
      .then(( ) => {
        console.log()
      })
    .catch(console.log);
  }

  render() {
    return(<>
      <LoggedInTester />
      <p className={styles.calendarText}>{ localStorage.getItem('auth-token') }</p>

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
      <br /> <br />

      <button 
      onClick={this.exportCalendar}
      className={styles.calendarButton}>
        Export
      </button>
      <br />
    </>)
  }
}

export default Calendar
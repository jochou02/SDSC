import '../../styles/App.css'
import styles from '../../styles/CalendarUI.module.css'
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { Children, useEffect } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
//import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/CalendarUI.scss"
/*
//Imports no longer needed ?
import { useState } from "react";
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';
import { ca } from 'date-fns/locale';
import DatePicker from "react-datepicker";
*/

// https://www.youtube.com/watch?v=lyRP_D0qCfk&ab_channel=DarwinTech --> need to add packages from this vid

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calendars = (props) => {
  useEffect(() => {
    const initialValue = document.body.style.zoom;

    // Change zoom level on mount
    document.body.style.zoom = "65%";

    return () => {
      // Restore default value
      document.body.style.zoom = initialValue;
    };
  }, []);

  var cal = [];

  //Error checking for empty props.cal
  if (props.cal)
    props.cal.map(e => {
      //UTC counts month starting from 0: January = 0, February = 1, etc.
      function adjustedMonth(month) {
        if (month === 1) 
          return 0;
        else 
          return month-1;
      }   

      var dateStart = new Date(Date.UTC(
        e.dtstart_year, 
        adjustedMonth(e.dtstart_month), 
        e.dtstart_day, 
        e.dtstart_hour, 
        e.dtstart_minute
      ))

      var dateEnd = new Date(Date.UTC(
        e.dtend_year, 
        adjustedMonth(e.dtend_month), 
        e.dtend_day, 
        e.dtend_hour, 
        e.dtend_minute
      ))

      cal.push({"title": e.event, start: dateStart, end: dateEnd})

      //Not really needed to return but terminal bothers me if i don't
      return cal
    })

  //const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  //const [allEvents, setAllEvents] = useState(events);
  //const [allEvents] = useState(events);

  /*
  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
  } 
  */

  return(
    <div className={styles.calendarWrapper}>

    <h1 className={styles.calendarTitle}>Calendar</h1>
    {/* 
      Sorry!! Gotta style the calendar part first
        <h2>Add New Event</h2>

        <div>
        <input 
          type="text" 
          placeholder="Add Title" 
          style={{ width: "20%", marginRight: "10px" }} 
          value={newEvent.title} 
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />

        <DatePicker 
          placeholderText="Start Date" 
          style={{ marginRight: "10px" }} selected={newEvent.start} 
          onChange={(start) => setNewEvent({ ...newEvent, start })} />

        <DatePicker 
          placeholderText="End Date" 
          selected={newEvent.end} 
          onChange={(end) => setNewEvent({ ...newEvent, end })} />
      
      <button 
        style={{ marginTop: "10px" }} 
        onClick={handleAddEvent}>
        Add Event
      </button>
        </div>
    */}

      <Calendar 
        localizer = {localizer} 
        events = {cal}
        startAccessor ="start" endAccessor="end" 
        style={{
          height:"500px",
          margin:"30px 50px 50px 50px"}}
      />
    </div>
  ) 
  // <h1 className='wait-times'>Calendar</h1>;
}

export default Calendars
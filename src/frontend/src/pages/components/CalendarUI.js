import '../../styles/App.css'
import styles from '../../styles/CalendarUI.module.css'
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
//import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';
import { ca } from 'date-fns/locale';

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

var events = [
  {
    title: "Test",
    start: "7/20/2022",
    end: "7/25/2022"
  }, 
  {
    title: "Test2",
    start: "7/20/2022",
    end: "7/25/2022"
  } 
];

const Calendars = (props) => {
  var cal = [];
  var dateStart = '';
  var dateEnd = '';

  props.cal.map(e => {
    dateStart = dateStart.concat(
      e.dtstart_month, "/", 
      e.dtstart_day, "/", 
      e.dtstart_year);
    dateEnd = dateEnd.concat(
      e.dtstart_month, "/", 
      e.dtstart_day, "/", 
      e.dtstart_year);

    //console.log("start: " + dateStart + ", end: " + dateEnd + "\n\n")

    cal.push({"title": e.event, start: new Date(dateStart), end: new Date(dateEnd)})
    
    dateStart=''
    dateEnd=''
  })

  events = cal;

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
    {/* Sorry!! Gotta style the calendar part first
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
          height:500, 
          margin:"50px"}}
      />
    </div>
  ) 
  // <h1 className='wait-times'>Calendar</h1>;
}

export default Calendars
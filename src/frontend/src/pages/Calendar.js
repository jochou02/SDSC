import '../../App.css';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import TimePicker from 'react-time-picker';
import DateTimePicker from 'react-datetime-picker';
import { toBeRequired } from '@testing-library/jest-dom/dist/matchers';

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

const events = [
  {
      title: "Big Meeting",
      allDay: true,
      start: new Date(2022, 7, 3,12,10,0),
      end: new Date(2022, 7, 5,2,0,0),
  },
  {
      title: "Vacation",
      start: new Date(2022, 7, 17,14,0,0),
      end: new Date(2022, 7, 17,15,0,0),
  },
  {
      title: "Conference",
      start: new Date(2022, 7, 20,8,0,0),
      end: new Date(2022, 7, 25,10,0,0),
  },
];
export default function Calendars() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: ""});
  const [allEvents, setAllEvents] = useState(events);

  function handleAddEvent() {
    setAllEvents([...allEvents, newEvent]);
}

  return(
    <div>
    <h1>Calendar</h1>
    <h2>Add New Event</h2>
    <div>
    <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
    {/* <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
    <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
    <TimePicker placeholderText="Start Time" disableClock ="true" amPmAriaLabel	= "Select AM/PM" style={{marginRight:"10px" }}  onChange={(start) => setNewEvent({ ...newEvent, start })} />
    <TimePicker placeholderText="End Time" disableClock= "true" amPmAriaLabel	= "Select AM/PM"  selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} /> */}
    <DateTimePicker placeholderText="Start Date" style={{ marginRight: "10px" }} disableCalendar ="true" disableClock ="true" selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
    <DateTimePicker placeholderText="End Date" selected={newEvent.end} disableCalendar ="true" disableClock ="true" onChange={(end) => setNewEvent({ ...newEvent, end })} />
     <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
       Add Event
     </button>
    </div>
      <Calendar localizer = {localizer} events ={allEvents}
      startAccessor ="start" endAccessor="end" style={{height:500, margin:"50px"}
      
      }
      />
    </div>
  ) 
  // <h1 className='wait-times'>Calendar</h1>;
}


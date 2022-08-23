import '../../App.css';
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
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
      start: new Date(2021, 8, 3),
      end: new Date(2021, 8, 5),
  },
  {
      title: "Vacation",
      start: new Date(2021, 8, 12),
      end: new Date(2021, 8, 17),
  },
  {
      title: "Conference",
      start: new Date(2021, 8, 20),
      end: new Date(2021, 8, 25),
  },
];
export default function Calendars() {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
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
    <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
    <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
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


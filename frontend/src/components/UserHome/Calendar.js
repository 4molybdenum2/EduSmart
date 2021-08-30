import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!

const Calendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    //TODO: get events here
  }, [events]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridWeek"
      //TODO: fetch events here and update calendar
      events={[
        {
          title: "class 1",
          date: "2021-08-30",
          start: "2021-08-30T15:00:00.000Z",
        },
        { title: "class 2", date: "2021-08-30" },
        { title: "class 3", date: "2021-08-31" },
      ]}
    />
  );
};

export default Calendar;

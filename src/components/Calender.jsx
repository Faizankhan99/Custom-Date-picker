import React from "react";

const CalendarRender = ({
  calendarDays,
  handleDateClick,
  isWeekday,
  isDateInRange,
}) => {
    const DAYS_OF_WEEK = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return (
    <div className="calendar-grid">
      {DAYS_OF_WEEK.map((day) => (
        <div key={day} className="calendar-day-header">
          {day}
        </div>
      ))}
      {calendarDays?.map((date, index) => (
        <div
          key={index}
          className={`calendar-day ${!date ? "invisible" : ""} ${
            date && !isWeekday(date) ? "weekend" : ""
          } ${date && isDateInRange(date) ? "in-range" : ""}`}
          onClick={() => date && handleDateClick(date)}
        >
          {date ? date.getDate() : ""}
        </div>
      ))}
    </div>
  );
};

export default CalendarRender;

import React, { useState, useEffect } from "react";
import {
  isWeekday,
  getWeekendDates,
  formatDate,
  getDaysInMonth,
  getMonthName,
} from "../Utils";
import "./WeekdayDateRangePicker.css";
import CalenderRender from "./Calender";
import { RenderCalendarHeader } from "./CalenderHeader";

const WeekdayDateRangePicker = ({ onChange, predefinedRanges }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState([null, null]);
  const [calendarDays, setCalendarDays] = useState([]);

  useEffect(() => {
    setCalendarDays(generateCalendarDays(currentDate));
  }, [currentDate]);

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = new Date(year, month).getDay();

    const days = Array(firstDayOfMonth).fill(null);

    console.log("days-->", date, firstDayOfMonth, year, month, daysInMonth);

    for (let i = 1; i <= daysInMonth; i++) {
      days.push(new Date(year, month, i));
    }

    return days;
  };

  const handleDateClick = (date) => {
    if (!isWeekday(date)) return;
    const [start, end] = selectedRange;
    if (!start || end) {
      setSelectedRange([date, null]);
    } else {
      const [rangeStart, rangeEnd] =
        date > start ? [start, date] : [date, start];
      setSelectedRange([rangeStart, rangeEnd]);
      const weekends = getWeekendDates(rangeStart, rangeEnd).map(formatDate);
      onChange([formatDate(rangeStart), formatDate(rangeEnd)], weekends);
    }
  };

  const changeMonth = (increment) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + increment);
      return newDate;
    });
  };

  const changeYear = (year) => {
    setCurrentDate((prev) => new Date(prev.setFullYear(year)));
  };

  const isDateInRange = (date) => {
    const [start, end] = selectedRange;
    console.log("selectedRange--", selectedRange);
    return start && end && date >= start && date <= end;
  };

  return (
    <div className="weekday-date-range-picker">
      <RenderCalendarHeader
        currentDate={currentDate}
        changeMonth={changeMonth}
        changeYear={changeYear}
        setCurrentDate={setCurrentDate}
        getMonthName={getMonthName}
      />
      <CalenderRender
        calendarDays={calendarDays}
        handleDateClick={handleDateClick}
        isWeekday={isWeekday}
        isDateInRange={isDateInRange}
      />

      <div className="selected-range">
        <div>
          Start:{" "}
          {selectedRange[0] ? formatDate(selectedRange[0]) : "Not selected"}
        </div>
        <div>
          End:{" "}
          {selectedRange[1] ? formatDate(selectedRange[1]) : "Not selected"}
        </div>
      </div>

      <div className="predefined-ranges">
        {predefinedRanges?.map((range, index) => (
          <button
            key={index}
            onClick={() => {
              const [start, end] = range.value();
              setSelectedRange([start, end]);
              onChange(
                [formatDate(start), formatDate(end)],
                getWeekendDates(start, end).map(formatDate)
              );
            }}
            className="predefined-range-button"
          >
            {range.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default WeekdayDateRangePicker;

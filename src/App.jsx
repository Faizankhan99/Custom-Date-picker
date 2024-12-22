import React from "react";
import WeekdayDateRangePicker from "./components/WeekdayDateRangePicker";

const App = () => {
  const handleDateRangeChange = (dateRange, weekends) => {
    console.log("Selected date range:", dateRange);
    console.log("Weekends within range:", weekends);
  };

  const predefinedRanges = [
    {
      label: "Last 7 weekdays",
      value: () => {
        const end = new Date();
        const start = new Date();
        let daysToSubtract = 8;
        while (daysToSubtract > 0) {
          start.setDate(start.getDate() - 1);
          if (start.getDay() !== 0 && start.getDay() !== 6) {
            daysToSubtract--;
          }
        }
        return [start, end];
      },
    },
    {
      label: "Last 30 weekdays",
      value: () => {
        const end = new Date();
        const start = new Date();
        let daysToSubtract = 31;
        while (daysToSubtract > 0) {
          start.setDate(start.getDate() - 1);
          if (start.getDay() !== 0 && start.getDay() !== 6) {
            daysToSubtract--;
          }
        }
        return [start, end];
      },
    },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Weekday Date Range Picker</h1>
      <WeekdayDateRangePicker
        onChange={handleDateRangeChange}
        predefinedRanges={predefinedRanges}
      />
    </div>
  );
};

export default App;

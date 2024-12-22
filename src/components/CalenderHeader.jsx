export const RenderCalendarHeader = ({
    currentDate,
    changeMonth,
    changeYear,
    setCurrentDate,
    getMonthName,
    yearRange = 5, 
  }) => {
    return (
      <div className="calendar-header">
        <button onClick={() => changeMonth(-1)} className="nav-button">
          &lt;
        </button>
        <div className="month-year-select">
          <select
            value={currentDate.getMonth()}
            onChange={(e) => {
              const newDate = new Date(currentDate);
              newDate.setMonth(+e.target.value);
              setCurrentDate(newDate);
            }}
          >
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i}>
                {getMonthName(i)}
              </option>
            ))}
          </select>
          <select
            value={currentDate.getFullYear()}
            onChange={(e) => changeYear(+e.target.value)}
          >
            {Array.from(
              { length: yearRange * 2 + 1 },
              (_, i) => currentDate.getFullYear() - yearRange + i
            ).map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button onClick={() => changeMonth(1)} className="nav-button">
          &gt;
        </button>
      </div>
    );
  };
  
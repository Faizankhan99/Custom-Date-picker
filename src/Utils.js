export const isWeekday = (date) => {
    const day = date?.getDay();
    return day !== 0 && day !== 6;
  };
  
  export const getWeekendDates = (start, end) => {
    const weekends = [];
    const current = new Date(start);
    while (current <= end) {
      if (!isWeekday(current)) {
        weekends.push(new Date(current));
      }
      current.setDate(current.getDate() + 1);
    }
    return weekends;
  };
  
  export const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };
  
  export const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };
  
  export const getMonthName = (month) => {
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return months[month];
  };
  
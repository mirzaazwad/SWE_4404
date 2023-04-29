const toDateString=(date)=> {
  const Month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  let hour = date.getHours();
  let meridian = "AM";
  if (hour >= 12) {
    meridian = "PM";
    hour = hour % 12;
  } else if (hour === 0) {
    hour += 12;
  }
  const minutes = date.getMinutes();
  if (minutes < 10)
    return `${day} ${Month[month]} ${year} ${hour}:0${minutes} ${meridian}`;
  else return `${day} ${Month[month]} ${year} ${hour}:${minutes} ${meridian}`;
}

export default toDateString;
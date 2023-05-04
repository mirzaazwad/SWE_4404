//private
const initMap=Symbol('initMap');
const monthMap=Symbol('monthMap');
const monthNames=Symbol('monthNames');
const leadingZero=Symbol('leadingZero');
const dateString=Symbol('dateString');
const setMonthNames=Symbol('setMonthNames');
const getMeridian=Symbol('getMeridian');
const getHour=Symbol('getHour');
const dateStringConstructed=Symbol('dateStringConstructed');
const dateConstructed=Symbol('dateConstructed');
const isDate=Symbol('isDate');

class CustomDateTime {

  constructor(date){
    [setMonthNames]();
    this[initMap]();
    if(this[isDate](date)){
      this[dateString]=this[dateConstructed](date)
    }
    else{
      this[dateString] = date;
    }
  }

  isDate(input) {
    const timestamp = Date.parse(input);
    return !isNaN(timestamp);
  }

  [dateStringConstructed](dateString){
    this[dateString] = dateString;
  }

  [dateConstructed](date){
    return `${date.getDate()} ${this[monthNames][date.getMonth()]} ${date.getFullYear()} ${this[getHour](date.getHours())}:0${this[leadingZero](date.getMinutes())} ${this[getMeridian](date.getHours())}`;
  }

  [getMeridian](hour){
    hour>=12?"PM":"AM";
  }

  [getHour](hour){
    if (hour >= 12) {
      return hour%12;
    }
    else if(hour==0){
      return hour+12;
    }
    else{
      return hour;
    }
  }

  [setMonthNames](){
    this[monthNames]=["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov","Dec"];
  }

  [initMap](){
    this[monthMap] = new Map();
    for(let months=1;months<=12;months++){
      this[monthMap].set(this[monthNames][months-1],this[leadingZero](months).toString());
    }
  }

  [leadingZero](number){
    return number<10?"0"+number:number;
  }

  getDateString(){
    return this[dateString];
  }

  convertTimeTo24(timeString,timeMeridian){
    const timeSplit = timeString.split(":");
    if ((timeSplit[0] !== "12" && timeMeridian === "AM") ||(timeSplit[0] === "12" && timeMeridian === "PM")) {
      return this[leadingZero](timeString);
    } else if (timeSplit[0] === "12" && timeMeridian === "AM") {
      return "00:" + timeSplit[1];
    } else {
      return (parseInt(timeSplit[0]) + 12) % 24 + ":" + timeSplit[1];
    }
  }

  getDate() {
    const dateComponents = this[dateString].split(" ");
    return new Date(dateComponents[2] +"-" +this[monthMap].get(dateComponents[1]) +"-" +this[leadingZero](dateComponents[0]) +"T"+convertTimeTo24(dateComponents[3],dateComponents[4]));
  }

  timeElapsed() {
    const date = toDate(this[dateString]);
    const today = new Date();
    if (date.getTime() === today.getTime()) {
      return "Now";
    } else {
      const timeDiffInMins = Math.floor(
        (today.getTime() - date.getTime()) / 60000
      );
      if (timeDiffInMins > 60) {
        const timeDiffInHours = Math.floor(timeDiffInMins / 60);
        if (timeDiffInHours > 24) {
          const timeDiffInDays = Math.floor(timeDiffInHours / 24);
          if (timeDiffInDays > 30) {
            const timeDiffInMonths = Math.floor(timeDiffInDays / 30);
            if (timeDiffInMonths > 12) {
              const timeDiffInYears = Math.floor(timeDiffInMonths / 12);
              if (timeDiffInYears > 1) {
                return "Around " + timeDiffInYears + " years ago";
              } else {
                return "Around " + timeDiffInYears + " year ago";
              }
            } else {
              if (timeDiffInMonths > 1) {
                return "Around " + timeDiffInMonths + " months ago";
              } else {
                return "Around " + timeDiffInMonths + " month ago";
              }
            }
          } else {
            if (timeDiffInDays > 1) {
              return timeDiffInDays + " days ago";
            } else {
              return timeDiffInDays + " day ago";
            }
          }
        } else {
          if (timeDiffInHours > 1) {
            return timeDiffInHours + " hours ago";
          } else {
            return timeDiffInHours + " hour ago";
          }
        }
      }
      if (timeDiffInMins > 1) return timeDiffInMins.toString() + " mins ago";
      else if (timeDiffInMins === 0) {
        return "Now";
      } else return timeDiffInMins.toString() + " min ago";
    }
  }
}

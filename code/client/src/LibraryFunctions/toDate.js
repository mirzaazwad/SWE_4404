const toDate=(dateString)=> {
  const dateComponents=dateString.split(" ");
  let monthMap=new Map();
  monthMap.set("Jan","01");
  monthMap.set("Feb","02");
  monthMap.set("Mar","03");
  monthMap.set("Apr","04");
  monthMap.set("May","05");
  monthMap.set("Jun","06");
  monthMap.set("Jul","07");
  monthMap.set("Aug","08");
  monthMap.set("Sep","09");
  monthMap.set("Oct","10");
  monthMap.set("Nov","11");
  monthMap.set("Dec","12");
  let dat="";
  let day=dateComponents[0];
  if(day<10){
    day="0"+day;
  }
  dat=dat+dateComponents[2]+"-"+monthMap.get(dateComponents[1])+"-"+day+"T";
  const timeSplit=dateComponents[3].split(":");
  if(dateComponents[4]==="AM" || (timeSplit[0]==="12" && dateComponents[4]==="PM")){
    if(timeSplit[0]<10){
      dat=dat+"0"+dateComponents[3];
    }
    else{
      dat=dat+dateComponents[3];
    }
  }
  else{
    let hours=parseInt(timeSplit[0]);
    hours=(hours+12)%24;
    dat=dat+hours+":"+timeSplit[1];
  }
  return new Date(dat);
}

export default toDate;
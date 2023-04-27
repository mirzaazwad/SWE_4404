import toDate from "./toDate";

const timeElapsed = (dateString) => {
  const date=toDate(dateString);
  const today=new Date();
  if(date.getTime()===today.getTime()){
    return "Now";
  }
  else{
    const timeDiffInMins=Math.floor((today.getTime()-date.getTime())/60000);
    if(timeDiffInMins>60){
      const timeDiffInHours=Math.floor(timeDiffInMins/60);
      if(timeDiffInHours>24){
        const timeDiffInDays=Math.floor(timeDiffInHours/24);
        if(timeDiffInDays>30){
          const timeDiffInMonths=Math.floor(timeDiffInDays/30);
          if(timeDiffInMonths>12){
            const timeDiffInYears=Math.floor(timeDiffInMonths/12);
            if(timeDiffInYears>1){
              return "Around "+timeDiffInYears+" years ago";
            }
            else{
              return "Around "+timeDiffInYears+" year ago";
            }
          }
          else{
            if(timeDiffInMonths>1){
              return "Around "+timeDiffInMonths+" months ago";
            }
            else{
              return "Around "+timeDiffInMonths+" month ago";
            }
          }
        }
        else{
          if(timeDiffInDays>1){
            return timeDiffInDays+" days ago";
          }
          else{
            return timeDiffInDays+" day ago";
          }
        }
      }
      else{
        if(timeDiffInHours>1){
          return timeDiffInHours+" hours ago";
        }
        else{
          return timeDiffInHours+" hour ago";
        }
      }
    }
    if(timeDiffInMins>1)return timeDiffInMins.toString()+" mins ago";
    else if(timeDiffInMins===0){
      return "Now";
    }
    else return timeDiffInMins.toString()+" min ago";
  }
}
 
export default timeElapsed;
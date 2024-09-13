import { useEffect } from "react";

  const Timer = ({dispatch,timeRemaining})=>{

   const min = Math.floor(timeRemaining / 60);
   const seconds = timeRemaining % 60;

    useEffect(()=>{
      const id = setInterval(()=>{
        dispatch({type:'tick'})
      },1000)

      return () =>clearInterval(id)
    },[dispatch])
    return (
        <div  className="timer">{min < 10 && "0"}{min}:{seconds < 10 && "0"}{seconds}</div>
    )
  }
  export default Timer;
const Finished = ({ point, maxPoint ,highScore,dispatch}) => {
   const percentage = (point / maxPoint) * 100;
   let emoji;
   if (percentage === 100) emoji = '🥇';
   if (percentage >= 80 && percentage < 100) emoji = '🎉';
   if (percentage >= 50 && percentage < 80) emoji = '😁';
   if (percentage >= 0 && percentage < 50) emoji = '😉';
   if (percentage === 0) emoji = '🙉';
   return (
      <>
         <p className="result">
            {emoji}You Got <strong>{point} </strong>
            from {maxPoint}({Math.ceil(percentage)} %)
         </p>
         <p className="highscore">(Highscore: {highScore} points)</p>
         <button className="btn btn-ui" onClick={()=>dispatch({type:'restart'})}>Restart</button>
      </>
   );
};

export default Finished;

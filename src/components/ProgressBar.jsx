const ProgressBar = ({ numQuestions, index, point, maxPoint, answer }) => {
   return (
      <header className="progress">
         <progress max={numQuestions} value={index + Number(answer !== null)} />
         <p>
            Question <strong>{index + 1}</strong> /{numQuestions}
         </p>
         <p>
            <strong>{point}</strong> / {maxPoint}
         </p>
      </header>
   );
};
export default ProgressBar;

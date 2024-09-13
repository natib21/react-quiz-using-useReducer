const NextPage = ({ dispatch, answer, index, numQuestion }) => {
   if (answer === null) return;
   if (index < numQuestion - 1)
      return (
         <button className="btn btn-ui" onClick={() => dispatch({ type: 'nextPage' })}>
            Next
         </button>
      );
   if (index === numQuestion - 1)
      return (
         <button className="btn btn-ui" onClick={() => dispatch({ type: 'finished' })}>
            Finished
         </button>
      );
};
export default NextPage;

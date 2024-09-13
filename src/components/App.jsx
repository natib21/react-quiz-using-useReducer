import { useEffect, useReducer } from 'react';
import Header from './Header';
import MainC from './MainC';
import Loader from './Loader';
import Error from './Error';
import StartPage from './StartPage';
import Question from './Question';
import NextPage from './NextPage';
import ProgressBar from './ProgressBar';
import Finished from './Finished';
const intialValue = {
   questions: [],
   state: 'loading',
   index: 0,
   answer: null,
   point: 0,
   highScore:0
};

const reducer = (state, action) => {
   switch (action.type) {
      case 'resData':
         return { ...state, questions: action.payload, state: 'ready' };
      case 'dataFail':
         return { ...state, state: 'Fail' };
      case 'start':
         return { ...state, state: 'active' };
      case 'newAnswer':
         const question = state.questions.at(state.index);
         console.log(question);
         return {
            ...state,
            answer: action.payload,
            point: action.payload === question.correctOption ? state.point + question.points : state.point,
         };
      case 'nextPage':
         return { ...state, index: state.index + 1, answer: null };
      case 'finished':
         return { ...state, state: 'finished' , highScore : state.point > state.highScore ? state.point: state.highScore};
      case 'restart':
         return {...intialValue,questions:state.questions, state:'ready'}
      default:
         throw new Error('Invalid Data');
   }
};
const App = () => {
   const [{ questions, state, index, answer, point,highScore }, dispatch] = useReducer(reducer, intialValue);

   console.log(state);
   console.log(point);

   const numQuestions = questions.length;
   const maxPoint = questions.reduce((prev, cur) => prev + cur.points, 0);
   useEffect(() => {
      fetch('http://localhost:8000/questions')
         .then((res) => res.json())
         .then((data) => dispatch({ type: 'resData', payload: data }))
         .catch((e) => dispatch({ type: 'dataFail' }));
   }, []);

   return (
      <div className="app">
         <Header />
         <MainC>
            {state === 'loading' && <Loader />}
            {state === 'error' && <Error />}
            {state === 'ready' && <StartPage numQuestions={numQuestions} dispatch={dispatch} />}
            {state === 'active' && (
               <>
                  <ProgressBar
                     numQuestions={numQuestions}
                     index={index}
                     point={point}
                     maxPoint={maxPoint}
                     answer={answer}
                  />
                  <Question question={questions[index]} answer={answer} dispatch={dispatch} />
                  <NextPage dispatch={dispatch} answer={answer} index={index} numQuestion={numQuestions} />
               </>
            )}
            {state === 'finished' && <Finished point={point} maxPoint={maxPoint} highScore={highScore} dispatch={dispatch}/>}
         </MainC>
      </div>
   );
};
export default App;

import React,{useState} from 'react';
import './App.css';
import Questions from './Questions_API/questions.json';
import ProgressBar from './Components/progressbar';
import NavAppBar from './Components/navbar';

function App() {
 
 let [quiz,Setquiz]=useState(Questions);
 let [step,setStep]=useState(1);
 let marks=useState(0);



 const handleSubmit=(e)=>{
   e.preventDefault();
   if(step!==quiz.length-1)
   {
     setStep(++step)
   }
   else{
    
     alert(`Quiz Completed your Marks ${marks[0]} Out of 20`);
     setStep(1)
     marks[1](0)
     
   }

 }
 
 

  if(!quiz.length){
    return <h1>Loading...</h1>
  }
  return (
    <div>
      <NavAppBar />
      <ProgressBar questions={quiz[step].question} answer={quiz[step].correct_answer} 
      options={quiz[step].incorrect_answers} 
      difficulty={quiz[step].difficulty} category={quiz[step].category} step={step} 
      callback={handleSubmit} marks={marks}  />
      
      
    </div>
  );
}

export default App;

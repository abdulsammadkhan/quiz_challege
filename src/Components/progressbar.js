import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';
import DifficultyRatings from './difficulty';



function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
 
  value: PropTypes.number.isRequired,
};

const useStyles = makeStyles({
  root: {
    width: '100%',
    
    
  },
});

export default function ProgressBar({questions,answer,options,difficulty,category,step,callback,marks}) {
  const classes = useStyles();
  let [progress, setProgress] = React.useState(5);
  let [ansvalue,setAnsvalue]=useState('');
  let [value, setValue] = React.useState(3);
  let score,max_marks;
  
  

  
  

  const answerChecking=()=>{
   if(ansvalue===answer)
   {
     marks[1](++marks[0])
   }
  }

  const progressbar=()=>{
    if(progress>=95){
      setProgress(5)
    }
    else{
      setProgress(progress +=5)
    }
  }
  const starRating=()=>{
    if(difficulty==='easy'){
      if(value===3){
        setValue(value -=2)
      }
      else if(value===2){
        setValue(value -=1)

        
      }
      else{
        setValue(1)
      }
    }
    else if(difficulty==='medium'){
      if(value===1){
      setValue(value +=1);}
      else if(value===3){
        setValue(value -=1)
      }
      else{
        setValue(2)
      }
    }
    else if(difficulty==='hard'){
      if(value===1){
        setValue(value +=2)
      }
      else if(value===2){
        setValue(value +=1)
      }
      else{
        setValue(3)
      }

    }

  }
  


  const handleRequests=()=>{
     progressbar();
     answerChecking();
     starRating();

     
     

  }

  return (
    
      <div className='main'>
    <div className={classes.root}>
      <LinearProgressWithLabel value={progress} />
      
    </div>
    <div>
        <h2>{`Qusetion ${step} of 20`}</h2>
        {category}
        <DifficultyRatings value={value} />
        <h5>{`Q: ${questions}`}</h5>
    </div>
    <form onSubmit={callback}>
        
            {
                options.map((value,index)=>{
                    return (
                        
                        <div key={index} >
                            
                            <Button variant="contained"  onClick={()=>setAnsvalue(value)} id='answers' >{value}</Button>


                        </div>
                        
                    )
                })
            }

    <br />

    <Button variant="contained" color="primary" type='submit' onClick={()=>handleRequests()}>Next</Button>
    
        
    </form>
    <br />
    <div className='percents'>
      <h4>{step<=18? `Score:${score=Math.round(((marks[0]/step)*100))}%`:`Score:${score=Math.round(((marks[0]/step)*100))+2}%`}</h4>
      <h4>{`Max Marks:${max_marks=Math.round((marks[0]/20)*100)}%`}</h4>
    </div>
    <div className="progress">
        <div className="progress-bar" role="progressbar" style={{width: `${score}px`}} aria-valuenow={15} aria-valuemin={0} aria-valuemax={100} />
        <div className="progress-bar bg-danger" role="progressbar" style={{width: `${20-marks[0]}px`}} aria-valuenow={30} aria-valuemin={0} aria-valuemax={100} />
        <div className="progress-bar bg-warning" role="progressbar" style={{width: `${max_marks}px`}} aria-valuenow={20} aria-valuemin={0} aria-valuemax={100} />
      </div>
    </div>
    
  );
}
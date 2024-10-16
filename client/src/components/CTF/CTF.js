import React, { useState, useEffect } from 'react';
import RenderQuestion from './RenderQuestion/RenderQuestion';
import { useStyles } from './style';

function CTF({ ctf, addProgress }) {
  const classes = useStyles();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [completedQuestions, setCompletedQuestions] = useState(new Set());

  useEffect(() => {
    if (completedQuestions.size === ctf.length) {
      console.log('All questions completed!');
    }
  }, [completedQuestions, ctf.length]);

  const handleQuestionCompletion = (index) => {
    setCompletedQuestions(new Set(completedQuestions.add(index)));
    setCurrentQuestionIndex(index + 1);
  };

  return (
    <div className={classes.root}>
      <div className='ctfHeader'>
        <div>Answer the questions below</div>
      </div>
      {currentQuestionIndex < ctf.length && (
        <RenderQuestion
          ctf={ctf[currentQuestionIndex]}
          key={currentQuestionIndex}
          addProgress={addProgress}
          onNext={() => handleQuestionCompletion(currentQuestionIndex)}
        />
      )}
    </div>
  );
}

export default CTF;
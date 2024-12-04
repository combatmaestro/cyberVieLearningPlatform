import React, { useState } from 'react';
import RenderQuestion from './RenderQuestion/RenderQuestion';
import { useStyles } from './style';

function CTF({ ctf, addProgress }) {
  const classes = useStyles();
  const [completedQuestions, setCompletedQuestions] = useState(new Set());

  const handleQuestionCompletion = (index) => {
    setCompletedQuestions(new Set(completedQuestions.add(index)));
  };

  return (
    <div className={classes.root}>
      <div className='ctfHeader'>
        <div>Answer the questions below</div>
      </div>
      {ctf.map((question, index) => (
        <RenderQuestion
          ctf={question}
          key={index}
          addProgress={addProgress}
          onNext={() => handleQuestionCompletion(index)}
        />
      ))}
    </div>
  );
}

export default CTF;

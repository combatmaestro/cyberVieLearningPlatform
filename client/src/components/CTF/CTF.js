import React from 'react'
import RenderQuestion from './RenderQuestion/RenderQuestion'
import { useStyles } from './style'

function CTF({ ctf, addProgress }) {
  const classes = useStyles()
  // console.log(ctf)

  return (
    <div className={classes.root}>
      <div className='ctfHeader'>
        <div>Answer the questions below</div>
      </div>
      <div>
        {ctf.map((item, index) => (
          <RenderQuestion ctf={item} addProgress={addProgress} />
        ))}
      </div>
    </div>
  )
}

export default CTF

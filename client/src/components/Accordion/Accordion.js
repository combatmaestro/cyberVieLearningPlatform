import React, { useEffect, useRef, useState } from 'react'
import Accordion from '@material-ui/core/Accordion'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import CTF from '../CTF/CTF'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { useStyles } from './style'
import { useSelector } from 'react-redux'

export default function ControlledAccordion({
  index,
  topic,
  expanded,
  handleChange,
  showCongratulations,
}) {
  const classes = useStyles()
  const contentEl = useRef()
  const [numberOfQuestions, setNumberOfQuestions] = useState(0)
  const module = useSelector((state) => state.module)
  const { responses } = module

  //setting up content in accordion content
  useEffect(() => {
    const divElement = contentEl.current
    divElement.innerHTML = topic.content
  }, [])

  // to calculate the percent of topic done
  useEffect(() => {
    for (let ques of topic.ctf)
      if (responses.indexOf(ques._id) > -1)
        setNumberOfQuestions((prevState) => prevState + 1)

    // if (numberOfQuestions === topic.ctf.length) setNumberOfQuestions(100)
  }, [])

  const addInTheProgress = () => {
    setNumberOfQuestions((prevState) => {
      const newState = prevState + 1
      if (newState === topic.ctf.length) showCongratulations()
      return newState
    })
  }

  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === index} onChange={handleChange(index)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls='panel1bh-content'
          id='panel1bh-header'
        >
          <Typography className={classes.heading}>{index}.</Typography>
          <Typography className={classes.secondaryHeading}>
            {topic.topicName}
          </Typography>
          {topic.ctf.length > 0 ? (
            <div className={classes.circularProgress}>
              <CircularProgressbar
                value={Math.ceil((numberOfQuestions / topic.ctf.length) * 100)}
                maxValue={100}
                text={`${Math.ceil(
                  (numberOfQuestions / topic.ctf.length) * 100
                )}%`}
                styles={buildStyles({
                  textColor: 'white',
                })}
              />
            </div>
          ) : (
            ''
          )}
        </AccordionSummary>
        <AccordionDetails>
          <Typography style={{ width: '100%' }}>
            <div ref={contentEl} className={classes.content}></div>

            <CTF ctf={topic.ctf} addProgress={addInTheProgress} />
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  )
}

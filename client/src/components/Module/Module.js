import React, { useEffect, useState } from 'react'
import Loader from '../Loader/Loader'
import ControlledAccordion from '../Accordion/Accordion'
import { useDispatch, useSelector } from 'react-redux'
import { getModule } from '../../actions/moduleAction'
import { Redirect } from 'react-router-dom'
import { useStyles } from './style'
import CongratulationsDialog from '../CongratulationsDialog/Dialog'

function Module(props) {
  document.title = 'Module'
  const classes = useStyles()
  const { id } = props.match.params
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()
  const module = useSelector((state) => state.module)
  const [showCongratulationsDialog, setShowCongratulationsDialog] =
    useState(false)

  const showCongratulations = () => setShowCongratulationsDialog(true)
  const onClose = () => setShowCongratulationsDialog(false)

  const initialState = {
    title: '',
    topic: [],
  }

  const { loading, moduleData = initialState, error } = module

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false)
  }

  useEffect(() => {
    dispatch(getModule(id))
  }, [])

  if (loading) return <Loader />

  if (error) return <Redirect to={{ pathname: '/home' }} />

  return (
    <div className={classes.root}>
      <h2 className='moduleHeader'>{moduleData.title}</h2>

      <div className={classes.accordionContainer}>
        {moduleData.topic.map((topic, index) => {
          return (
            <div className='accordionStyles' key={topic._id}>
              <ControlledAccordion
                index={index + 1}
                expanded={expanded}
                handleChange={handleChange}
                topic={topic}
                showCongratulations={showCongratulations}
              />
            </div>
          )
        })}
      </div>
      <CongratulationsDialog
        open={showCongratulationsDialog}
        onClose={onClose}
      />
    </div>
  )
}

export default Module

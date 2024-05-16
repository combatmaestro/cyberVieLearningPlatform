import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'
import { useStyles } from './style'

function ModuleListLoader() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {[...Array(15)].map((x, i) => {
        return (
          <div className={classes.module}>
            <Skeleton variant='text' height={40} />
            <Skeleton variant='text' height={40} />
            <br />
            <Skeleton variant='text' height={70} />
          </div>
        )
      })}
    </div>
  )
}

export default ModuleListLoader

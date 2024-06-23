import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormLabel from '@material-ui/core/FormLabel'
import Checkbox from '@material-ui/core/Checkbox'


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiDialog-paperWidthSm': {
      minWidth: '600px',
    },
  },
  dateLabel: {
    marginTop: 20,
  },
}));

function BatchDialogue(props) {
  const classes = useStyles();
  const { open, handleClose, module, submitHandler } = props;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [checked, setChecked] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [courseFee, setCourseFee] = useState('');
  const [discountFee,setDiscountFee] = useState('');


  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  useEffect(() => {
    if (module) {
      setTitle(module.title);
      setDescription(module.description);
      setChecked(module.archive);
      setStartDate(module.startDate || '');
      setEndDate(module.endDate || '');
      setCourseFee(module.fee || '');
      setDiscountFee(module.discountFee || '');
    } else {
      setChecked(false);
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setCourseFee('');
      setDiscountFee('');
    }
  }, [open, module]);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
      className={classes.root}
    >
      <DialogTitle id="form-dialog-title">
        {module ? 'Edit Batch' : 'Create Batch'}
      </DialogTitle>
      <DialogContent>
        <form
          id="module-form"
          onSubmit={(e) =>
            submitHandler(e, title, description, startDate, endDate, courseFee,discountFee, checked)
          }
        >
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Batch Title"
            type="text"
            fullWidth
            value={title}
            required
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            name="description"
            label="Batch Description"
            multiline
            rows={2}
            fullWidth
            value={description}
            required
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            name="startDate"
            label="Start Date"
            type="date"
            fullWidth
            value={startDate}
            className={classes.dateLabel}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <TextField
            name="endDate"
            label="End Date"
            type="date"
            fullWidth
            value={endDate}
            className={classes.dateLabel}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setEndDate(e.target.value)}
          />
          <TextField
            name="courseFee"
            label="Course Fee"
            type="text"
            fullWidth
            value={courseFee}
            className={classes.dateLabel}
            InputLabelProps={{
              shrink: true,
            }}

            onChange={(e) => setCourseFee(e.target.value)}
          />
          <TextField
            name="discountFee"
            label="Discount Fee"
            type="text"
            fullWidth
            value={discountFee}
            className={classes.dateLabel}
            InputLabelProps={{
              shrink: true,
            }}
            
            onChange={(e) => setDiscountFee(e.target.value)}
          />
          <FormLabel className={classes.tierLabel} component='legend'>
              Archive Status
            </FormLabel>
            <FormControlLabel
              control={
                <Checkbox
                  checked={checked}
                  onChange={handleChange}
                  name='checkedB'
                  color='primary'
                />
              }
              label='Archive'
            />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button type="submit" color="primary" form="module-form">
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default BatchDialogue;

import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, Radio, RadioGroup } from "@material-ui/core";
import {Select } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useDispatch, useSelector } from "react-redux";
import {getAllBatches} from '../../actions/moduleAction';
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paperWidthSm": {
      minWidth: "600px",
    },
  },
  tierLabel: {
    marginTop: 20,
  },
  menuItemContent: {
    display: "flex",
    alignItems: "center",
  },
}));

function AdminEditClassDialog(props) {
  const classes = useStyles();
  const { open, handleClose, user, submitHandler } = props;
  const [tier, setTier] = useState("");
  const [role, setRole] = useState("");
  const dispatch = useDispatch();
  // const [allBatches,setAllBatches] = useState([]);
  const [selectedBatch, setSelectedBatch] = useState(""); // State to handle selected batch
  const modules = useSelector((state) => state.batches);
  const { loading, data: moduleData = [], error } = modules;
  useEffect(() => {
    dispatch(getAllBatches())
    setTier(user.tier);
    setRole(user.role);
    setSelectedBatch(user.batch);
    
  }, [open]);

  const handleBatchChange = (event) => {
    setSelectedBatch(event.target.value);
  };
  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">Edit User</DialogTitle>
        <DialogContent>
          <form
            id="user-form"
            onSubmit={(e) => submitHandler(e, tier, role, user._id ,selectedBatch)}
          >
            <TextField
              label="Name"
              type="text"
              fullWidth
              value={user.name}
              disabled
            />
            <br />
            <br />

            <TextField
              label="Email"
              type="email"
              fullWidth
              value={user.email}
              disabled
            />
            <br />
            <br />
            {user.mobile ? (
              <>
                <br />
                <br />
                <TextField
                  label="Mobile"
                  type="text"
                  fullWidth
                  value={user.mobile}
                  disabled
                />
              </>
            ) : (
              ""
            )}

            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel id="select-batch-label">Select Batch</InputLabel>
              <Select
                labelId="select-batch-label"
                id="select-batch"
                value={selectedBatch}
                onChange={handleBatchChange}
                label="Select Batch"
              >
                <MenuItem value="" disabled>
                  Select a Batch For Allocation
                </MenuItem>
                {moduleData.map((batch) => (
                  <MenuItem key={batch._id} value={batch._id}>
                    {batch.title} - {batch._id}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel className={classes.tierLabel} component="legend">
                Tier
              </FormLabel>
              <RadioGroup
                row
                aria-label="tier"
                name="tier"
                value={tier}
                onChange={(e) => setTier(e.target.value)}
              >
                <FormControlLabel
                  value="free"
                  control={<Radio color="primary" />}
                  label="Free"
                />
                <FormControlLabel
                  value="paid"
                  control={<Radio color="primary" />}
                  label="Paid"
                />
              </RadioGroup>
            </FormControl>

            <br />
            <br />
            <FormControl component="fieldset">
              <FormLabel className={classes.tierLabel} component="legend">
                Role
              </FormLabel>
              <RadioGroup
                row
                aria-label="role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <FormControlLabel
                  value="admin"
                  control={<Radio color="primary" />}
                  label="Admin"
                />
                <FormControlLabel
                  value="teacher"
                  control={<Radio color="primary" />}
                  label="Teacher"
                />
                <FormControlLabel
                  value="user"
                  control={<Radio color="primary" />}
                  label="Student"
                />
              </RadioGroup>
            </FormControl>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button type="submit" color="primary" form="user-form">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AdminEditClassDialog;

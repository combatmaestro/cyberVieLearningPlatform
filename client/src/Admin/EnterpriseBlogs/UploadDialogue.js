import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiDialog-paperWidthSm": {
      minWidth: "600px",
    },
  },
  tierLabel: {
    marginTop: 20,
  },
}));

function UploadDialogue({ open, handleClose, submitImageHandler }) {
  const classes = useStyles();
  const [image, setImage] = useState("");

  const imageLoad = (e) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };

    reader.readAsDataURL(e.target.files[0]);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className={classes.root}
      >
        <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
        <DialogContent>
          <form id="image-form" onSubmit={(e) => submitImageHandler(e, image)}>
            <input
              type="file"
              name="upload-input"
              accept="image/x-png,image/jpeg"
              onChange={imageLoad}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            type="submit"
            color="primary"
            form="image-form"
            disabled={!image}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default UploadDialogue;

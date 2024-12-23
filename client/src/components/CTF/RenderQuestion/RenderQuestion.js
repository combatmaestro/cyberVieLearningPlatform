import { TextField, Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useStyles } from "./style";
import SimpleBackdrop from "../../BackDrop/LoaderBackdrop";
import SuccessBar from "../../../Admin/SnackBar/SuccessBar";

function RenderQuestion({ ctf, addProgress, onNext }) {
  const classes = useStyles();
  const module = useSelector((state) => state.module);
  const { responses, moduleData } = module;
  const [completed, setCompleted] = useState(false);
  const [showBackdrop, setShowBackdrop] = useState(false);
  const [answer, setAnswer] = useState("");
  const [answerErrorText, setAnswerErrorText] = useState("");
  const [openSuccess, setOpenSuccess] = useState(false);
  const backendUrl = "https://cyber-vie-learning-platform-client-ten.vercel.app";

  useEffect(() => {
    if (responses.indexOf(ctf._id) > -1) {
      setCompleted(true);
    }
  }, []);

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSuccess(false);
  };

  const submitHandler = () => {
    if (answer.toLowerCase().localeCompare(ctf.answer.toLowerCase()) === 0) {
      setShowBackdrop(true);
      axios({
        method: "POST",
        url: `/ctf/submit`,
        data: {
          moduleId: moduleData._id,
          questionId: ctf._id,
        },
      })
        .then(() => {
          setAnswerErrorText("");
          setCompleted(true);
          setShowBackdrop(false);
          addProgress();
          setOpenSuccess(true);
          onNext();
        })
        .catch((error) => {
          console.error("Error submitting answer:", error);
        });
    } else {
      setAnswerErrorText("Wrong Answer");
    }
  };

  return (
    <div key={ctf._id} className={classes.ctf}>
      <div className="ctfQuestion">{ctf.question}</div>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          flexWrap: "wrap",
          gridRowGap: 16,
          gridColumnGap: 48,
        }}
      >
        <TextField
          helperText={answerErrorText}
          error={Boolean(answerErrorText)}
          variant="outlined"
          placeholder={`Answer Format: ${ctf.hint}`}
          value={completed ? ctf.answer : answer}
          disabled={completed}
          onChange={(e) => setAnswer(e.target.value)}
        />
        {completed ? (<Button
          variant="contained"
          disabled={completed}
          className="ctfSubmitButton"
          onClick={submitHandler}
          style={{
            backgroundColor: "rgb(105 198 126)",
          }}
        >
          Completed
        </Button>):(<Button
          variant="contained"
          disabled={completed}
          className="ctfSubmitButton"
          onClick={submitHandler}
          style={{
            backgroundColor: "#28a745",
          }}
        >
          Submit
        </Button>)
        }
        
      </div>

      <SimpleBackdrop open={showBackdrop} />
      <SuccessBar
        handleClose={handleCloseBar}
        openSuccess={openSuccess}
        message="Correct Answer!"
      />
    </div>
  );
}

export default RenderQuestion;

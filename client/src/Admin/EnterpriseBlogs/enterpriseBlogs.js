import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SideDrawer from "../Drawer/SideDrawer";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import UploadDialogue from "./UploadDialogue"; // ✅ Same folder
import SimpleBackdrop from "../../components/BackDrop/LoaderBackdrop";
import axios from "axios";
import { useDispatch } from "react-redux";
import { createNewBlog } from "../../actions/blogActions";


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#f9fafb",
    minHeight: "100vh",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingRight: theme.spacing(6),
    paddingLeft: theme.spacing(4),
  },
  titleField: {
    marginBottom: theme.spacing(3),
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  buttonBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: theme.spacing(3),
  },
  saveButton: {
    backgroundColor: "#1976d2",
    color: "#fff",
    padding: "8px 24px",
    fontWeight: 500,
    borderRadius: 8,
    "&:hover": {
      backgroundColor: "#125ea6",
    },
  },
  uploadButton: {
    backgroundColor: "#e53935",
    color: "#fff",
    padding: "8px 24px",
    fontWeight: 500,
    borderRadius: 8,
    marginRight: theme.spacing(2),
    "&:hover": {
      backgroundColor: "#c62828",
    },
  },
  editorWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: theme.spacing(3),
  },
}));

const EnterpriseBlogs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [append, setAppend] = useState("");
  const editorRef = useRef(null);

  // Open/Close upload dialogue
  const handleClickOpen = () => setOpen(true);
  const handleCloseDialogue = () => setOpen(false);

  // Handle image upload
 const submitImageHandler = async (e, image) => {
  e.preventDefault();
  try {
    setOpenBackdrop(true);
    setOpen(false);

    const formData = { image };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // ✅ Using existing endpoint
    const { data } = await axios.post("/topic/admin/upload", formData, config);

    // ✅ Append uploaded image to SunEditor content
    const appendString = `
      <div class="se-component se-image-container __se__float-none" contenteditable="false">
        <figure style="margin: 0px;">
          <img src="${data.url}" alt="" style="max-width: 100%; border-radius: 8px;" />
        </figure>
      </div>
    `;

    setAppend(appendString);
    setOpenBackdrop(false);
  } catch (err) {
    console.error("Image upload failed", err);
    setOpenBackdrop(false);
  }
};


  const handleSubmit = async () => {
  const body = { title, content };
  const { success, data } = await dispatch(createNewBlog(body));

  if (success) {
    alert("✅ Blog created successfully!");
    setTitle("");
    setContent("");
  } else {
    alert("❌ Error creating blog");
  }
};

  return (
    <Grid container className={classes.root}>
      {/* Left Drawer (25%) */}
      <Grid item xs={12} md={3}>
        <SideDrawer />
      </Grid>

      {/* Right Main Editor (75%) */}
      <Grid item xs={12} md={9}>
        <Box className={classes.container}>
          {/* Top Bar */}
          <Box className={classes.buttonBox}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Create New Blog
            </Typography>
            <Box>
              <Button
                variant="contained"
                className={classes.uploadButton}
                onClick={handleClickOpen}
              >
                Upload Image
              </Button>
              <Button
                variant="contained"
                className={classes.saveButton}
                onClick={handleSubmit}
              >
                Save Blog
              </Button>
            </Box>
          </Box>

          {/* Blog Title */}
          <TextField
            fullWidth
            variant="outlined"
            label="Blog Title"
            placeholder="Enter your blog title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={classes.titleField}
          />

          {/* SunEditor */}
          <div className={classes.editorWrapper}>
            <SunEditor
              height="70vh"
              setContents={content}
              appendContents={append}
              onChange={setContent}
              ref={editorRef}
              setOptions={{
                buttonList: [
                  ["undo", "redo"],
                  ["font", "fontSize"],
                  ["bold", "underline", "italic", "strike"],
                  ["fontColor", "hiliteColor"],
                  ["align", "list", "table"],
                  ["link", "image", "video"],
                  ["fullScreen", "showBlocks", "codeView"],
                ],
              }}
            />
          </div>
        </Box>
      </Grid>

      {/* Upload Modal + Loader */}
      <UploadDialogue
        open={open}
        handleClose={handleCloseDialogue}
        submitImageHandler={submitImageHandler}
      />
      <SimpleBackdrop open={openBackdrop} />
    </Grid>
  );
};

export default EnterpriseBlogs;

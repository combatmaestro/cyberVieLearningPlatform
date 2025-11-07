import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@material-ui/core";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import axios from "axios";
import UploadDialogue from "./UploadDialogue";
import SimpleBackdrop from "../../components/BackDrop/LoaderBackdrop";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  titleField: {
    marginBottom: theme.spacing(3),
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  buttonBox: {
    display: "flex",
    justifyContent: "flex-end",
    gap: theme.spacing(2),
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
    "&:hover": {
      backgroundColor: "#c62828",
    },
  },
}));

const EnterpriseBlogEditor = ({ existingBlog, onClose }) => {
  const classes = useStyles();
  const [title, setTitle] = useState(existingBlog?.title || "");
  const [content, setContent] = useState(existingBlog?.content || "");
  const [open, setOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [append, setAppend] = useState("");
  const editorRef = useRef(null);

  // 🔼 Update editor if editing an existing blog
  useEffect(() => {
    if (existingBlog) {
      setTitle(existingBlog.title);
      setContent(existingBlog.content);
    }
  }, [existingBlog]);

  // 🔁 Upload dialogue control
  const handleClickOpen = () => setOpen(true);
  const handleCloseDialogue = () => setOpen(false);

  // 🖼 Handle image upload
  const submitImageHandler = async (e, image) => {
    e.preventDefault();
    try {
      setOpenBackdrop(true);
      setOpen(false);

      const formData = { image };
      const config = {
        headers: { "Content-Type": "application/json" },
      };

      const { data } = await axios.post("/topic/admin/upload", formData, config);

      // Append image to SunEditor content
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

  // 💾 Handle submit (create or update)
  const handleSubmit = async () => {
    if (!title || !content) return alert("Please fill in all fields");

    try {
      setOpenBackdrop(true);
      if (existingBlog) {
        // ✏️ Edit existing blog
        await axios.put(`/api/blogs/admin/edit/${existingBlog._id}`, {
          title,
          content,
        });
        alert("✅ Blog updated successfully!");
      } else {
        // 🆕 Create new blog
        await axios.post("/api/blogs/admin/create", { title, content });
        alert("✅ Blog created successfully!");
      }
      setOpenBackdrop(false);
      onClose();
    } catch (err) {
      console.error("Error saving blog", err);
      alert("❌ Error saving blog");
      setOpenBackdrop(false);
    }
  };

  return (
    <Box className={classes.container}>
      {/* Buttons */}
      <Box className={classes.buttonBox}>
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
          {existingBlog ? "Update Blog" : "Save Blog"}
        </Button>
      </Box>

      {/* Title */}
      <TextField
        fullWidth
        variant="outlined"
        label="Blog Title"
        placeholder="Enter your blog title here"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={classes.titleField}
      />

      {/* Editor */}
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

      {/* Image Upload + Loader */}
      <UploadDialogue
        open={open}
        handleClose={handleCloseDialogue}
        submitImageHandler={submitImageHandler}
      />
      <SimpleBackdrop open={openBackdrop} />
    </Box>
  );
};

export default EnterpriseBlogEditor;

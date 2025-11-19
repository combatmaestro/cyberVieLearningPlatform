import React, { useState, useRef, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import SideDrawer from "../Drawer/SideDrawer";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import UploadDialogue from "./UploadDialogue";
import SimpleBackdrop from "../../components/BackDrop/LoaderBackdrop";
import { useDispatch, useSelector } from "react-redux";
import {
  createNewBlog,
  getAllBlogs,
  editBlog,
  deleteBlog,
} from "../../actions/blogActions";
import axios from "axios";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles((theme) => ({
  root: { backgroundColor: "#f9fafb", minHeight: "100vh" },
  container: { padding: theme.spacing(4, 6) },
  titleField: { marginBottom: theme.spacing(3), backgroundColor: "#fff", borderRadius: 8 },
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
    "&:hover": { backgroundColor: "#125ea6" },
  },
  uploadButton: {
    backgroundColor: "#e53935",
    color: "#fff",
    padding: "8px 24px",
    fontWeight: 500,
    borderRadius: 8,
    marginRight: theme.spacing(2),
    "&:hover": { backgroundColor: "#c62828" },
  },
  thumbnailPreview: {
    width: 120,
    height: 80,
    borderRadius: 8,
    objectFit: "cover",
    marginLeft: theme.spacing(2),
    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
  },
  editorWrapper: {
    backgroundColor: "#fff",
    borderRadius: 8,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    padding: theme.spacing(3),
  },
  blogCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    display: "flex",
    alignItems: "center",
  },
  blogInfo: { flex: 1, marginLeft: theme.spacing(2) },
  modalPaper: {
    position: "absolute",
    top: "5%",
    left: "50%",
    transform: "translateX(-50%)",
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: theme.spacing(4),
    maxHeight: "90vh",
    overflowY: "auto",
  },
}));

const EnterpriseBlogs = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const editorRef = useRef(null);

  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openUploader, setOpenUploader] = useState(false);
  const [uploadType, setUploadType] = useState("");

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [metaKeywords, setMetaKeywords] = useState("");
  const [articleType, setArticleType] = useState("blog-post");

  const [content, setContent] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [editId, setEditId] = useState(null);
  const [append, setAppend] = useState("");

  const { blogs = [], loading } = useSelector((state) => state.blogList);

  useEffect(() => {
    dispatch(getAllBlogs());
  }, [dispatch]);

  const handleOpenModal = (blog = null) => {
    if (blog) {
      setEditId(blog._id);
      setTitle(blog.title);
      setSlug(blog.slug || "");
      setMetaTitle(blog.metaTitle || "");
      setMetaDescription(blog.metaDescription || "");
      setMetaKeywords(blog.metaKeywords || "");
      setContent(blog.content);
      setThumbnail(blog.thumbnail || "");
      setArticleType(blog?.articleType || "blog-post");
    } else {
      setEditId(null);
      setTitle("");
      setSlug("");
      setMetaTitle("");
      setMetaDescription("");
      setMetaKeywords("");
      setContent("");
      setThumbnail("");
      setArticleType("blog-post");
    }
    setOpenModal(true);
  };

  const handleCloseModal = () => setOpenModal(false);

  const submitImageHandler = async (e, image) => {
    e.preventDefault();
    try {
      setOpenBackdrop(true);
      setOpenUploader(false);

      const formData = { image };
      const config = { headers: { "Content-Type": "application/json" } };
      const { data } = await axios.post(
        "https://cyber-vie-learning-platform-client-ten.vercel.app/topic/admin/upload",
        formData,
        config
      );

      if (uploadType === "thumbnail") {
        setThumbnail(data.url);
      } else {
        const appendString = `
          <div class="se-component se-image-container __se__float-none" contenteditable="false">
            <figure style="margin: 0px;">
              <img src="${data.url}" alt="" style="max-width: 100%; border-radius: 8px;" />
            </figure>
          </div>`;
        setAppend(appendString);
      }

      setOpenBackdrop(false);
    } catch (err) {
      console.error("Image upload failed", err);
      setOpenBackdrop(false);
    }
  };

  const handleSubmit = async () => {

    // const keywordsArray = metaKeywords
    // .split(",")
    // .map(k => k.trim().toLowerCase())
    // .filter(k => k);

    const body = {
      title,
      slug,
      metaTitle,
      metaDescription,
      metaKeywords, 
      content,
      thumbnail,
      articleType, 
    };

    let res;
    if (editId) res = await dispatch(editBlog(editId, body));
    else res = await dispatch(createNewBlog(body));

    if (res.success) {
      alert(editId ? "✅ Blog updated!" : "✅ Blog created!");
      dispatch(getAllBlogs());
      handleCloseModal();
    } else alert("❌ Failed to save blog");
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const res = await dispatch(deleteBlog(id));
      if (res.success) {
        alert("🗑 Blog deleted");
        dispatch(getAllBlogs());
      }
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} md={3}>
        <SideDrawer />
      </Grid>

      <Grid item xs={12} md={9}>
        <Box className={classes.container}>
          <Box className={classes.buttonBox}>
            <Typography variant="h5" style={{ fontWeight: 600 }}>
              Blogs Management
            </Typography>
            <Button
              variant="contained"
              className={classes.saveButton}
              onClick={() => handleOpenModal()}
            >
              + Create Blog
            </Button>
          </Box>

          {loading ? (
            <Typography>Loading blogs...</Typography>
          ) : blogs.length === 0 ? (
            <Typography>No blogs found.</Typography>
          ) : (
            blogs.map((blog) => (
              <Paper key={blog._id} className={classes.blogCard}>
                {blog.thumbnail && (
                  <img
                    src={blog.thumbnail}
                    alt="thumbnail"
                    width={100}
                    height={70}
                    style={{ borderRadius: 6, objectFit: "cover" }}
                  />
                )}
                <div className={classes.blogInfo}>
                  <Typography variant="h6">{blog.title}</Typography>

                  <Typography variant="caption" color="textSecondary">
                    Slug: {blog.slug} | Meta Title: {blog.metaTitle}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="textSecondary"
                    style={{
                      margin: "10px 0",
                      maxHeight: "60px",
                      overflow: "hidden",
                    }}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                  <Box display="flex" gap={2}>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenModal(blog)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDelete(blog._id)}
                    >
                      Delete
                    </Button>
                  </Box>
                </div>
              </Paper>
            ))
          )}
        </Box>
      </Grid>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper className={classes.modalPaper}>
          <Typography variant="h5" gutterBottom>
            {editId ? "Edit Blog" : "Create New Blog"}
          </Typography>

          {/* Title + Slug */}
          <TextField
            fullWidth
            variant="outlined"
            label="Blog Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={classes.titleField}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Slug (unique URL)"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className={classes.titleField}
          />

          {/* SEO Fields */}
          <TextField
            fullWidth
            variant="outlined"
            label="Meta Title"
            value={metaTitle}
            onChange={(e) => setMetaTitle(e.target.value)}
            className={classes.titleField}
          />
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            label="Meta Description"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            className={classes.titleField}
          />

          <TextField
            fullWidth
            variant="outlined"
            label="Meta Keywords (comma separated)"
            value={metaKeywords}
            onChange={(e) => setMetaKeywords(e.target.value)}
            className={classes.titleField}
          />

          <TextField
            select
            fullWidth
            variant="outlined"
            label="Article Type"
            value={articleType}
            onChange={(e) => setArticleType(e.target.value)}
            className={classes.titleField}
            SelectProps={{ native: true }}
          >
            <option value="blog-post">Blog Post</option>
            <option value="news-article">News Article</option>
            <option value="tutorial">Tutorial</option>
            <option value="review">Review</option>
            <option value="how-to-guide">How-To Guide</option>
          </TextField>

          <Box display="flex" alignItems="center" justifyContent="flex-end" mb={2}>
              
              {/* Left side: Thumbnail upload + preview */}
              <Box display="flex" alignItems="center">
                <Button
                  variant="contained"
                  className={classes.uploadButton}
                  onClick={() => {
                    setUploadType("thumbnail");
                    setOpenUploader(true);
                  }}
                >
                  Thumbnail Image
                </Button>

                {thumbnail && (
                  <img
                    src={thumbnail}
                    alt="Thumbnail Preview"
                    className={classes.thumbnailPreview}
                    style={{ marginLeft: 16 }}
                  />
                )}
              </Box>

              {/* Right side: Editor image upload */}
              <Button
                variant="contained"
                className={classes.uploadButton}
                onClick={() => {
                  setUploadType("editor");
                  setOpenUploader(true);
                }}
              >
                Upload Image
              </Button>
          </Box>


          {/* Editor */}
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

          <Box mt={3} display="flex" justifyContent="flex-end" gap={2}>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button
              variant="contained"
              color="primary"
              className={classes.saveButton}
              onClick={handleSubmit}
            >
              {editId ? "Update" : "Save"}
            </Button>
          </Box>
        </Paper>
      </Modal>

      <UploadDialogue
        open={openUploader}
        handleClose={() => setOpenUploader(false)}
        submitImageHandler={submitImageHandler}
      />
      <SimpleBackdrop open={openBackdrop} />
    </Grid>
  );
};

export default EnterpriseBlogs;

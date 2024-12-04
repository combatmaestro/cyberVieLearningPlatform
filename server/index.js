const app = require("./app");
const dotenv = require("dotenv");
const db = require("./config/mongoose");
const cloudinary = require("cloudinary");

//setting up config file
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "backend/config/config.env" });
}

cloudinary.config({
  cloud_name: "cybervie",
  api_key: "786871724487335",
  api_secret: "OXhmhXnQ6cEZi50VQzw1Iwwd6yM",
});
// const port = process.env.PORT || 4000;
const port = 4000;
const server = app.listen(port, () => {
  console.log(
    `Server started on PORT ${port} in ${process.env.NODE_ENV}`
  );
});

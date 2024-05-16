const mongoose = require("mongoose");

const databaseConnector =
  process.env.NODE_ENV === "DEVELOPMENT"
    ? "mongodb+srv://mongodb_user:cybervie-web@cluster0.u9a0d.mongodb.net/cybervie-database?retryWrites=true&w=majority"
    : "mongodb+srv://mongodb_user:cybervie-web@cluster0.u9a0d.mongodb.net/cybervie-production?retryWrites=true&w=majority";

mongoose.connect(databaseConnector, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
  console.log("Connected to Database :: MongoDB");
});

module.exports = db;

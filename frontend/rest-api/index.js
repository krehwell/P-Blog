const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@coding-blog.rv1qo.mongodb.net/blog?retryWrites=true&w=majority`

mongoose.connect(mongoString, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});

mongoose.connection.on("error", (error) => {
  if(process.env.NODE_ENV === "develoment"){
    console.log(error);
  }
})

mongoose.connection.on("open", () => {
  console.log("Connected to MongoDB database");
})

app.use(helmet());

app.use(require("./routes/index.js"));

app.use("/assets", express.static(path.join(__dirname, "..", "..", "assets")));

app.listen(PORT, () => {
  console.log(`Express app listening on port ${PORT}`);
})

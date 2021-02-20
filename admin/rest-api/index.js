const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const config = require("./config.js");

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();

const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@coding-blog.rv1qo.mongodb.net/blog?retryWrites=true&w=majority`;

mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

mongoose.connection.on("error", (error) => {
    if (process.env.NODE_ENV === "develoment") {
        console.log(error);
    }
});

mongoose.connection.on("open", () => {
    console.log("Connected to MongoDB database");
});

app.use(helmet());
app.use(
    cors({
        origin:
            process.env.NODE_ENV === "develoment"
                ? config.devAdminURL
                : /admin.example\.com$/,
        credential: true,
    })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`express app listening on port ${PORT}`);
});

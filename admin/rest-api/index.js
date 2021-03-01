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

mongoose.connection.on("open", function () {
    if (process.env.NODE_ENV === "development") {
        console.log("Connected to database.");
    }
});

app.use(helmet());

app.use(
    cors({
        origin:
            process.env.NODE_ENV === "development"
                ? config.devAdminURL
                : /admin.example\.com$/,
        credentials: true,
    })
);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use(cookieParser());

/// ROUTES
app.use(require("./routes/admin-user/index.js"));
app.use(require("./routes/blog-posts/index.js"));

app.listen(PORT, () => {
    console.log(`express app listening on port ${PORT}`);
});

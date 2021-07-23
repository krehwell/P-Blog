const express = require("express");
const helmet = require("helmet");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

/// REST-API CONFIG
const config = require("./config.js");

dotenv.config();

const PORT = process.env.PORT || 5001;

const app = express();


/// DB CONNECTION
const mongoString = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@coding-blog.rv1qo.mongodb.net/blog?retryWrites=true&w=majority`;

mongoose.connect(mongoString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
mongoose.set('useFindAndModify', false);

mongoose.connection.on("open", function () {
    if (process.env.NODE_ENV === "development") {
        console.log("Connected to database.");
    }
});


/// REST-API CONFIG
app.enable('trust proxy');
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", config.prodAdminURL);
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(helmet());

app.use(
    cors({
        origin:
            process.env.NODE_ENV === "development"
                ? config.devAdminURL
                : config.prodAdminURL,
        credentials: true,
    })
);


/// PARSER
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use(cookieParser());


/// ROUTES
app.get("/", (_, res) => {
    res.send("admin-api is working, kel!")
});

app.use(require("./routes/admin-user/index.js"));
app.use(require("./routes/blog-posts/index.js"));
app.use(require("./routes/sitemap/index.js"));


/// RUN SERVER
app.listen(PORT, () => {
    console.log(`express app listening on port ${PORT}`);
});

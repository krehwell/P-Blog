const express = require("express");

const api = require("./api.js");

const authAdminUser = require("../../middlewares/index.js").authAdminUser;

const app = express.Router();


/// BLOG POSTS API ENDPOINT HERE
app.get("/blog-posts/get-all", authAdminUser, function(req, res) {
    if (!res.locals.authSuccess) {
        res.json({authSuccess: false});
    } else {
        api.getAllBlogPosts((apiResponse) => {
            apiResponse.authSuccess = true;
            res.json(apiResponse);
        })
    }
});


module.exports = app;

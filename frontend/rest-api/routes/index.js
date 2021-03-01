const express = require("express");

const api = require("./api.js");

const app = express.Router();

/// BLOG POSTS ROUTES (define route -> call api -> return callback)
/*
    - route `/posts/get-blog-post-by-url-title` is not same as route on the page.
      it is only endpoint route, the frontend passing the title to end point, then
      api start searching db for the particular title.

    - same goes for route `/posts/get-blog-posts-by-tag`
*/

app.get("/posts/get-all-blog-posts", (req, res) => {
    api.getAllBlogPosts((apiResponse) => {
        res.json(apiResponse);
    });
});

app.get("/posts/get-blog-posts-by-tag", (req, res) => {
    api.getBlogPostByTag(req.query.tag, (apiResponse) => {
        res.json(apiResponse);
    });
});

app.get("/posts/get-five-newest-posts", (req, res) => {
    api.getFiveNewestPosts((apiResponse) => {
        res.json(apiResponse);
    });
});

app.get("/posts/get-blog-post-by-url-title", (req, res) => {
    api.getBlogTitleByUrlTilte(req.query.urlTitle, (apiResponse) => {
        res.send(apiResponse);
    });
});

module.exports = app;

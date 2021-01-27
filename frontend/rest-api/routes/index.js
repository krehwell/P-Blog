const express = require("express");

const api = require("./api.js");

const app = express.Router();


// API ENDPOINT CODE WILL GO HERE
app.get("/posts/get-all-blog-posts", (req, res) => {
  api.getAllBlogPosts((apiResponse) => {
    res.json(apiResponse);
  })
})

app.get("/posts/get-blog-posts-by-tag", (req, res) => {
  api.getBlogPostByTag(req.query.tag, (apiResponse) => {
    res.json(apiResponse);
  })
})

app.get("/posts/get-five-newest-posts", (req, res) => {
  api.getFiveNewestPosts((apiResponse) => {
    res.json(apiResponse);
  })
})


module.exports = app;

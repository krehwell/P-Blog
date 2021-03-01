const express = require("express");

const api = require("./api.js");

const authAdminUser = require("../../middlewares/index.js").authAdminUser;

const app = express.Router();


/// BLOG POSTS API ENDPOINT HERE


module.exports = app;

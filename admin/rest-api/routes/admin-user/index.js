const express = require("express");

const api = require("./api.js");

const config = require("../../config.js");

api.createNewAdminUser(
    "YOUR_EMAIL_ADDRESS",
    "YOUR_PASSWORD",
    function (apiResponse) {
        console.log(apiResponse);
    }
);

const app = express.Router();

// ADD API ENDPOINT CODE HERE

module.exports = app;

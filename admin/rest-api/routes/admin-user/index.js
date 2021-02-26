const express = require("express");
const tldjs = require("tldjs");

const api = require("./api.js");

const config = require("../../config.js");

// CREATE ADMIN (this will run on start of server)
api.createNewAdminUser(
    "q",
    "q",
    function (apiResponse) {
        console.log(apiResponse);
    }
);

const app = express.Router();

// ADD API ENDPOINT CODE HERE

app.put("/users/login/", (req, res) => {

    if (!req.body.email || !req.body.password) {
        // console.log("--- User Login Failed ---");
        res.json({ success: false });
    } else {
        api.loginAdminUser(req.body.email, req.body.password, (apiResponse) => {
            if (!apiResponse.success) {
                res.json({ success: false });
            } else {
                const cookieSettings = {
                    path: "/",
                    expires: new Date( apiResponse.authTokenExpiresTimestamp * 1000),
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    encode: String,
                    domain:
                        process.env.NODE_ENV === "production"
                            ? tldjs.parse(config.prodAdminURL).domain
                            : "",
                };

                res.cookie(
                    "adminUser",
                    apiResponse.userId + "&" + apiResponse.authToken,
                    cookieSettings
                );

                // console.log("--- User Login Successfully ---");
                res.json({ success: true });
            }
        });
    }
});

module.exports = app;

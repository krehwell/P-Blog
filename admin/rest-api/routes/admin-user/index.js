const express = require("express");
const tldjs = require("tldjs");

const api = require("./api.js");
const authAdminUser = require("../../middlewares/index.js").authAdminUser;

const config = require("../../config.js");

// CREATE ADMIN (Run this to create new admin user)
// api.createNewAdminUser(
//     "USERNAME-DESIRED",
//     "PASSWORD-DESIRED",
//     function (apiResponse) {
//         // console.log(apiResponse);
//     }
// );

const app = express.Router();

/// USERS(Admin) ROUTES (define route -> call api -> return callback)
/*
    - TOKEN TEMPLATE: ("adminUser", userId&userToken)
*/

/// LOGIN ROUTE
app.put("/users/login", function (req, res) {

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

/// AUTHENTICATION ROUTE
app.get("/users/authenticate", function (req, res) {
    const cookies = req.cookies.adminUser ? req.cookies.adminUser.split("&") : null;

    let authUserId = cookies ? cookies[0] : "";
    let authToken = cookies ? cookies[1] : "";

    if (!authUserId || !authToken) {
        res.json({ success: false });
    } else {
        api.authenticateAdminUser(authUserId, authToken, (apiResponse) => {
            res.json(apiResponse);
        });
    }
});

/// LOGOUT ROUTE
app.put("/users/logout", authAdminUser, function (req, res) {
    if (!res.locals.authSuccess) {
        res.json({authSuccess: false});
    } else {
        api.removeAdminUserAuthToken(res.locals.authUserId, (apiResponse) => {
            apiResponse.authSuccess = true;
            res.json(apiResponse);
        });
    }
});

/// CLEAR COOKIE
app.put("/users/remove-admin-user-cookie", function (req, res) {
    res.clearCookie("adminUser", {
        path: "/",
        domain: process.env.NODE_ENV === "production" ? tldjs.parse(config.prodAdminURL).domain : ""
    });

    res.json({success: true});
});

/// CHANGE PASSWORD ROUTE
app.put("/users/change-password", authAdminUser, function (req, res) {
    if (!req.body.currentPassword || !req.body.newPassword) {
        res.json({ success: false });
    } else if (!res.locals.authSuccess) {
        res.json({ authSuccess: false });
    } else {
        api.changeAdminUserPassword(res.locals.authUserId, req.body.currentPassword, req.body.newPassword, function (apiResponse) {
                apiResponse.authSuccess = true;
                res.json(apiResponse);
            }
        );
    }
});

module.exports = app;

const express = require("express");

const api = require("./api.js");

const authAdminUser = require("../../middlewares/index.js").authAdminUser;

const app = express.Router();

/// SITEMAP ROUTE
app.put("/sitemap/update-xml-file", authAdminUser, (req, res) => {
    if (!res.locals.authSuccess) {
        res.json({ authSuccess: false });
    } else {
        api.updateSitemapXmlFile(function (apiResponse) {
            apiResponse.authSuccess = true;
            res.json(apiResponse);
        });
    }
});

module.exports = app;

const moment = require("moment");
const randomstring = require("randomstring");

const AdminUserModel = require("../../models/admin-user.js");

module.exports = {
    createNewAdminUser: function (email, password, callback) {
        const newAdminUser = new AdminUserModel({
            id: randomstring.generate(20),
            email: email,
            password: password,
            authToken: randomstring.generate(40),
            authTokenExpiresTimestamp: moment().unix() + 86400 * 3,
        });

        newAdminUser.save(function (newDocError, newDoc) {
            if (newDocError) {
                callback({ success: false });
            } else {
                callback({ success: true });
            }
        });
    },
};

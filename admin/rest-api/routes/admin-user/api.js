const moment = require("moment");
const randomstring = require("randomstring");

const AdminUserModel = require("../../models/admin-user.js");

module.exports = {

    // CREATE ADMIN (only used once on server start)
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

    // LOGIN ADMIN (find email -> compare password -> create new token -> modify user token)
    loginAdminUser: function (email, password, callback) {
        AdminUserModel.findOne({ email: email }).exec((error, user) => {
            if (error || !user) {
                callback({ success: false });
            } else {
                user.comparePassword(password, (matchError, isMatch) => {
                    if (matchError || !isMatch) {
                        callback({ success: false });
                    } else {
                        const authTokenString = randomstring.generate(40);
                        const authTokenExpiresTimestamp = moment().unix() + 86400 * 3;

                        user.authToken = authTokenString;
                        user.authTokenExpiresTimestamp = authTokenExpiresTimestamp;

                        user.save((saveError) => {
                            if (saveError) {
                                callback({ success: false });
                            } else {
                                callback({
                                    success: true,
                                    userId: user.id,
                                    authToken: authTokenString,
                                    authTokenExpiresTimestamp: authTokenExpiresTimestamp,
                                });
                            }
                        });
                    }
                });
            }
        });
    },

    // AUTHENTICATION API - FOR MIDDLEWARE
    authenticateAdminUser: function (userId, authToken, callback) {
        AdminUserModel.findOne({id: userId}).exec((error, user) => {
            if (error || !user || authToken !== user.authToken || moment().unix() > user.authTokenExpiresTimestamp) {
                callback({success: false});
            } else {
                callback({success: true});
            }
        });
    }

};

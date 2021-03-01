const BlogPostModel = require("../models/post.js");
const moment = require("moment");
const showdown = require("showdown");

/// API ENDPOINT CODE HERE
module.exports = {

    /// GET ALL BLOG POSTS (active post only)
    getAllBlogPosts: (callback) => {
        const now = moment().unix();

        BlogPostModel.find( { dateTimestamp: { $lte: now } }, "title urlTitle dateTimestamp tags thumbnailImageUrl")
            .sort({ dateTimestamp: -1 })
            .exec((error, posts) => {
                if (error) {
                    callback({ getDataError: true });
                } else {
                    callback({ success: true, posts: posts });
                }
            });
    },

    /// GET POST BY TAG
    getBlogPostByTag: (tag, callback) => {
        const now = moment().unix();

        BlogPostModel.find( { tags: tag, dateTimestamp: { $lte: now } }, "title urlTitle dateTimestamp tags thumbnailImageUrl")
            .sort({ dateTimestamp: -1 })
            .exec((error, posts) => {
                if (error) {
                    callback({ getDataError: true });
                } else {
                    callback({ success: true, posts: posts });
                }
            });
    },

    /// FRONT PAGE ENDPOINT (showing 5 newest post uploaded)
    getFiveNewestPosts: (callback) => {
        const now = moment().unix();

        BlogPostModel.find( { dateTimestamp: { $lte: now } }, "title urlTitle dateTimestamp tags thumbnailImageUrl")
            .sort({ dateTimestamp: -1 })
            .limit(5)
            .exec((error, posts) => {
                if (error) {
                    callback({ getDataError: true });
                } else {
                    callback({ success: true, posts: posts });
                }
            });
    },

    /// GET POST BY TITLE
    getBlogTitleByUrlTilte: (urlTitle, callback) => {
        BlogPostModel.findOne({ urlTitle: urlTitle }).exec((error, post) => {
            if (error) {
                callback({ getDataError: true });
            } else if (!post) {
                callback({ notFoundError: true });
            } else {
                const markdownConverter = new showdown.Converter();
                post.markdownContent = markdownConverter.makeHtml(
                    post.markdownContent
                );

                callback({ success: true, post: post });
            }
        });
    },
};

const moment = require("moment");
const formatXml = require("xml-formatter");
const axios = require("axios");

const BlogPostModel = require("../../models/post.js");

const config = require("../../config.js");

module.exports = {
    updateSitemapXmlFile: function (callback) {
        const now = moment().unix();

        BlogPostModel.find({ dateTimestamp: { $lte: now } }).exec(function (
            error,
            posts
        ) {
            if (error || !posts) {
                callback({ submitError: true });
            } else {
                let arrayOfAllTags = [];
                for (let i = 0; i < posts.length; i++) {
                    for (let j = 0; j < posts[i].tags.length; j++) {
                        if (arrayOfAllTags.indexOf(posts[i].tags[j]) === -1) {
                            arrayOfAllTags.push(posts[i].tags[j]);
                        }
                    }
                }

                let xml = "";

                xml += "<?xml version='1.0' encoding='UTF-8'?>";
                xml +=
                    "<urlset xmlns='http://www.sitemaps.org/schemas/sitemap/0.9'>";

                // homepage
                xml += "<url>";
                xml += `<loc>${config.prodFrontendWebsiteURL}</loc>`;
                xml += "<changefreq>daily</changefreq>";
                xml += "<priority>0.7</priority>";
                xml += "</url>";

                // about page
                xml += "<url>";
                xml += `<loc>${config.prodFrontendWebsiteURL}/about</loc>`;
                xml += "<changefreq>daily</changefreq>";
                xml += "<priority>0.7</priority>";
                xml += "</url>";

                // contact page
                xml += "<url>";
                xml += `<loc>${config.prodFrontendWebsiteURL}/contact</loc>`;
                xml += "<changefreq>daily</changefreq>";
                xml += "<priority>0.7</priority>";
                xml += "</url>";

                // all blog posts page
                xml += "<url>";
                xml += `<loc>${config.prodFrontendWebsiteURL}/blog</loc>`;
                xml += "<changefreq>daily</changefreq>";
                xml += "<priority>0.7</priority>";
                xml += "</url>";

                // blog posts by tag pages (one for each tag)
                for (let i = 0; i < arrayOfAllTags.length; i++) {
                    xml += "<url>";
                    xml += `<loc>${config.prodFrontendWebsiteURL}/tags/${arrayOfAllTags[i]}</loc>`;
                    xml += `<changefreq>daily</changefreq>`;
                    xml += `<priority>0.7</priority>`;
                    xml += "</url>";
                }

                // each individual blog post page
                for (let i = 0; i < posts.length; i++) {
                    xml += "<url>";
                    xml += `<loc>${config.prodFrontendWebsiteURL}/blog/${posts[i].urlTitle}</loc>`;
                    xml += `<changefreq>daily</changefreq>`;
                    xml += `<priority>0.7</priority>`;
                    xml += "</url>";
                }

                xml += "</urlset>";

                callback({
                    success: true,
                    xml: formatXml(xml, { collapseContent: true }),
                });
            }
        });
    },


    // TELL GOOGLE THAT MY SITE HAS A NEW POST
    pingSearchEngines: function (callback) {
        axios
            .all([
                axios.get( `https://www.google.com/ping?sitemap=${config.prodFrontendWebsiteURL}/sitemap.xml`),
                axios.get( `https://www.bing.com/ping?sitemap=${config.prodFrontendWebsiteURL}/sitemap.xml`),
            ])
            .then(
                axios.spread(function () {
                    callback({ success: true });
                })
            )
            .catch(function (pingError) {
                callback({ submitError: false });
            });
    },
};

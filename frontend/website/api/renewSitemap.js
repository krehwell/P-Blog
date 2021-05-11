import * as fs from "fs";

/**
 * ENABLING CORS
 * https://vercel.com/support/articles/how-to-enable-cors?query=cors#enabling-cors-in-a-single-node.js-serverless-function
 */
const allowCors = (fn) => async (req, res) => {
    res.setHeader("Access-Control-Allow-Credentials", true);
    res.setHeader("Access-Control-Allow-Origin", "*");
    // another common pattern
    // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,OPTIONS,PATCH,DELETE,POST,PUT"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );
    if (req.method === "POST" || req.method === "OPTIONS") {
        const sitemapDirLocation = path.join(
            __dirname,
            "..",
            "public",
            "sitemap.xml"
        );

        fs.writeFile(
            sitemapDirLocation,
            formatXml(req.body.xml, { collapseContent: true }),
            function (writeError) {
                if (writeError) {
                    res.json({ updateSitemapErrorAtCors: true });
                } else {
                    res.json({ updateSitemapErrorAtCors: false });
                }
            }
        );

        res.json({ updateSitemapErrorAtCors: true });
        return;
    }
    res.end(200);
    return await fn(req, res);
};

const handler = (req, res) => {
    if (!req.body.xml) {
        res.json({ updateSitemapError: true });
    } else {
        res.json({ updateSitemapError: false });
    }
    res.end(200);
};

module.exports = allowCors(handler);

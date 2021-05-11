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
        res.json({updateSitemapErrorAtCors: true})
        return;
    }
    return await fn(req, res);
};

const handler = (req, res) => {
    if (!req.body.xml) {
        res.json({updateSitemapError: true});
    } else {
        res.json({updateSitemapError: false});
    }
};

module.exports = allowCors(handler);

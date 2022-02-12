import fs from "fs";
import NextCors from "nextjs-cors";

async function handler(req, res) {
    // Run the cors middleware
    await NextCors(req, res, {
        // Options
        methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
        origin: !process.env.NODE_ENV === "development" ? "krehwell.com" : "*",
        optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    });

    // override to the new sitemap
    const { body } = req;
    const newSitemap = body.newSitemap;
    console.log(typeof newSitemap);

    try {
        fs.writeFileSync(process.cwd() + "/public/sitemap.xml", newSitemap);
        res.status(200).send("Sitemap updated successfully");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error to write new sitemap");
    }
}

export default handler;

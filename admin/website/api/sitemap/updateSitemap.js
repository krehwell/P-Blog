import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl.js";

let frontEndProdUrl = "";
if (process.env.NODE_ENV === "development") {
    frontEndProdUrl = "http://localhost:3000";
} else {
    frontEndProdUrl = "https://krehwell.com";
}

export default function updateSitemap(callback) {
    axios
        .put(`${apiBaseUrl}/sitemap/update-xml-file`, {}, { withCredentials: true })
        .then(async function (response) {
            /// trigger frontend to update it's sitemap
            const updateSitemapRes = await axios.put(`${frontEndProdUrl}/api/updateSitemap`, {
                newSitemap: response.data.xml,
            });

            console.log(updateSitemapRes);

            callback(response.data);
        })
        .catch(function (error) {
            callback({ submitError: true });
        });
}

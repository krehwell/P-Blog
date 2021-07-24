import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl.js";

export default function updateSitemap(callback) {
    axios
        .put(`${apiBaseUrl}/sitemap/update-xml-file`, {}, { withCredentials: true })
        .then(function (response) {
            callback(response.data);
        })
        .catch(function (error) {
            callback({ submitError: true });
        });
}

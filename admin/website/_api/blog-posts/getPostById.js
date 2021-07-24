import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl.js";

export default async function getBlogPostById(id, req) {
    try {
        const cookie = req.headers.cookie ? req.headers.cookie : "";

        const response = await axios({
            url: `${apiBaseUrl}/blog-posts/get-post-by-id?id=${id}`,
            headers: req ? { cookie: cookie } : "",
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return { submitError: true };
    }
}

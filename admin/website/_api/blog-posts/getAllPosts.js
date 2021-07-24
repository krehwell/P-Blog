import axios from "axios";

import apiBaseUrl from "../../utils/apiBaseUrl.js";

export default async function getAllPosts(req) {
    try {
        const cookie = req.headers.cookie ? req.headers.cookie : "";

        const response = await axios({
            url: `${apiBaseUrl}/blog-posts/get-all`,
            headers: req ? { cookie: cookie } : "",
            withCredentials: true,
        });

        return response.data;
    } catch (error) {
        return { submitError: true };
    }
}

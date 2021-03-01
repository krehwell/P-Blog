import axios from "axios";

import apiBaseUrl from "../utils/apiBaseUrl";

export default async function getBlogPostByTag(tag){
    try {
        const response = await axios.get(`${apiBaseUrl}/posts/get-blog-posts-by-tag?tag=${tag}`);
        return response.data;
    } catch(error){
        return {
            getDataError: true
        }
    }
}

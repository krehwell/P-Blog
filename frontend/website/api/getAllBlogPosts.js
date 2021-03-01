import apiBaseUrl from "../utils/apiBaseUrl";
import axios from "axios";

export default async function getAllBlogPost() {
    try {
        const response = await axios.get(`${apiBaseUrl}/posts/get-all-blog-posts`);
        return response.data;
    } catch (error) {
        return { getDataError: true };
    }
}

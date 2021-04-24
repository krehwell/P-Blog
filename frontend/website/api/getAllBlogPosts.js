import apiBaseUrl from "../utils/apiBaseUrl";
import axios from "axios";

/*
 * getAllBlogPost return [Post]
 */

/*
 *  Post
 *  -----
 *  tags : Array
 *  id : String
 *  title : String
 *  urlTitle : String|Url
 *  dateTimestamp : Int|Unix Time
 *  thumbnailImageUrl : String|Url
 *  markdownContent : Markdown
 *  seoTitleTag : String
 *  seoMetaDescription : String
 */

export default async function getAllBlogPost() {
    try {
        const response = await axios.get(`${apiBaseUrl}/posts/get-all-blog-posts`);
        return response.data;
    } catch (error) {
        return { getDataError: true };
    }
}

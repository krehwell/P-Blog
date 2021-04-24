import apiBaseUrl from "../utils/apiBaseUrl.js";
import axios from "axios";

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

export default async function getBlogPostByUrlTitle(urlTitle){
    try{
        let apiResult = await axios.get(`${apiBaseUrl}/posts/get-blog-post-by-url-title?urlTitle=${urlTitle}`);
        return apiResult.data;
    } catch(error){
        return {
            getDataError: true
        }
    }
}

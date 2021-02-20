import apiBaseUrl from "../utils/apiBaseUrl.js";
import axios from "axios";

export default async function getAllBlogPostByUrlTitle(urlTitle){
  try{
    let apiResult = await axios.get(`${apiBaseUrl}/posts/get-blog-post-by-url-title?urlTitle=${urlTitle}`);
    return apiResult.data;
  }
  catch(error){
    return {
      getDataError: true
    }
  }
}

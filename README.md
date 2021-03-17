# P-Blog
A Personal-Blog so that I follow the trend of those dev/s writing their opinion on a place nobody even care of.  
**LINK:** [https://krehwell.com](krehwell.com)

## Project Structure

## Frontend

### Frontend Website

### Website Rest-Api
_desc about flow on server goes here...._

`index.js`: this is a setup where dependecy and config goes (connect db, config cors, etc).

routes: is handled as a folder which consist of `index.js` and `api.js`.  

inside `index.js` consists the definition on the route name e.g: 
```
const api = require("./api.js");

app.get("/posts/get-all-blog-posts", (req, res) => {
    api.getAllBlogPosts((apiResponse) => {
        res.json(apiResponse);
    });
});
```

and `api.js` is where the prosessing for the backend goes like fetching db etc.

```
module.exports = {
    getAllBlogPosts: (callback) => {
        // fetch db...
        callback(posts);
    }
}
```


## Admin

### Admin Frontend
_screencapt and desc goes here...._

### Admin Rest-Api
_desc about flow on server goes here...._

## Acknowledgement




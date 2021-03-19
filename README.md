# P-Blog
A Personal-Blog so that I follow the trend of those dev/s writing their opinion on a place nobody even care of.
**LINK:** [https://krehwell.com](https://krehwell.com)

## Project Structure
```
P-Blog
|- frontend
  |- website/
  |- rest-api/
|- admin
  |- website/
  |- rest-api/
```

## Frontend

### Frontend Website
_explanation on flow for `./frontend/website/`._

**routes**: Is defined all in the `pages/`.

**`api/`**: This is a directory which defined all function to fetch from server e.g: `getAllBlogPost.js`. Later on each page which need to access db can just call this function and organized the data gotten in its particular Component. (all function inside `api/` is solely for retrieving data from db)

**`Utils/`**: Consist a helper for easing the definition of variable. e.g: `apiBaseUrl.js` is for defining the name of url for the server site either its locally from localhost or from the website url when on production.

### Website Rest-Api
_explanation on flow for `./frontend/rest-api/`._

**`index.js`**: This is a setup where dependecy and config goes (connect db, config cors, etc).

**routes**: Is handled as a folder which consist of `index.js` and `api.js`.

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




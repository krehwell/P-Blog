# P-Blog
A Personal-Blog so that I follow the trend of those dev/s writing their opinion on a place nobody even care of.

**LINK:** [https://krehwell.com](https://krehwell.com)

<p align="center">
  <img src="https://i.imgur.com/fwiqs58.png" height="350px" width="600px" />
</p>


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
- **`frontend/`** is the blog.  
- **`admin/`** is the CMS.


## Frontend
<p align="center">
  <img src="https://i.imgur.com/uCWhJXy.png?1" width="520" height="140"/>
</p>

```
|- frontend
  |- website/
  |- rest-api/
```

### `frontend/website`

**`pages/`**: Routes to all pages.

**`api/`**: Directory which defined all function to fetch from server e.g: `getAllBlogPost.js`. Later on each page which need to access db can just call this function and organized the data gotten in its particular Component. (all function inside `api/` is solely for retrieving data from db)

**`Utils/`**: Consist a helper for easing the definition of variable. e.g: `apiBaseUrl.js` is for defining the name of url for the server site either its locally from localhost or from the website url when on production.

### `frontend/rest-api`

**`index.js`**: This is a setup where dependecy and config goes (connect db, cors config, etc).

**`routes/`**: Directory consists files to access endpoint. (`index.js` and `api.js`)

inside `routes/index.js` consists the definition on the route name e.g:
```
const api = require("./api.js");

app.get("/posts/get-all-blog-posts", (req, res) => {
    api.getAllBlogPosts((apiResponse) => {
        res.json(apiResponse);
    });
});
```

and `routes/api.js` is where the prosessing for the backend goes like fetching db etc.

```
module.exports = {
    getAllBlogPosts: (callback) => {
        // fetch db...
        callback(posts);
    }
}
```



## Admin

<p align="center">
  <img src="https://i.imgur.com/IlpzFXZ.png" width="600" height="350"/>
</p>

This is CMS for making a new, modify, or delete a blog post.

```
|- admin
  |- website/
  |- rest-api/
```

### `admin/website`
_The workflow the same as frontend..._

### `admin/rest-api`
_The workflow the same as frontend..._

## Acknowledgement




import { Component } from "react";
import moment from "moment";

import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import HeadMetadata from "../../components/headMetadata";

import getAllBlogPost from "../../api/getAllBlogPosts";

export default class extends Component {
    static async getInitialProps(){
        const apiResult = await getAllBlogPost();

        return {
            posts: apiResult && apiResult.posts,
            getDataError: apiResult && apiResult.getDataError
        }
    }

  render() {
      return (
        <div className="layout-wrapper">
          <HeadMetadata
            title="Blog Posts | krehwell"
            metaDescription="List of all blog posts public on krehwell blog" />
          <Header />
          <div className="blog-posts-container">
            <h1>Blog posts</h1>
            <div className="blog-posts-list">
              {
                this.props.posts && !this.props.getDataError ?
                  this.props.posts.map((post, index) => {
                    return (
                      <a key={index} href={`/blog/${post.title}`}>
                        <div className="blog-posts-list-item">
                          <div className="blog-posts-thumbnail">
                            <img src={post.thumbnailImageUrl} />
                          </div>
                          <div className="blog-posts-list-item-title-and-date">
                            <h2>{post.title}</h2>
                            <div className="blog-posts-list-item-date">
                              <span>{moment.unix(post.dateTimestamp).format("MMMM Do, YYYY")}</span>
                            </div>
                          </div>
                        </div>
                      </a>
                    )
                  }) :
                                  <div className="blog-posts-get-data-error-msg">
                                      <span>An error occurred while fetching Posts.</span>
                                  </div>
              }
            </div>
          </div>
          <Footer />
        </div>
      );
  }
}

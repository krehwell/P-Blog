import { Component } from "react";
import moment from "moment";

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import HeadMetadata from "../../../components/headMetadata";

import getBlogPostsByTag from "../../../api/getBlogPostByTag.js";

export default class extends Component {
  static async getInitialProps({ query }) {
    const apiResult = await getBlogPostsByTag(query.tag);
    return {
      posts: apiResult && apiResult.posts,
      tag: query.tag,
      getDataError: apiResult && apiResult.getDataError,
    };
  }

  render() {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title={`Posts tagged as "${this.props.tag}" | Coding Blog`}
          metaDescription={`All blog posts tagged as "${this.props.tag}".`}
        />
        <Header />
        <div className="blog-posts-container">
          <h1>
            Blog posts tagged as <u>{this.props.tag}</u>
          </h1>
          <div className="blog-posts-list">
            {this.props.posts && !this.props.getDataError ? (
              this.props.posts.map((post, index) => {
                return (
                  <a key={index} href={`/blog/${post.urlTitle}`}>
                    <div className="blog-posts-list-item">
                      <div className="blog-posts-thumbnail">
                        <img src={post.thumbnailImageUrl} />
                      </div>
                      <div className="blog-posts-list-item-title-and-date">
                        <h2>{post.title}</h2>
                        <div className="blog-posts-list-item-date">
                          <span>
                            {moment
                              .unix(post.dateTimestamp)
                              .format("MMMM Do, YYYY")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                );
              })
            ) : (
              <div className="blog-posts-get-data-error-msg">
                <span>An error occurred.</span>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

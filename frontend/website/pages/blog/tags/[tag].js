import { Component } from "react";
import moment from "moment";

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import HeadMetadata from "../../../components/headMetadata";

import getBlogPostsByTag from "../../../api/getBlogPostByTag.js";

export async function getServerSideProps({query}) {
    try {
        const apiResponse = await getBlogPostsByTag(query.tag);
        return {
            props: {
                posts: apiResponse.posts,
                tag: query.tag
            },
        };

    } catch (err) {
        return {
            props: {
                posts: false,
            },
        };
    }
}

export default class extends Component {

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
                {this.props.posts ? (
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
                                {moment.unix(post.dateTimestamp).format("MMMM Do, YYYY")}
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

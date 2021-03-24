import { Component } from "react";
import moment from "moment";
// import useSwr from "swr";

import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import HeadMetadata from "../../components/headMetadata";

import getAllBlogPost from "../../api/getAllBlogPosts";

export async function getServerSideProps() {
    try {
        const apiResponse = await getAllBlogPost();
        return {
            props: {
                posts: apiResponse.posts,
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
              title="Blog Posts | krehwell"
              metaDescription="List of all blog posts public on krehwell blog" />
            <Header />
            <div className="blog-posts-container">
              <h1>📰 Blog posts</h1>
              <div className="blog-posts-list">
                {
                  this.props.posts ? this.props.posts.map((post, index) => {
                    return (
                      <a key={index} href={`/blog/${post.urlTitle}`}>
                        <div className="blog-posts-list-item">
                          <div className="blog-posts-thumbnail">
                            <img src={post.thumbnailImageUrl} alt="dickbutt image unrelated to the post"/>
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
                  }) : <a>posts is failed to be fethced :p</a>
                }
              </div>
            </div>
            <Footer />
          </div>
        );
    }
}

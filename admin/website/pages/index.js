import { Component } from "react"
import Head from "next/head"
import moment from "moment";

import Header from "../components/header.js"
import Sidebar from "../components/sidebar.js"

import getAllPosts from "../api/blog-posts/getAllPosts.js";

export default class extends Component {
    constructor(props) {
        super(props)
        this.state = {
            showActivePosts: true,
            showUpcomingPosts: false
        }
    }

    static async getInitialProps({req, res}) {
        const apiResult = await getAllPosts(req);

        if (!apiResult.authSuccess) {
            res.writeHead(302, {Location: "/login"});
            res.end();
        }

        return {
            activePosts: apiResult.activePosts ? apiResult.activePosts : [],
            upcomingPosts: apiResult.upcomingPosts ? apiResult.upcomingPosts : [],
            getDataError: apiResult && apiResult.getDataError,
        };
    }

    handleActiveBtnClick = () => {
        this.setState({
            showActivePosts: true,
            showUpcomingPosts: false
        })
    }

    handleUpcomingBtnClick = () => {
        this.setState({
            showActivePosts: false,
            showUpcomingPosts: true
        })
    }

    render () {
        return (
          <div className="layout-wrapper">
            <Head>
              <title>Blog Posts | Admin</title>
            </Head>
            <Header />
            <Sidebar page="blog-posts" />
            <div className="layout-content-container">
              <div className="blog-posts-content">

                <div className="blog-posts-top-header">
                  <div className="blog-posts-page-label">
                    <span>All Blog Posts</span>
                  </div>
                  <div className="blog-posts-add-new-btn-container">
                    <a href="/blog/create-new-post">
                      <div className="blog-posts-add-new-btn">
                        <span>+ Add New Post</span>
                      </div>
                    </a>
                  </div>
                </div>

                <div className="blog-posts-list-container">
                  <div className="blog-posts-list-tab-btns">
                    <div className="blog-posts-list-tab-btn-container">
                      <div
                        className={this.state.showActivePosts ? "blog-posts-list-tab-btn active" : "blog-posts-list-tab-btn"}
                        onClick={() => this.handleActiveBtnClick()}
                      >
                        <span>Active</span>
                      </div>
                    </div>
                    <div className="blog-posts-list-tab-btn-container">
                      <div
                        className={this.state.showUpcomingPosts ? "blog-posts-list-tab-btn active" : "blog-posts-list-tab-btn"}
                        onClick={() => this.handleUpcomingBtnClick()}
                      >
                        <span>Upcoming</span>
                      </div>
                    </div>
                  </div>
                  <div className="blog-posts-list-items-table">
                    <div className="blog-posts-list-items-table-header">
                      <div className="blog-posts-list-items-table-header-item title">
                        <span>Title</span>
                      </div>
                      <div className="blog-posts-list-items-table-header-item date">
                        <span>Date</span>
                      </div>
                      <div className="blog-posts-list-items-table-header-item edit">
                        <span></span>
                      </div>
                    </div>

                    {/* ACTIVE POST */}
                    {
                        this.state.showActivePosts && this.props.activePosts.length ?
                          this.props.activePosts.map((post, index) => {
                            return (
                              <div key={index} className="blog-posts-list-items-table-item">
                                <div className="blog-posts-list-items-table-item-data title">
                                  <span>{post.title}</span>
                                </div>
                                <div className="blog-posts-list-items-table-item-data date">
                                  <span>{moment.unix(post.dateTimestamp).format('MM/DD/YYYY')}</span>
                                </div>
                                <div className="blog-posts-list-items-table-item-data edit">
                                  <a href={`/blog/edit-post/${post.id}`}>
                                    <span>Edit</span>
                                  </a>
                                  <span> </span>
                                </div>
                              </div>
                            )
                          }) : null
                    }

                    {/* INACTIVE POST */}
                    {
                      this.state.showUpcomingPosts && this.props.upcomingPosts.length ?
                        this.props.upcomingPosts.map((post, index) => {
                          return (
                            <div key={index} className="blog-posts-list-items-table-item">
                              <div className="blog-posts-list-items-table-item-data title">
                                <span>{post.title}</span>
                              </div>
                              <div className="blog-posts-list-items-table-item-data date">
                                <span>{moment.unix(post.dateTimestamp).format('MM/DD/YYYY')}</span>
                              </div>
                              <div className="blog-posts-list-items-table-item-data edit">
                                <a href={`/blog/edit-post/${post.id}`}>
                                  <span>Edit</span>
                                </a>
                                <span> </span>
                              </div>
                            </div>
                          )
                        }) : null
                    }

                  </div>
                </div>
              </div>
            </div>
          </div>
    )
    }
}

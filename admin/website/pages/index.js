import { useState } from "react";
import Head from "next/head";
import dayjs from "dayjs";
import Link from "next/link";

import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";

import getAllPosts from "../api/blog-posts/getAllPosts.js";

export default function Home({ activePosts, upcomingPosts, getDataError }) {
    const [showActivePosts, setShowActivePost] = useState(true);
    const [showUpcomingPosts, setShowUpcomingPosts] = useState(false);

    const handleActiveBtnClick = () => {
        setShowActivePost(true);
        setShowUpcomingPosts(false);
    };

    const handleUpcomingBtnClick = () => {
        setShowActivePost(false);
        setShowUpcomingPosts(true);
    };

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
                            <Link href="/blog/create-new-post">
                                <a>
                                    <div className="blog-posts-add-new-btn">
                                        <span>+ Add New Post</span>
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>

                    <div className="blog-posts-list-container">
                        <div className="blog-posts-list-tab-btns">
                            <div className="blog-posts-list-tab-btn-container">
                                <div
                                    className={
                                        showActivePosts ? "blog-posts-list-tab-btn active" : "blog-posts-list-tab-btn"
                                    }
                                    onClick={() => handleActiveBtnClick()}>
                                    <span>Active</span>
                                </div>
                            </div>
                            <div className="blog-posts-list-tab-btn-container">
                                <div
                                    className={
                                        showUpcomingPosts ? "blog-posts-list-tab-btn active" : "blog-posts-list-tab-btn"
                                    }
                                    onClick={() => handleUpcomingBtnClick()}>
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
                            {showActivePosts && activePosts.length
                                ? activePosts.map((post, index) => {
                                      return (
                                          <div key={index} className="blog-posts-list-items-table-item">
                                              <div className="blog-posts-list-items-table-item-data title">
                                                  <span>{post.title}</span>
                                              </div>
                                              <div className="blog-posts-list-items-table-item-data date">
                                                  <span>{dayjs.unix(post.dateTimestamp).format("MM/DD/YYYY")}</span>
                                              </div>
                                              <div className="blog-posts-list-items-table-item-data edit">
                                                  <Link href={`/blog/edit-post/${post.id}`}>
                                                      <a>
                                                          <span>Edit</span>
                                                      </a>
                                                  </Link>
                                                  <span> </span>
                                              </div>
                                          </div>
                                      );
                                  })
                                : null}

                            {/* INACTIVE POST */}
                            {showUpcomingPosts && upcomingPosts.length
                                ? upcomingPosts.map((post, index) => {
                                      return (
                                          <div key={index} className="blog-posts-list-items-table-item">
                                              <div className="blog-posts-list-items-table-item-data title">
                                                  <span>{post.title}</span>
                                              </div>
                                              <div className="blog-posts-list-items-table-item-data date">
                                                  <span>{dayjs.unix(post.dateTimestamp).format("MM/DD/YYYY")}</span>
                                              </div>
                                              <div className="blog-posts-list-items-table-item-data edit">
                                                  <a href={`/blog/edit-post/${post.id}`}>
                                                      <span>Edit</span>
                                                  </a>
                                                  <span> </span>
                                              </div>
                                          </div>
                                      );
                                  })
                                : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ req, res }) {
    const apiResult = await getAllPosts(req);

    if (!apiResult.authSuccess) {
        res.writeHead(302, { Location: "/login" });
        res.end();
    }

    return {
        props: {
            activePosts: apiResult.activePosts ? apiResult.activePosts : [],
            upcomingPosts: apiResult.upcomingPosts ? apiResult.upcomingPosts : [],
            getDataError: (apiResult && apiResult.getDataError) || false,
        },
    };
}

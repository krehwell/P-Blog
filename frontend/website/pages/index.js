import { Component } from "react";
import useSwr from "swr";
import Link from "next/link";
import Image from "next/image";

import Header from "../components/header.js";
import Footer from "../components/footer.js";
import HeadMetadata from "../components/headMetadata.js";

import getFiveNewestPost from "../api/getFiveNewestPost.js";

const Posts = ({ data }) => {
    let posts = data.posts ? (
        data.posts?.map((post, index) => {
            return (
                <Link key={index} href={`/blog/${post.urlTitle}`}>
                    <a>
                        <div className="homepage-latest-blog-post">
                            <div className="homepage-latest-thumbnail">
                                <Image
                                    src={post.thumbnailImageUrl}
                                    alt="dickbutt image unrelated to the post"
                                    height={55}
                                    width={55}
                                    quality={20}
                                />
                            </div>
                            <div className="homepage-latest-blog-post-title">
                                <h3>{post.title}</h3>
                            </div>
                        </div>
                    </a>
                </Link>
            );
        })
    ) : (
        <a>no post.</a>
    );

    return posts;
};

export default function ({ data }) {
    return (
        <div className="layout-wrapper">
            <HeadMetadata
                title="krehwell"
                metaDescription="a blog which a krehwell make to express his uncertainity and unrelated topic with his life"
            />
            <Header />
            <div className="homepage-container">
                <div>
                    <h1>Hi, I'm krehwell. I am never sleepless.</h1>
                    <p>
                        This is a blog which I make to implement Next.js after
                        learning it from its{" "}
                        <a href="http://nextjs.org/docs/">docs</a>. This project
                        is made right after my previous project{" "}
                        <a href="https://sexgod.herokuapp.com/">note10net</a>{" "}
                        (note over internet) and my WebRTC project{" "}
                        <a href="https://callntol.vercel.app/">callntol</a>.
                        <p>
                            This is where I write stuff. Abandon all hope. Leave
                            all the uncertainity of my future. And dump all the
                            multibillion imaginary ideas.
                        </p>
                    </p>
                </div>
                <div className="homepage-latest-blog-posts">
                    <h2>
                        📰 Latest Blog Posts{" "}
                        <Link href="/blog">
                            <a className="homepage-latest-blog-posts-view-all">
                                View all
                            </a>
                        </Link>
                    </h2>
                    <div className="homepage-latest-blog-posts-list">
                        <Posts data={data} />
                    </div>
                </div>
                <div className="homepage-projects">
                    <h2>🌍 Other Weeebbzz</h2>
                    <div className="homepage-project-list">
                        <div className="homepage-project">
                            <h3>
                                <a href="https://github.com/krehwell/Note10net">
                                    <div className="homepage-project-icon">
                                        {" "}
                                        📝
                                    </div>
                                    <div className="homepage-project-title">
                                        note10net (note over internet)
                                    </div>
                                </a>
                            </h3>
                            <p>
                                you write your note, you save your note, you
                                manage your note. but do it in on internet
                            </p>
                            <div className="homepage-project-btns">
                                <a
                                    className="homepage-project-view-btn"
                                    href="https://sexgod.herokuapp.com">
                                    view
                                </a>
                            </div>
                        </div>
                        <div className="homepage-project">
                            <h3>
                                <a href="https://github.com/krehwell/Callntol">
                                    <div className="homepage-project-icon">
                                        📞
                                    </div>
                                    <div className="homepage-project-title">
                                        callntol
                                    </div>
                                </a>
                            </h3>
                            <p>
                                send message, call, and mocking each other
                                easily (now supports video call)
                            </p>
                            <div className="homepage-project-btns">
                                <a
                                    className="homepage-project-view-btn"
                                    href="https://callntol.vercel.app/">
                                    view
                                </a>
                            </div>
                        </div>
                        <div className="homepage-project">
                            <h3>
                                <a href="https://github.com/krehwell?tab=repositories">
                                    <div className="homepage-project-icon">
                                        💔
                                    </div>
                                    <div className="homepage-project-title">
                                        other unrelated to web
                                    </div>
                                </a>
                            </h3>
                            <p>
                                see on my{" "}
                                <a href="https://github.com/krehwell">GitHub</a>
                            </p>
                            <div className="homepage-project-btns">
                                <a
                                    className="homepage-project-view-btn"
                                    href="https://github.com/krehwell?tab=repositories">
                                    view
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export async function getStaticProps() {
    const data = await getFiveNewestPost();

    return {
        props: {
            data,
        },
        revalidate: 60,
    };
}

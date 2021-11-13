import { useEffect } from "react";
import Prism from "prismjs";
import dayjs from "dayjs";
import Link from "next/link";

import "prismjs/plugins/line-numbers/prism-line-numbers.js";
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js";
import "prismjs/components/prism-vim.min.js";
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-json";
import { Giscus } from "@giscus/react";

import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import HeadMetadata from "../../components/headMetadata.js";

import getBlogPostByUrlTitle from "../../api/getBlogPostByUrlTitle.js";
import getAllBlogPost from "../../api/getAllBlogPosts.js";

export default function Title({ data }) {
    if (!data || Object.keys(data).length === 0) {
        return null;
    }

    useEffect(() => {
        Prism.highlightAll();
    });

    return (
        <div className="layout-wrapper">
            <HeadMetadata
                title={data.post ? data.post.seoTitleTag : "Blog Post | Coding Blog"}
                metaDescription={data.post && data.post.seoMetaDescription}
            />
            <Header />
            <div className="blog-post-container">
                {data.post && !data.getDataError && !data.notFoundError ? (
                    <>
                        <div className="blog-post-top-section">
                            <h1>{data.post.title}</h1>
                            <div className="blog-post-top-meta">
                                <span>{dayjs.unix(data.post.dateTimestamp).format("MMMM D, YYYY")}</span>
                                {data.post.tags.map((tag, index) => {
                                    return (
                                        <Link key={index} href={`/blog/tags/${tag}`}>
                                            <a className="blog-post-top-tag-btn">
                                                <span>{tag}</span>
                                            </a>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: data.post.markdownContent,
                            }}
                            className="blog-post-body-content"
                        />
                    </>
                ) : (
                    <div className="blog-post-get-data-error-msg">
                        {data.notFoundError ? (
                            <span>
                                Blog post not found. (if you really think this page should exist tho try to reload the
                                browser)
                            </span>
                        ) : (
                            <span>An error occurred.</span>
                        )}
                    </div>
                )}
            </div>
            <Giscus
                repo="krehwell/P-Blog"
                repoId="MDEwOlJlcG9zaXRvcnkzNDA3Nzc0ODI="
                category="General"
                categoryId="DIC_kwDOFE_aCs4B_2iF"
                mapping="title"
                reactionsEnabled="1"
                emitMetadata="0"
                theme="light"
                lang="en"
                crossorigin="anonymous"
            />
            <Footer />
        </div>
    );
}

export async function getStaticProps({ params }) {
    // console.log("params is", params);
    const data = await getBlogPostByUrlTitle(params.title);

    if (!data) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            data,
        },
        revalidate: 1,
    };
}

export async function getStaticPaths() {
    const data = await getAllBlogPost();

    const paths = data.posts.map((post) => ({
        params: { title: post.urlTitle },
    }));

    return { paths, fallback: true };
}

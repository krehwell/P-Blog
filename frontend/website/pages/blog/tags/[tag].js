import dayjs from "dayjs";
import useSwr from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import HeadMetadata from "../../../components/headMetadata";

import getBlogPostsByTag from "../../../api/getBlogPostByTag.js";

export default function Tag() {
    const router = useRouter();
    const tag = router.query.tag;

    const { data, error } = useSwr(
        `/posts/get-blog-posts-by-tag?tag=${tag}`,
        () => getBlogPostsByTag(tag),
        { revalidateOnFocus: false }
    );

    if (error) {
        return (
            <div className="layout-wrapper">
                <Header />
                <div className="blog-post-container">
                    <div>❌Failed to Load Blog Post by Tag</div>
                </div>
            </div>
        );
    }

    if (!data) {
        return (
            <div className="layout-wrapper">
                <HeadMetadata
                    title={`Posts tagged as "${tag}" | Coding Blog`}
                    metaDescription={`All blog posts tagged as "${tag}".`}
                />
                <Header />
                <div className="blog-posts-container">
                    <h1>
                        {" "}
                        Blog posts tagged as <u>{tag}</u>{" "}
                    </h1>
                    loading...
                </div>
            </div>
        );
    }

    return (
        <div className="layout-wrapper">
            <HeadMetadata
                title={`Posts tagged as "${tag}" | Coding Blog`}
                metaDescription={`All blog posts tagged as "${tag}".`}
            />
            <Header />
            <div className="blog-posts-container">
                <h1>
                    {" "}
                    Blog posts tagged as <u>{tag}</u>{" "}
                </h1>
                <div className="blog-posts-list">
                    {data.posts && !data.getDataError ? (
                        data.posts.map((post, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={`/blog/${post.urlTitle}`}>
                                    <a>
                                        <div className="blog-posts-list-item">
                                            <div className="blog-posts-thumbnail">
                                                <Image
                                                    src={post.thumbnailImageUrl}
                                                    alt="dickbutt image unrelated to the post"
                                                    height={65}
                                                    width={65}
                                                    quality={20}
                                                />
                                            </div>
                                            <div className="blog-posts-list-item-title-and-date">
                                                <h2>{post.title}</h2>
                                                <div className="blog-posts-list-item-date">
                                                    <span>
                                                        {dayjs
                                                            .unix(
                                                                post.dateTimestamp
                                                            )
                                                            .format(
                                                                "MMMM D, YYYY"
                                                            )}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </a>
                                </Link>
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

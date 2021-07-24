import dayjs from "dayjs";
import Link from "next/link";
import Image from "next/image";

import Header from "../../components/header.js";
import Footer from "../../components/footer.js";
import HeadMetadata from "../../components/headMetadata";

import getAllBlogPost from "../../api/getAllBlogPosts";

const Posts = ({ data }) => {
    let posts =
        data.posts && !data.getDataError ? (
            data.posts.map((post, index) => {
                return (
                    <Link key={index} href={`/blog/${post.urlTitle}`}>
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
                                                .unix(post.dateTimestamp)
                                                .format("MMMM D, YYYY")}
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
                <span>An error occurred while fetching Posts.</span>
            </div>
        );

    return posts;
};

export default function blog({ data }) {
    return (
        <div className="layout-wrapper">
            <HeadMetadata
                title="Blog Posts | krehwell"
                metaDescription="List of all blog posts public on krehwell blog"
            />
            <Header />
            <div className="blog-posts-container">
                <h1>📰 Blog posts</h1>
                <div className="blog-posts-list">
                    <Posts data={data} />
                </div>
            </div>
            <Footer />
        </div>
    );
}

export async function getStaticProps() {
    const data = await getAllBlogPost();

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

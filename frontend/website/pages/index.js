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
                metaDescription="a blog that krehwell made to express his uncertainty and unrelated topic with his life"
            />
            <Header />
            <div className="homepage-container">
                <div>
                    <h1>Hi, I'm krehwell. I am never sleepless.</h1>
                    <p>
                        This is where I write stuff. Abandon all hope. Leave all uncertainty of my future. And dump all
                        multimillion imaginary ideas.
                    </p>
                    <p>
                        This blog is a jamstack. And yes, this is following those tacky web developer who think that
                        instead of making a stupid LinkedIn bullshit, it is more efficient to waste 2 weeks building a
                        "from scratch" portfolio blog that has no visitor except the author.
                    </p>
                    <p>
                        This blog is <a href="https://github.com/krehwell/P-Blog">open-source</a> and is made using
                        Next.js. The doc teaches everything!
                    </p>
                </div>
                <div className="homepage-latest-blog-posts">
                    <h2>
                        📰 Latest Blog Posts{" "}
                        <Link href="/blog">
                            <a className="homepage-latest-blog-posts-view-all">View all</a>
                        </Link>
                    </h2>
                    <div className="homepage-latest-blog-posts-list">
                        <Posts data={data} />
                    </div>
                </div>
                <div className="homepage-projects">
                    <h2>🌍 My Pile of Shits</h2>
                    <div className="homepage-project-list">
                        <div className="homepage-project">
                            <h3>
                                <a href="https://github.com/krehwell/heckarNews/">
                                    <div className="homepage-project-icon"> 💼</div>
                                    <div className="homepage-project-title">HeckarNews</div>
                                </a>
                            </h3>
                            <p>
                                Hacker News Clone. Ad least 95% of the features are same + the search functionality is
                                working unlike the original forum itself
                            </p>
                            <div className="homepage-project-btns">
                                <a className="homepage-project-view-btn" href="https://forum.krehwell.com/">
                                    view
                                </a>
                            </div>
                        </div>
                        <div className="homepage-project">
                            <h3>
                                <a href="https://gitlab.com/krehwell/boomermath">
                                    <div className="homepage-project-icon"> 💣</div>
                                    <div className="homepage-project-title">Boomermath</div>
                                </a>
                            </h3>
                            <p>
                                Remember Bomberman in early 20's? Well, the remake is for those boomers who want to
                                learn math just so they think they were ever good at it
                            </p>
                            <div className="homepage-project-btns">
                                <a className="homepage-project-view-btn" href="https://gitlab.com/krehwell/boomermath">
                                    view
                                </a>
                            </div>
                        </div>
                        <div className="homepage-project">
                            <h3>
                                <a href="https://github.com/krehwell/Note10net">
                                    <div className="homepage-project-icon"> 📝</div>
                                    <div className="homepage-project-title">Note10net (note over internet)</div>
                                </a>
                            </h3>
                            <p>
                                You write your note, you save your note, you manage your note. but do it in on internet
                            </p>
                            <div className="homepage-project-btns">
                                <a className="homepage-project-view-btn" href="https://sexgod.herokuapp.com">
                                    view
                                </a>
                            </div>
                        </div>
                        <div className="homepage-project">
                            <h3>
                                <a href="https://github.com/krehwell/Callntol">
                                    <div className="homepage-project-icon">📞</div>
                                    <div className="homepage-project-title">Callntol</div>
                                </a>
                            </h3>
                            <p>Send message, call, and mocking each other easily (now supports video call)</p>
                            <div className="homepage-project-btns">
                                <a className="homepage-project-view-btn" href="https://callntol.vercel.app/">
                                    view
                                </a>
                            </div>
                        </div>
                        <div className="homepage-project">
                            <h3>
                                <a href="https://github.com/krehwell?tab=repositories">
                                    <div className="homepage-project-icon">💔</div>
                                    <div className="homepage-project-title">Other?</div>
                                </a>
                            </h3>
                            <p>
                                Etc. on my <a href="https://github.com/krehwell">GitHub</a>
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

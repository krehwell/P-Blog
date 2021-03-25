import moment from "moment";
import useSwr from "swr";
import { useRouter } from 'next/router';
import Link from "next/link";

import Header from "../../../components/header";
import Footer from "../../../components/footer";
import HeadMetadata from "../../../components/headMetadata";

import getBlogPostsByTag from "../../../api/getBlogPostByTag.js";

export default function Tag() {

      const router = useRouter();
      const tag = router.query.tag;

      const {data, error} = useSwr(`/posts/get-blog-posts-by-tag?tag=${tag}`, () => getBlogPostsByTag(tag), {revalidateOnFocus: false});

      if (error) {
          return (
              <div className="layout-wrapper">
                <Header />
                <div className="blog-post-container">
                  <div>❌Failed to Load Blog Post by Tag</div>
                </div>
              </div>
            )
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
                  <h1> Blog posts tagged as <u>{tag}</u> </h1>
                  Loading...
                </div>
              </div>
          )
      }

      return (
        <div className="layout-wrapper">
          <HeadMetadata
            title={`Posts tagged as "${tag}" | Coding Blog`}
            metaDescription={`All blog posts tagged as "${tag}".`}
          />
          <Header />
          <div className="blog-posts-container">
            <h1> Blog posts tagged as <u>{tag}</u> </h1>
            <div className="blog-posts-list">
              {data.posts && !data.getDataError ? (
                data.posts.map((post, index) => {
                  return (
                    <Link key={index} href={`/blog/${post.urlTitle}`}>
                      <a>
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

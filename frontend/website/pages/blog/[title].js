import { useEffect, useState } from 'react';
import Prism from "prismjs";
import moment from "moment";
import useSwr from "swr";
import { useRouter } from 'next/router';
import Link from "next/link";

import "prismjs/plugins/line-numbers/prism-line-numbers.js"
import "prismjs/plugins/normalize-whitespace/prism-normalize-whitespace.js"
import 'prismjs/components/prism-vim.min.js';
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-json';

import Header from "../../components/header.js"
import Footer from "../../components/footer.js"
import HeadMetadata from "../../components/headMetadata.js"

import getBlogPostByUrlTitle from "../../api/getBlogPostByUrlTitle.js"

export default function Title() {

    const router = useRouter();
    const urlTitle = router.query.title;

    const [rerenderPlease, setRerenderPlease] = useState(false);  // so that Prism understand when to highlight

    const {data, error} = useSwr(`/posts/get-blog-post-by-url-title?urlTitle=${urlTitle}`, () => getBlogPostByUrlTitle(urlTitle), {revalidateOnFocus: false});

    if (error) {
        return (
            <div className="layout-wrapper">
              <Header />
              <div className="blog-post-container">
                <div>❌Failed to Load Blog Posts.</div>
              </div>
            </div>
          )
    }

    if (!data) {
        return (
            <div className="layout-wrapper">
              <Header />
              <div className="blog-post-container">
                <div>loading...</div>
              </div>
            </div>
        )
    }

    useEffect(() => {
        Prism.highlightAll();
    }, [rerenderPlease]);

    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title={data.post ? data.post.seoTitleTag : "Blog Post | Coding Blog"}
          metaDescription={data.post && data.post.seoMetaDescription}
        />
        <Header />
        <div className="blog-post-container">
          {
            data.post && !data.getDataError && !data.notFoundError ?
              <>
                <div className="blog-post-top-section">
                  <h1>{data.post.title}</h1>
                  <div className="blog-post-top-meta">
                    <span>{moment.unix(data.post.dateTimestamp).format("MMMM Do, YYYY")}</span>
                    {
                      data.post.tags.map((tag, index) => {

                        setRerenderPlease(true); // ask Prism to highlight if this post is to be rendered

                        return (
                          <Link key={index} href={`/blog/tags/${tag}`} >
                            <a className="blog-post-top-tag-btn">
                              <span>{tag}</span>
                            </a>
                          </Link>
                        )
                      })
                    }
                  </div>
                </div>
                <div dangerouslySetInnerHTML={{__html: data.post.markdownContent}} className="blog-post-body-content">
                </div>
              </> :
              <div className="blog-post-get-data-error-msg">
                {
                  data.notFoundError ?
                    <span>
                      Blog post not found.
                      (if you really think this page should exist tho try to reload the browser)
                    </span> :
                    <span>An error occurred.</span>
                }
              </div>
          }
        </div>
        <Footer />
      </div>
    )
}

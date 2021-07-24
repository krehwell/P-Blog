import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import moment from "moment";
import { Controlled as CodeMirror } from "react-codemirror2";

import Header from "../../components/header.js";
import Sidebar from "../../components/sidebar.js";

import authUser from "../../api/admin-user/auth.js";
import createNewPost from "../../api/blog-posts/createNewPost";

if (typeof navigator !== "undefined") {
    require("codemirror/mode/markdown/markdown");
}

export default function CreateNewPost({}) {
    const router = useRouter();
    let codemirror = null;

    const [loading, setLoading] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [errorMsg, setErrorMsg] = useState(false);
    const [titleInputValue, setTitleInputValue] = useState("");
    const [urlTitleInputValue, setUrlTitleInputValue] = useState("");
    const [dateInputValue, setDateInputValue] = useState("");
    const [tagsInputValue, setTagsInputValue] = useState("");
    const [imageUrlInputValue, setImageUrlInputValue] = useState("");
    const [markdownInputValue, setMarkdownInputValue] = useState("");
    const [seoTitleTagInputValue, setSeoTitleTagInputValue] = useState("");
    const [seoTitleTagCharLeft, setSeoTitleTagCharLeft] = useState(60);
    const [metaDescriptionInputValue, setMetaDescriptionInputValue] = useState("");
    const [metaDescriptionCharLeft, setMetaDescriptionCharLeft] = useState(160);

    const updateTitleInputValue = (e) => {
        setTitleInputValue(e.target.value);
    };

    const updateUrlTitleInputValue = (e) => {
        setUrlTitleInputValue(e.target.value);
    };

    const setUrlTitleInputValueAutoGenerate = () => {
        const curTitleInputValue = titleInputValue.trim().toLowerCase();

        if (curTitleInputValue !== "") {
            setUrlTitleInputValue(curTitleInputValue.split(" ").join("-"));
        }
    };

    const updateDateInputValue = (e) => {
        setDateInputValue(e.target.value);
    };

    const setDateInputValueToNow = () => {
        const dateString = moment().format("YYYY-MM-DD");
        const timeString = moment().format("HH:mm");
        setDateInputValue(dateString + "T" + timeString);
    };

    const updateImageUrlInputValue = (e) => {
        setImageUrlInputValue(e.target.value);
    };

    const updateTagsInputValue = (e) => {
        setTagsInputValue(e.target.value);
    };

    const updateMarkdownInputValue = (value) => {
        setMarkdownInputValue(value);
    };

    const updateSeoTitleTagInputValue = (e) => {
        let charLeft = 0;
        if (60 - e.target.value.length > 0) {
            charLeft = 60 - e.target.value.length;
        } else {
            charLeft = 0;
        }

        setSeoTitleTagInputValue(e.target.value);
        setSeoTitleTagCharLeft(charLeft);
    };

    const updateMetaDescriptionInputValue = (e) => {
        let charLeft;
        if (160 - e.target.value.length > 0) {
            charLeft = 160 - e.target.value.length;
        } else {
            charLeft = 0;
        }

        setMetaDescriptionInputValue(e.target.value);
        setMetaDescriptionCharLeft(charLeft);
    };

    const submitCreateNewPostRequest = () => {
        if (!titleInputValue) {
            setSubmitError(true);
            setErrorMsg("Title field is required.");
        } else if (!urlTitleInputValue) {
            setSubmitError(true);
            setErrorMsg("URL title field is required.");
        } else if (!dateInputValue) {
            setSubmitError(true);
            setErrorMsg("Date field is required.");
        } else if (!tagsInputValue) {
            setSubmitError(true);
            setErrorMsg("Date field is required.");
        } else if (!imageUrlInputValue) {
            setSubmitError(true);
            setErrorMsg("Image URL field is required.");
        } else if (!markdownInputValue) {
            setSubmitError(true);
            setErrorMsg("Markdown content field is required.");
        } else if (!seoTitleTagInputValue) {
            setSubmitError(true);
            setErrorMsg("SEO title field is required.");
        } else if (!metaDescriptionInputValue) {
            setSubmitError(true);
            setErrorMsg("Meta description field is required.");
        } else {
            setLoading(true);
            setSubmitError(false);
            setErrorMsg("");

            createNewPost(
                titleInputValue,
                urlTitleInputValue,
                moment(dateInputValue).valueOf() / 1000,
                tagsInputValue,
                imageUrlInputValue,
                markdownInputValue,
                seoTitleTagInputValue,
                metaDescriptionInputValue,
                (apiResponse) => {
                    setLoading(false);
                    if (!apiResponse.authSuccess) {
                        router.push("/login");
                    } else if (apiResponse.alreadyExistsError) {
                        setSubmitError(true);
                        setErrorMsg("Blog post with that title already exists.");
                    } else if (apiResponse.submitError || !apiResponse.success) {
                        setSubmitError(true);
                        setErrorMsg("An error occurred.");
                    } else {
                        router.push("/");
                    }
                }
            );
        }
    };

    return (
        <div className="layout-wrapper">
            <Head>
                <title>Create New Post | Admin</title>
            </Head>
            <Header />
            <Sidebar page="blog-posts" />
            <div className="layout-content-container">
                <div className="create-blog-post-content">
                    <div className="create-blog-post-header">
                        <span>Create New Blog Post</span>
                    </div>
                    <div className="create-blog-post-form-container">
                        <div className="create-blog-post-form-section">
                            <div className="create-blog-post-form-section-label">
                                <span>Title</span>
                            </div>
                            <div className="create-blog-post-form-section-input">
                                <input type="text" value={titleInputValue} onChange={updateTitleInputValue} />
                            </div>
                        </div>
                        <div className="create-blog-post-form-section">
                            <div className="create-blog-post-form-section-label">
                                <span>Url Title</span>
                            </div>
                            <div className="create-blog-post-form-section-input">
                                <input type="text" value={urlTitleInputValue} onChange={updateUrlTitleInputValue} />
                                <span
                                    onClick={() => setUrlTitleInputValueAutoGenerate()}
                                    className="create-blog-post-form-section-date-input-now">
                                    Generate
                                </span>
                            </div>
                        </div>
                        <div className="create-blog-post-form-section">
                            <div className="create-blog-post-form-section-label">
                                <span>Date</span>
                            </div>
                            <div className="create-blog-post-form-section-date-input">
                                <input type="datetime-local" value={dateInputValue} onChange={updateDateInputValue} />
                                <span
                                    onClick={() => setDateInputValueToNow()}
                                    className="create-blog-post-form-section-date-input-now">
                                    Now
                                </span>
                            </div>
                        </div>
                        <div className="create-blog-post-form-section">
                            <div className="create-blog-post-form-section-label">
                                <span>Image URL</span>
                            </div>
                            <div className="create-blog-post-form-section-input">
                                <input type="text" value={imageUrlInputValue} onChange={updateImageUrlInputValue} />
                            </div>
                        </div>
                        <div className="create-blog-post-form-section">
                            <div className="create-blog-post-form-section-label">
                                <span>Tags</span>
                            </div>
                            <div className="create-blog-post-form-section-input">
                                <input type="text" value={tagsInputValue} onChange={updateTagsInputValue} />
                            </div>
                        </div>
                        <div className="create-blog-post-form-section">
                            <div className="create-blog-post-form-section-label">
                                <span>Markdown Content</span>
                            </div>
                            <div className="create-blog-post-form-section-code-content-input">
                                {CodeMirror && (
                                    <CodeMirror
                                        className="create-blog-post-form-section-codemirror"
                                        editorDidMount={(editor) => {
                                            codemirror = editor;
                                        }}
                                        value={markdownInputValue}
                                        onBeforeChange={(editor, data, value) => {
                                            updateMarkdownInputValue(value);
                                        }}
                                        onChange={(editor, data, value) => {
                                            updateMarkdownInputValue(value);
                                        }}
                                        options={{
                                            mode: "markdown",
                                            theme: "dracula",
                                            lineNumbers: true,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <div className="create-blog-post-seo-section-title">
                            <span>SEO</span>
                        </div>
                        <div className="create-blog-post-form-section">
                            <div className="create-blog-post-form-section-label">
                                <span>Title Tag</span>
                            </div>
                            <div className="create-blog-post-form-section-input">
                                <input
                                    type="text"
                                    value={seoTitleTagInputValue}
                                    onChange={updateSeoTitleTagInputValue}
                                />
                                <span className={seoTitleTagCharLeft > 0 ? "char-length green" : "char-length red"}>
                                    {seoTitleTagCharLeft}
                                </span>
                            </div>
                        </div>
                        <div className="create-blog-post-form-section">
                            <div className="create-blog-post-form-section-label">
                                <span>Meta Description</span>
                            </div>
                            <div className="create-blog-post-form-section-input">
                                <textarea
                                    type="text"
                                    value={metaDescriptionInputValue}
                                    onChange={updateMetaDescriptionInputValue}
                                />
                                <span className={metaDescriptionCharLeft > 0 ? "char-length green" : "char-length red"}>
                                    {metaDescriptionCharLeft}
                                </span>
                            </div>
                        </div>
                        <div className="create-blog-post-form-btn-container">
                            {!loading ? (
                                <div onClick={submitCreateNewPostRequest} className="create-blog-post-form-btn">
                                    <span>Submit</span>
                                </div>
                            ) : (
                                <div className="create-blog-post-form-btn loading">
                                    <span>Loading</span>
                                </div>
                            )}
                        </div>
                        {submitError ? (
                            <div className="create-blog-post-submit-error-msg">
                                <span>{errorMsg}</span>
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ req, res }) {
    let authResult = await authUser(req);

    if (!authResult.success) {
        res.writeHead(302, { Location: "/login" });
        res.end();
    }

    return { props: {} };
}

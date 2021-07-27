import { useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import dayjs from "dayjs";
import { Controlled as CodeMirror } from "react-codemirror2";
import capitalizeTitle from "capitalize-title";

const Header = dynamic(() => import("../../../components/header.js"));
const Sidebar = dynamic(() => import("../../../components/sidebar.js"));
const DeleteBlogPostModal = dynamic(() => import("../../../components/modals/deleteBlogPost.js"));

import getBlogPostById from "../../../api/blog-posts/getPostById.js";
import editBlogPost from "../../../api/blog-posts/editBlogPost.js";
import deleteBlogPost from "../../../api/blog-posts/deleteBlogPost.js";

// codemirror
import("codemirror/lib/codemirror.css");
import("codemirror/theme/dracula.css");

if (typeof navigator !== "undefined") {
    require("codemirror/mode/markdown/markdown");
}

export default function Id({ post, getDataError, notFoundError }) {
    const router = useRouter();

    const [submitLoading, setSubmitLoading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");

    const [titleInputValue, setTitleInputValue] = useState(post?.title);
    const [urlTitleInputValue, setUrlTitleInputValue] = useState(post?.urlTitle);
    const [dateInputValue, setDateInputValue] = useState(
        dayjs.unix(post?.dateTimestamp).format("YYYY-MM-DD") + "T" + dayjs.unix(post?.dateTimestamp).format("HH:mm")
    );
    const [tagsInputValue, setTagsInputValue] = useState(post.tags.join(", "));
    const [imageUrlInputValue, setImageUrlInputValue] = useState(post?.thumbnailImageUrl);
    const [markdownInputValue, setMarkdownInputValue] = useState(post?.markdownContent);
    const [seoTitleTagInputValue, setSeoTitleTagInputValue] = useState(post?.seoTitleTag);
    const [seoTitleTagCharLeft, setSeoTitleTagCharLeft] = useState(60 - post?.seoTitleTag.length);
    const [metaDescriptionInputValue, setMetaDescriptionInputValue] = useState(post.seoMetaDescription);
    const [metaDescriptionCharLeft, setMetaDescriptionCharLeft] = useState(160 - post?.seoMetaDescription.length);

    const [deleteError, setDeleteError] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    let codemirror = null;

    const updateTitleInputValue = (e) => {
        setTitleInputValue(e.target.value);
    };

    const updateUrlTitleInputValue = (e) => {
        setUrlTitleInputValue(e.target.value);
    };

    const setUrlTitleInputValueAutoGenerate = () => {
        const curTitleInputValue = titleInputValue
            .match(/(\w)*/g)
            .filter((w) => w)
            .join("-")
            .toLowerCase();

        if (curTitleInputValue !== "") {
            setUrlTitleInputValue(curTitleInputValue);
        }
    };

    const updateDateInputValue = (e) => {
        setDateInputValue(e.target.value);
    };

    const setDateInputValueToNow = () => {
        const dateString = dayjs().format("YYYY-MM-DD");
        const timeString = dayjs().format("HH:mm");
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

    const showSuccessMsg = () => {
        setSubmitSuccess(true);

        setTimeout(() => {
            setSubmitSuccess(false);
        }, 3000);
    };

    const submitEditPostRequest = () => {
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
            setSubmitLoading(true);
            setSubmitSuccess(false);
            setSubmitError(false);
            setErrorMsg("");

            editBlogPost(
                post.id,
                titleInputValue,
                urlTitleInputValue,
                dayjs(dateInputValue).valueOf() / 1000,
                tagsInputValue,
                imageUrlInputValue,
                markdownInputValue,
                seoTitleTagInputValue,
                metaDescriptionInputValue,
                (apiResponse) => {
                    setSubmitLoading(false);
                    if (apiResponse.submitError) {
                        setSubmitSuccess(false);
                        setSubmitError(true);
                        setErrorMsg("An error occurred.");
                    } else if (!apiResponse.authSuccess) {
                        router.push("/login");
                    } else if (apiResponse.notFoundError) {
                        setSubmitSuccess(false);
                        setSubmitError(true);
                        setErrorMsg("Blog post not found.");
                    } else if (!apiResponse.success) {
                        setSubmitSuccess(false);
                        setSubmitError(true);
                        setErrorMsg("An error occurred.");
                    } else {
                        setSubmitError(false);
                        setSubmitLoading(false);
                        showSuccessMsg();
                    }
                }
            );
        }
    };

    const showDeleteModalRequest = () => {
        setShowDeleteModal(true);
    };

    const hideDeleteModalRequest = () => {
        setDeleteError(false);
        setDeleteLoading(false);
        setShowDeleteModal(false);
    };

    const deleteBlogPostRequest = () => {
        setDeleteLoading(true);

        deleteBlogPost(post.id, (apiResponse) => {
            setDeleteLoading(false);

            if (apiResponse.submitError) {
                setDeleteError(true);
                setDeleteLoading(false);
                setShowDeleteModal(false);
            } else if (!apiResponse.authSuccess) {
                router.push("/login");
            } else if (!apiResponse.success) {
                setDeleteError(true);
                setDeleteLoading(false);
                setShowDeleteModal(false);
            } else {
                router.push("/");
            }
        });
    };

    return (
        <div className="layout-wrapper">
            <Head>
                <title>Edit Post | Admin</title>
            </Head>
            <Header />
            <Sidebar page="blog-posts" />
            <div className="layout-content-container">
                {!getDataError && !notFoundError ? (
                    <div className="edit-blog-post-content">
                        <div className="edit-blog-post-header">
                            <span>Edit Blog Post</span>
                        </div>
                        <div className="edit-blog-post-form-container">
                            <div className="edit-blog-post-form-section">
                                <div className="edit-blog-post-form-section-label">
                                    <span>Title</span>
                                </div>
                                <div className="edit-blog-post-form-section-input">
                                    <input type="text" value={titleInputValue} onChange={updateTitleInputValue} />
                                    <span
                                        onClick={() => setTitleInputValue(capitalizeTitle(titleInputValue))}
                                        className="create-blog-post-form-section-date-input-now">
                                        Capitalize
                                    </span>
                                </div>
                            </div>
                            <div className="edit-blog-post-form-section">
                                <div className="edit-blog-post-form-section-label">
                                    <span>Url Title</span>
                                </div>
                                <div className="edit-blog-post-form-section-input">
                                    <input type="text" value={urlTitleInputValue} onChange={updateUrlTitleInputValue} />
                                    <span
                                        onClick={() => setUrlTitleInputValueAutoGenerate()}
                                        className="edit-blog-post-form-section-date-input-now">
                                        Generate Url
                                    </span>
                                </div>
                            </div>
                            <div className="edit-blog-post-form-section">
                                <div className="edit-blog-post-form-section-label">
                                    <span>Date</span>
                                </div>
                                <div className="edit-blog-post-form-section-input">
                                    <input
                                        type="datetime-local"
                                        value={dateInputValue}
                                        onChange={updateDateInputValue}
                                    />
                                    <span
                                        onClick={() => setDateInputValueToNow()}
                                        className="edit-blog-post-form-section-date-input-now">
                                        Now
                                    </span>
                                </div>
                            </div>
                            <div className="edit-blog-post-form-section">
                                <div className="edit-blog-post-form-section-label">
                                    <span>Image URL</span>
                                </div>
                                <div className="edit-blog-post-form-section-input">
                                    <input type="text" value={imageUrlInputValue} onChange={updateImageUrlInputValue} />
                                </div>
                            </div>
                            <div className="edit-blog-post-form-section">
                                <div className="edit-blog-post-form-section-label">
                                    <span>Tags</span>
                                </div>
                                <div className="edit-blog-post-form-section-input">
                                    <input type="text" value={tagsInputValue} onChange={updateTagsInputValue} />
                                </div>
                            </div>
                            <div className="edit-blog-post-form-section">
                                <div className="edit-blog-post-form-section-label">
                                    <span>Markdown Content</span>
                                </div>
                                <div className="edit-blog-post-form-section-code-content-input">
                                    {CodeMirror && (
                                        <CodeMirror
                                            className="edit-blog-post-form-section-codemirror"
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
                            <div className="edit-blog-post-seo-section-title">
                                <span>SEO</span>
                            </div>
                            <div className="edit-blog-post-form-section">
                                <div className="edit-blog-post-form-section-label">
                                    <span>Title Tag</span>
                                </div>
                                <div className="edit-blog-post-form-section-input">
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
                            <div className="edit-blog-post-form-section">
                                <div className="edit-blog-post-form-section-label">
                                    <span>Meta Description</span>
                                </div>
                                <div className="edit-blog-post-form-section-input">
                                    <textarea
                                        type="text"
                                        value={metaDescriptionInputValue}
                                        onChange={updateMetaDescriptionInputValue}
                                    />
                                    <span
                                        className={
                                            metaDescriptionCharLeft > 0 ? "char-length green" : "char-length red"
                                        }>
                                        {metaDescriptionCharLeft}
                                    </span>
                                </div>
                            </div>
                            <div className="edit-blog-post-form-btns-section">
                                <div className="edit-blog-post-form-submit-btn-container">
                                    {!submitLoading ? (
                                        <div onClick={submitEditPostRequest} className="edit-blog-post-form-btn">
                                            <span>Submit</span>
                                        </div>
                                    ) : (
                                        <div className="edit-blog-post-form-btn loading">
                                            <span>Loading</span>
                                        </div>
                                    )}
                                </div>
                                <div onClick={showDeleteModalRequest} className="edit-blog-post-form-delete">
                                    <span>Delete</span>
                                </div>
                            </div>
                            {submitError ? (
                                <div className="edit-blog-post-submit-error-msg">
                                    <span>{errorMsg}</span>
                                </div>
                            ) : null}
                            {submitSuccess ? (
                                <div className="edit-blog-post-submit-success-msg">
                                    <span>Success!</span>
                                </div>
                            ) : null}
                        </div>
                    </div>
                ) : (
                    <div className="edit-blog-post-get-data-error-msg">
                        {getDataError ? <span>An error occurred.</span> : <span>Blog post not found.</span>}
                    </div>
                )}
            </div>
            <DeleteBlogPostModal
                error={deleteError}
                loading={deleteLoading}
                show={showDeleteModal}
                hideRequest={hideDeleteModalRequest}
                deleteBlogPostRequest={deleteBlogPostRequest}
            />
        </div>
    );
}

export async function getServerSideProps({ req, res, query }) {
    const apiResult = await getBlogPostById(query.id, req);

    if (!apiResult.authSuccess) {
        res.writeHead(302, { Location: "/login" });
        res.end();
    }

    return {
        props: {
            post: (apiResult && apiResult.post) || {},
            getDataError: (apiResult && apiResult.getDataError) || false,
            notFoundError: (apiResult && apiResult.notFoundError) || false,
        },
    };
}

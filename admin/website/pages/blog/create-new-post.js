import {Component} from "react";
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

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            submitError: false,
            errorMsg: "",
            titleInputValue: "",
            urlTitleInputValue: "",
            dateInputValue: "",
            tagsInputValue: "",
            imageUrlInputValue: "",
            markdownInputValue: "",
            seoTitleTagInputValue: "",
            seoTitleTagCharLeft: 60,
            metaDescriptionInputValue: "",
            metaDescriptionCharLeft: 160,
        }

        this.codeMirror = null;
    }

    static async getInitialProps({req, res}) {
        let authResult = await authUser(req);

        if(!authResult.success) {
            res.writeHead(302, {Location: "/login"});
            res.end();
        }

        return {}
    }

    updateTitleInputValue = (event) => {
        this.setState({titleInputValue: event.target.value})
    }

    updateUrlTitleInputValue = (event) => {
        this.setState({urlTitleInputValue: event.target.value})
    }

    updateDateInputValue = (event) => {
        this.setState({dateInputValue: event.target.value})
    }

    setDateInputValueToNow = () => {
        const dateString = moment().format("YYYY-MM-DD");
        const timeString = moment().format("HH:mm");
        this.setState({dateInputValue: dateString + "T" + timeString});
    }

    updateImageUrlInputValue = (event) => {
        this.setState({imageUrlInputValue: event.target.value})
    }

    updateTagsInputValue = (event) => {
        this.setState({tagsInputValue: event.target.value})
    }

    updateMarkdownInputValue = (value) => {
        this.setState({markdownInputValue: value})
    }

    updateSeoTitleTagInputValue = (event) => {
        let charLeft = 0;
        if (60 - event.target.value.length > 0) {
            charLeft = 60 - event.target.value.length
        } else {
            charLeft = 0
        }

        this.setState({
            seoTitleTagInputValue: event.target.value,
            seoTitleTagCharLeft: charLeft
        })
    }

    updateMetaDescriptionInputValue = (event) => {
        let charLeft
        if (160 - event.target.value.length > 0) {
            charLeft = 160 - event.target.value.length
        } else {
            charLeft = 0
        }

        this.setState({
            metaDescriptionInputValue: event.target.value,
            metaDescriptionCharLeft: charLeft
        })
    }

    submitCreateNewPostRequest = () => {
        if (!this.state.titleInputValue) {
            this.setState({submitError: true, errorMsg: "Title field is required."})
        } else if (!this.state.urlTitleInputValue) {
            this.setState({submitError: true, errorMsg: "URL title field is required."})
        } else if (!this.state.dateInputValue) {
            this.setState({submitError: true, errorMsg: "Date field is required."})
        } else if (!this.state.tagsInputValue) {
            this.setState({submitError: true, errorMsg: "Date field is required."})
        } else if (!this.state.imageUrlInputValue) {
            this.setState({submitError: true, errorMsg: "Image URL field is required."})
        } else if (!this.state.markdownInputValue) {
            this.setState({submitError: true, errorMsg: "Markdown content field is required."})
        } else if (!this.state.seoTitleTagInputValue) {
            this.setState({submitError: true, errorMsg: "SEO title field is required."})
        } else if (!this.state.metaDescriptionInputValue) {
            this.setState({submitError: true, errorMsg: "Meta description field is required."})
        } else {
            this.setState({submitError: false, errorMsg: "", loading: true})

            const self = this

            createNewPost(
                this.state.titleInputValue,
                this.state.urlTitleInputValue,
                moment(this.state.dateInputValue).valueOf() / 1000,
                this.state.tagsInputValue,
                this.state.imageUrlInputValue,
                this.state.markdownInputValue,
                this.state.seoTitleTagInputValue,
                this.state.metaDescriptionInputValue,
                function(apiResponse) {
                    if (!apiResponse.authSuccess) {
                        window.location.href = "/login"
                    } else if (apiResponse.alreadyExistsError) {
                        self.setState({submitError: true, errorMsg: "Blog post with that title already exists.", loading: false})
                    } else if (apiResponse.submitError || !apiResponse.success) {
                        self.setState({submitError: true, errorMsg: "An error occurred.", loading: false})
                    } else {
                        window.location.href = "/"
                    }
                }
            )
        }
    }

    render() {
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
                      <input
                        type="text"
                        value={this.state.titleInputValue}
                        onChange={this.updateTitleInputValue}
                      />
                    </div>
                  </div>
                  <div className="create-blog-post-form-section">
                    <div className="create-blog-post-form-section-label">
                      <span>Url Title</span>
                    </div>
                    <div className="create-blog-post-form-section-input">
                      <input
                        type="text"
                        value={this.state.urlTitleInputValue}
                        onChange={this.updateUrlTitleInputValue}
                      />
                    </div>
                  </div>
                  <div className="create-blog-post-form-section">
                    <div className="create-blog-post-form-section-label">
                      <span>Date</span>
                    </div>
                    <div className="create-blog-post-form-section-date-input">
                      <input
                        type="datetime-local"
                        value={this.state.dateInputValue}
                        onChange={this.updateDateInputValue}
                      />
                      <span onClick={() => this.setDateInputValueToNow()} className="create-blog-post-form-section-date-input-now">Now</span>
                    </div>
                  </div>
                  <div className="create-blog-post-form-section">
                    <div className="create-blog-post-form-section-label">
                      <span>Image URL</span>
                    </div>
                    <div className="create-blog-post-form-section-input">
                      <input
                        type="text"
                        value={this.state.imageUrlInputValue}
                        onChange={this.updateImageUrlInputValue}
                      />
                    </div>
                  </div>
                  <div className="create-blog-post-form-section">
                    <div className="create-blog-post-form-section-label">
                      <span>Tags</span>
                    </div>
                    <div className="create-blog-post-form-section-input">
                      <input
                        type="text"
                        value={this.state.tagsInputValue}
                        onChange={this.updateTagsInputValue}
                      />
                    </div>
                  </div>
                  <div className="create-blog-post-form-section">
                    <div className="create-blog-post-form-section-label">
                      <span>Markdown Content</span>
                    </div>
                    <div className="create-blog-post-form-section-code-content-input">
                      {
                        CodeMirror &&
                            <CodeMirror
                              className="create-blog-post-form-section-codemirror"
                              editorDidMount={editor => {
                                this.codemirror = editor;
                              }}
                              value={this.state.markdownInputValue}
                              onBeforeChange={(editor, data, value) => {
                                this.updateMarkdownInputValue(value)
                              }}
                              onChange={(editor, data, value) => {
                                this.updateMarkdownInputValue(value)
                              }}
                              options={{
                                mode: "markdown",
                                theme: "dracula",
                                lineNumbers: true
                              }}
                            />
                      }
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
                        value={this.state.seoTitleTagInputValue}
                        onChange={this.updateSeoTitleTagInputValue}
                      />
                      <span className={this.state.seoTitleTagCharLeft > 0 ? "char-length green" : "char-length red"}>{this.state.seoTitleTagCharLeft}</span>
                    </div>
                  </div>
                  <div className="create-blog-post-form-section">
                    <div className="create-blog-post-form-section-label">
                      <span>Meta Description</span>
                    </div>
                    <div className="create-blog-post-form-section-input">
                      <textarea
                        type="text"
                        value={this.state.metaDescriptionInputValue}
                        onChange={this.updateMetaDescriptionInputValue}
                      />
                      <span className={this.state.metaDescriptionCharLeft > 0 ? "char-length green" : "char-length red"}>
                        {this.state.metaDescriptionCharLeft}
                      </span>
                    </div>
                  </div>
                  <div className="create-blog-post-form-btn-container">
                    {
                      !this.state.loading ?
                        <div onClick={this.submitCreateNewPostRequest} className="create-blog-post-form-btn">
                          <span>Submit</span>
                        </div> :
                        <div className="create-blog-post-form-btn loading">
                          <span>Loading</span>
                        </div>
                    }
                  </div>
                  {
                    this.state.submitError ?
                      <div className="create-blog-post-submit-error-msg">
                        <span>{this.state.errorMsg}</span>
                      </div> : null
                  }
                </div>
              </div>
            </div>
          </div>
        )
    }

}

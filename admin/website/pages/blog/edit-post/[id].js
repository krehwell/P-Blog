import React, {Component} from "react";
import Head from "next/head";
import moment from "moment";
import { Controlled as CodeMirror } from "react-codemirror2";

import Header from "../../../components/header.js"
import Sidebar from "../../../components/sidebar.js";
import DeleteBlogPostModal from "../../../components/modals/deleteBlogPost.js"

if (typeof navigator !== "undefined") {
    require("codemirror/mode/markdown/markdown");
}

export default class extends Component {

    constructor(props) {
        super(props);

		this.state = {
			submitLoading: false,
			submitError: false,
			errorMsg: "",
			titleInputValue: "Blog Post Title",
			urlTitleInputValue: "blog-post-title",
			dateInputValue: "2050-01-01T12:00",
			tagsInputValue: "html, css, javascript",
			imageUrlInputValue: "https://assets.coderrocketfuel.com/coding-blog-git-thumbnail.png",
			markdownInputValue: "# Markdown content",
			seoTitleTagInputValue: "Blog Post Title | Coding Blog",
			seoTitleTagCharLeft: 60,
			metaDescriptionInputValue: "The seo meta description for the blog post goes here.",
			metaDescriptionCharLeft: 160,
			//delete modal
			deleteError: false,
			deleteLoading: false,
			showDeleteModal: false
		}

        this.codemirror = null;
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
		const dateString = moment().format("YYYY-MM-DD")
		const timeString = moment().format("HH:mm")
		this.setState({dateInputValue: dateString + "T" + timeString})
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
		let charLeft
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

	submitEditPostRequest = () => {
		this.setState({submitLoading: true})
	}

	showDeleteModalRequest = () => {
		this.setState({showDeleteModal: true})
	}

	hideDeleteModalRequest = () => {
		this.setState({deleteError: false, deleteLoading: false, showDeleteModal: false})
	}

	deleteBlogPostRequest = () => {
		this.setState({deleteLoading: true})
	}

    render () {
        return (
          <div className="layout-wrapper">
            <Head>
              <title>Edit Post | Admin</title>
            </Head>
            <Header />
            <Sidebar page="blog-posts" />
            <div className="layout-content-container">
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
                      <input
                        type="text"
                        value={this.state.titleInputValue}
                        onChange={this.updateTitleInputValue}
                      />
                    </div>
                  </div>
                  <div className="edit-blog-post-form-section">
                    <div className="edit-blog-post-form-section-label">
                      <span>Url Title</span>
                    </div>
                    <div className="edit-blog-post-form-section-input">
                      <input
                        type="text"
                        value={this.state.urlTitleInputValue}
                        onChange={this.updateUrlTitleInputValue}
                      />
                    </div>
                  </div>
                  <div className="edit-blog-post-form-section">
                    <div className="edit-blog-post-form-section-label">
                      <span>Date</span>
                    </div>
                    <div className="edit-blog-post-form-section-input">
                      <input
                        type="datetime-local"
                        value={this.state.dateInputValue}
                        onChange={this.updateDateInputValue}
                      />
                      <span onClick={() => this.setDateInputValueToNow()} className="edit-blog-post-form-section-date-input-now">Now</span>
                    </div>
                  </div>
                  <div className="edit-blog-post-form-section">
                    <div className="edit-blog-post-form-section-label">
                      <span>Image URL</span>
                    </div>
                    <div className="edit-blog-post-form-section-input">
                      <input
                        type="text"
                        value={this.state.imageUrlInputValue}
                        onChange={this.updateImageUrlInputValue}
                      />
                    </div>
                  </div>
                  <div className="edit-blog-post-form-section">
                    <div className="edit-blog-post-form-section-label">
                      <span>Tags</span>
                    </div>
                    <div className="edit-blog-post-form-section-input">
                      <input
                        type="text"
                        value={this.state.tagsInputValue}
                        onChange={this.updateTagsInputValue}
                      />
                    </div>
                  </div>
                  <div className="edit-blog-post-form-section">
                    <div className="edit-blog-post-form-section-label">
                      <span>Markdown Content</span>
                    </div>
                    <div className="edit-blog-post-form-section-code-content-input">
                      {
                        CodeMirror &&
                          <CodeMirror
                            className="edit-blog-post-form-section-codemirror"
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
                        value={this.state.seoTitleTagInputValue}
                        onChange={this.updateSeoTitleTagInputValue}
                      />
                      <span className={this.state.seoTitleTagCharLeft > 0 ? "char-length green" : "char-length red"}>{this.state.seoTitleTagCharLeft}</span>
                    </div>
                  </div>
                  <div className="edit-blog-post-form-section">
                    <div className="edit-blog-post-form-section-label">
                      <span>Meta Description</span>
                    </div>
                    <div className="edit-blog-post-form-section-input">
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
                  <div className="edit-blog-post-form-btns-section">
                    <div className="edit-blog-post-form-submit-btn-container">
                      {
                        !this.state.submitLoading ?
                          <div onClick={this.submitEditPostRequest} className="edit-blog-post-form-btn">
                            <span>Submit</span>
                          </div> :
                          <div className="edit-blog-post-form-btn loading">
                            <span>Loading</span>
                          </div>
                      }
                    </div>
                    <div onClick={this.showDeleteModalRequest} className="edit-blog-post-form-delete">
                      <span>Delete</span>
                    </div>
                  </div>
                  {
                    this.state.submitError ?
                      <div className="edit-blog-post-submit-error-msg">
                        <span>{this.state.errorMsg}</span>
                      </div> : null
                  }
                  {
                    this.state.submitSuccess ?
                      <div className="edit-blog-post-submit-success-msg">
                        <span>Success!</span>
                      </div> : null
                  }
                </div>
              </div>
            </div>
            <DeleteBlogPostModal
              error={this.state.deleteError}
              loading={this.state.deleteLoading}
              show={this.state.showDeleteModal}
              hideRequest={this.hideDeleteModalRequest}
              deleteBlogPostRequest={this.deleteBlogPostRequest}
            />
          </div>
        )
    }

}

import { Component } from "react";

export default class extends Component {
    render() {
        return (
            <div
                className={
                    this.props.show
                        ? "delete-blog-post-modal-wrapper show-delete-blog-post-modal"
                        : "delete-blog-post-modal-wrapper"
                }>
                <div className="delete-blog-post-modal-content">
                    <div className="delete-blog-post-modal-close-wrapper">
                        <div className="delete-blog-post-modal-close-button">
                            <svg
                                onClick={this.props.hideRequest}
                                fill="#FFFFFF"
                                width="32"
                                height="32"
                                viewBox="0 0 32 32"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    clipRule="evenodd"
                                    d="M16 31c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C7.716 1 1 7.716 1 16c0 8.284 6.716 15 15 15z"
                                    stroke="#c6c6c6"></path>
                                <path
                                    d="M12 12l8.485 8.485M20.485 12L12 20.485"
                                    stroke="#c6c6c6"
                                    strokeLinecap="square"></path>
                            </svg>
                        </div>
                    </div>
                    {!this.props.error ? (
                        <div className="delete-blog-post-modal-inner-content">
                            <div className="delete-blog-post-modal-content-title">
                                <span>Confirmation Required</span>
                            </div>
                            <div className="delete-blog-post-modal-content-text-wrapper">
                                <div className="delete-blog-post-modal-content-text">
                                    <span>Are you sure you want to delete this blog post&#63;</span>
                                </div>
                            </div>
                            <div className="delete-blog-post-modal-confirm-btn-container">
                                {this.props.loading ? (
                                    <div className="delete-blog-post-modal-confirm-btn loading">
                                        <span>Loading</span>
                                    </div>
                                ) : (
                                    <div
                                        onClick={this.props.deleteBlogPostRequest}
                                        className="delete-blog-post-modal-confirm-btn">
                                        <span>Confirm</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="delete-blog-post-modal-error-wrapper">
                            <div className="delete-blog-post-modal-error-title">
                                <span>Delete Blog Post Error</span>
                            </div>
                            <div className="delete-blog-post-modal-error-text">
                                <span>Error occurred deleting the blog post.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

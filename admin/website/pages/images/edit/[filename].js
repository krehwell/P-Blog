import React, { Component } from "react";
import Head from "next/head";

import Header from "../../../components/header.js";
import Sidebar from "../../../components/sidebar.js";
import DeleteImageModal from "../../../components/modals/deleteImage.js";

export default class extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // file update
            filenameInputValue: this.props.filename,
            updateLoading: false,
            updateSubmitError: false,
            filenameAlreadyExistError: false,
            updateSuccess: false,

            // delete
            showDeleteModal: false,
            deleteLoading: false,
            deleteError: false,
        };
    }

    updateFilenameInputValue = (event) => {
        this.setState({ filenameInputValue: event.target.value });
    };

    submitUpdateRequest = () => {
        this.setState({ updateLoading: true, updateSuccess: false });
    };

    hideDeleteImageModal = () => {
        this.setState({
            showDeleteImageModal: false,
            deleteLoading: false,
            deleteError: false,
        });
    };

    showDeleteImageModal = () => {
        this.setState({ showDeleteImageModal: true });
    };

    deleteImageRequest = () => {
        this.setState({ deleteLoading: true, deleteError: false });
    };

    render() {
        return (
            <div className="layout-wrapper">
                (
              <div className="layout-wrapper">
                <Header />
                <Sidebar page="images" />
                <div className="layout-content-container">
                  <div className="images-edit-content">
                    <div className="images-edit-header">
                      <span>Image Details</span>
                    </div>
                    <div className="images-edit-metadata-container">
                      <div className="images-edit-metadata-title">
                        <span>Metadata</span>
                      </div>
                      <div className="images-edit-metadata-items">
                        <div className="images-edit-metadata-item">
                          <div className="images-edit-metadata-item-label">
                            <span>Filename:</span>
                          </div>
                          <div className="images-edit-metadata-item-data">
                            <span>filename.png</span>
                          </div>
                        </div>
                        <div className="images-edit-metadata-item">
                          <div className="images-edit-metadata-item-label">
                            <span>File size:</span>
                          </div>
                          <div className="images-edit-metadata-item-data">
                            <span>12 mb</span>
                          </div>
                        </div>
                        <div className="images-edit-metadata-item">
                          <div className="images-edit-metadata-item-label">
                            <span>Created:</span>
                          </div>
                          <div className="images-edit-metadata-item-data">
                            <span>12/05/2050</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="images-edit-form-container">
                      <div className="images-edit-form-title">
                        <span>Edit Filename</span>
                      </div>
                      <div className="images-edit-form-section">
                        <div className="images-edit-form-section-label">
                          <span>Filename</span>
                        </div>
                        <div className="images-edit-form-section-input">
                          <input
                            type="text"
                            value={
                              this.state.filenameInputValue
                            }
                            onChange={
                              this.updateFilenameInputValue
                            }
                          />
                        </div>
                      </div>
                      <div className="images-edit-page-submit-btn-section">
                        <div className="images-edit-form-btn-container">
                          {!this.state.updateLoading ? (
                            <div
                              onClick={
                                this.submitUpdateRequest
                              }
                              className="images-edit-form-btn">
                              <span>Update</span>
                            </div>
                          ) : (
                            <div className="images-edit-form-btn loading">
                              <span>Loading</span>
                            </div>
                          )}
                        </div>
                        {this.state.updateSubmitError ? (
                          <div className="images-edit-submit-error-msg">
                            <span>An error occurred.</span>
                          </div>
                        ) : null}
                        {this.state.filenameAlreadyExistsError ? (
                          <div className="images-edit-submit-error-msg">
                            <span>
                              Filename already exists!
                            </span>
                          </div>
                        ) : null}
                        {this.state.updateSuccess ? (
                          <div className="images-edit-submit-success-msg">
                            <span>Success!</span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="images-edit-delete-container">
                      <div className="images-edit-delete-title">
                        <span>Delete Image</span>
                      </div>
                      <div className="images-edit-delete-subtitle">
                        <span>
                          This will remove the image from the
                          server. Before deleting, ensure this
                          image is not being used anywhere.
                        </span>
                      </div>
                      <div className="images-edit-delete-btn-container">
                        <div
                          onClick={this.showDeleteImageModal}
                          className="images-edit-delete-btn">
                          <span>Delete</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <DeleteImageModal
                  error={this.state.deleteError}
                  loading={this.state.deleteLoading}
                  show={this.state.showDeleteImageModal}
                  hideRequest={this.hideDeleteImageModal}
                  deleteRequest={this.deleteImageRequest}
                />
              </div>
            </div>
        );
    }
}

import { Component } from "react";
import Head from "next/head";

import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";

export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            error: false,
            errorMsg: "",
            success: false,
            currentPasswordInputValue: "",
            newPasswordInputValue: "",
            confirmNewPasswordInputValue: "",
        };
    }

    updateCurrentPasswordInputValue = (event) => {
        this.setState({ currentPasswordInputValue: event.target.value });
    };

    updateNewPasswordInputValue = (event) => {
        this.setState({ newPasswordInputValue: event.target.value });
    };

    updateConfirmNewPasswordInputValue = (event) => {
        this.setState({ confirmNewPasswordInputValue: event.target.value });
    };

    submitChangeRequest = () => {
        this.setState({
            loading: true,
            error: false,
            errorMsg: false,
            success: false,
        });
    };

    render() {
        return (
          <div className="layout-wrapper">
            <Head>
              <title>Change Password | Admin</title>
            </Head>
            <Header />
            <Sidebar page="password" />
            <div className="layout-content-container">
              <div className="settings-content">
                <div className="settings-header">
                  <span>Admin Password</span>
                </div>
                <div className="settings-form-container">
                  <div className="settings-form-title">
                    <span>Change Password</span>
                  </div>
                  <div className="settings-form-section">
                    <div className="settings-form-section-label">
                      <span>Current Password:</span>
                    </div>
                    <div className="settings-form-section-input">
                      <input
                        type="password"
                        value={this.state.currentPasswordInputValue}
                        onChange={this.updateCurrentPasswordInputValue}
                      />
                    </div>
                  </div>
                  <div className="settings-form-section">
                    <div className="settings-form-section-label">
                      <span>New Password:</span>
                    </div>
                    <div className="settings-form-section-input">
                      <input
                        type="password"
                        value={this.state.newPasswordInputValue}
                        onChange={this.updateNewPasswordInputValue}
                      />
                    </div>
                  </div>
                  <div className="settings-form-section">
                    <div className="settings-form-section-label">
                      <span>Confirm New Password:</span>
                    </div>
                    <div className="settings-form-section-input">
                      <input
                        type="password"
                        value={this.state.confirmNewPasswordInputValue}
                        onChange={this.updateConfirmNewPasswordInputValue}
                      />
                    </div>
                  </div>
                  <div className="settings-page-submit-btn-section">
                    <div className="settings-form-btn-container">
                      {
                        !this.state.loading ?
                          <div onClick={this.submitChangeRequest} className="settings-form-btn">
                            <span>Submit</span>
                          </div> :
                          <div className="settings-form-btn loading">
                            <span>Loading</span>
                          </div>
                      }
                    </div>
                    {
                      this.state.error ?
                        <div className="settings-submit-error-msg">
                          <span>{this.state.errorMsg}</span>
                        </div> : null
                    }
                    {
                      this.state.success ?
                        <div className="settings-submit-success-msg">
                          <span>Success!</span>
                        </div> : null
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }

}

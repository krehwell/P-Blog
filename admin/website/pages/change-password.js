import { Component } from "react";
import Head from "next/head";

import Header from "../components/header.js";
import Sidebar from "../components/sidebar.js";

import authUser from "../api/admin-user/auth.js";
import changePassword from "../api/admin-user/changePassword.js";

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

    static async getInitialProps({req, res}) {
        let authResult = await authUser(req);

        if(!authResult.success) {
            res.writeHead(302, {Location: "/login"});
            res.end();
        }

        return {}
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
		if (!this.state.currentPasswordInputValue) {
			this.setState({error: true, errorMsg: "Current password field is required.", success: false})
		} else if (!this.state.newPasswordInputValue) {
			this.setState({error: true, errorMsg: "New password field is required.", success: false})
		} else if (this.state.newPasswordInputValue !== this.state.confirmNewPasswordInputValue) {
			this.setState({error: true, errorMsg: "New password values do not match.", success: false})
		} else {
			this.setState({loading: true, error: false, errorMsg: false, success: false})

			const self = this

			/*
		     *  api response of change password can be:
                {
                    submitError? -> something wrong in server which cause it to fail
                    invalidPasswordCredentialError? -> old password not match with new one
                    authSuccess? -> either user is authenticate or not (this is checked in rest-api by the middleware auth function)
                    success? -> when endpoint response everythings is good
                }
			*/
			changePassword(this.state.currentPasswordInputValue, this.state.newPasswordInputValue, function(apiResponse) {
				if (apiResponse.submitError) {
					self.setState({loading: false, error: true, errorMsg: "An error occured.", success: false})
				} else if (apiResponse.invalidPasswordCredentialError) {
					self.setState({loading: false, error: true, errorMsg: "Current password credential is invalid.", success: false})
				} else if (!apiResponse.authSuccess) {
					window.location.href = "/login"
				} else {
					self.setState({loading: false, error: false, success: true})
				}
			})
		}
	}

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

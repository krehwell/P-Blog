import React, { Component } from "react";
import Head from "next/head";

import login from "../api/admin-user/login.js";
import authUser from "../api/admin-user/auth.js";
import removeAdminUserCookie from "../api/admin-user/removeAdminUserCookie.js";


export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            credentialError: false,
            emailInputValue: "",
            emailRequiredError: false,
            passwordInputValue: "",
            passwordRequiredError: false,
        };
    }

    static async getInitialProps ({req, res}) {
        const authResult = await authUser(req);

        if (authResult.success) {
            res.writeHead(302, {Location: "/"});
            res.end();
        }

        return {};
    }

    componentDidMount() {
        removeAdminUserCookie();
    }

    updateEmailInputValue = (event) => {
        this.setState({
            emailInputValue: event.target.value,
            emailRequiredError: false,
        });
    };

    updatePasswordInputValue = (event) => {
        this.setState({
            passwordInputValue: event.target.value,
            passwordRequiredError: false,
        });
    };

    submitLoginRequest = () => {

		if (!this.state.emailInputValue || !this.state.passwordInputValue) {
			if (!this.state.emailInputValue) {
				this.setState({ emailRequiredError: true })
			}

			if (!this.state.passwordInputValue) {
				this.setState({ passwordRequiredError: true })
			}
		} else {
            this.setState({loading: true});

            const self = this;

			login(
                this.state.emailInputValue,
                this.state.passwordInputValue,
                (apiResponse) => {
                    if (!apiResponse.success) {
                        self.setState({
                            loading: false,
                            credentialError: true,
                            emailRequiredError: false,
                            passwordRequiredError: false,
                        });
                    } else {
                        window.location.href = "/";
                    }
                }
            );
        }
    };

    listenForEnterKeyPress = (event) => {
        if (event.keyCode === 13 && this.state.passwordInputValue) {
            this.submitLoginRequest();
        }
    }

    render() {
        return (
          <div className="layout-wrapper">
            <Head>
              <title>Login | Admin</title>
            </Head>
            <div className="login-wrapper">
              <div className="login-content-container">
                <div className="login-form-container">

                  {this.state.credentialError ? (
                    <div className="login-form-error-block">
                      <span>
                        Email address and/or password is
                        Incorrect
                      </span>
                    </div>
                  ) : null}

                  <div className="login-form-top-header">
                    <span>Admin Page</span>
                  </div>

                  <div className="login-form-field">
                    <input
                      onChange={this.updateEmailInputValue}
                      value={this.state.emailInputValue}
                      type="email"
                      autoComplete="new-password"
                      placeholder="Email Adress"
                      className={ this.state.credentialError || this.state.emailRequiredError ? "error" : null }
                    />
                    {
                      this.state.emailRequiredError ?
                        <div className="login-form-msg">
                          <span>Email field is required.</span>
                        </div> : null
                    }
                  </div>

                  <div className="login-form-field">
                    <input
                      onChange={this.updatePasswordInputValue}
                      onKeyDown={this.listenForEnterKeyPress}
                      value={this.state.passwordInputValue}
                      type="password"
                      autoComplete="new-password"
                      placeholder="Password"
                      className={ this.state.credentialError || this.state.emailRequiredError ? "error" : null }
                    />
                    {
                      this.state.emailRequiredError ?
                        <div className="login-form-msg">
                          <span>Password field is required.</span>
                        </div> : null
                    }
                  </div>

                  <div className="login-form-submit-btn-container">
                    {
                      !this.state.loading ?
                        <div onClick={() => this.submitLoginRequest()} className="login-form-submit-btn">
                          <span>Login</span>
                        </div> :
                        <div className="login-form-submit-btn loading">
                          <span>Loading</span>
                        </div>
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>
        );
    }
}

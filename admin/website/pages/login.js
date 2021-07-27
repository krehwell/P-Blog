import { useState, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import login from "../api/admin-user/login.js";
import authUser from "../api/admin-user/auth.js";
import removeAdminUserCookie from "../api/admin-user/removeAdminUserCookie.js";

export default function Login() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [credentialError, setCredentialError] = useState(false);
    const [emailInputValue, setEmailInputValue] = useState("");
    const [passwordInputValue, setPasswordInputValue] = useState("");
    const [emailRequiredError, setEmailRequiredError] = useState(false);
    const [passwordRequiredError, setPasswordRequiredError] = useState(false);

    useEffect(() => {
        removeAdminUserCookie();
    }, []);

    const updateEmailInputValue = (e) => {
        setEmailInputValue(e.target.value);
        setEmailRequiredError(false);
    };

    const updatePasswordInputValue = (e) => {
        setPasswordInputValue(e.target.value);
        setPasswordRequiredError(false);
    };

    const submitLoginRequest = () => {
        if (!emailInputValue || !passwordInputValue) {
            if (!emailInputValue) {
                setEmailRequiredError(true);
            }

            if (!passwordInputValue) {
                setPasswordRequiredError(true);
            }
        } else {
            setLoading(true);

            login(emailInputValue, passwordInputValue, (apiResponse) => {
                if (!apiResponse.success) {
                    setLoading(false);
                    setCredentialError(true);
                    setEmailRequiredError(false);
                    setPasswordRequiredError(false);
                } else {
                    router.push("/");
                }
            });
        }
    };

    const listenForEnterKeyPress = (e) => {
        if (e.keyCode === 13 && passwordInputValue) {
            submitLoginRequest();
        }
    };

    return (
        <div className="layout-wrapper">
            <Head>
                <title>Login | Admin</title>
            </Head>
            <div className="login-wrapper">
                <div className="login-content-container">
                    <div className="login-form-container">
                        {credentialError ? (
                            <div className="login-form-error-block">
                                <span>Email address and/or password is Incorrect</span>
                            </div>
                        ) : null}

                        <div className="login-form-top-header">
                            <span>Admin Page</span>
                        </div>

                        <div className="login-form-field">
                            <input
                                onChange={updateEmailInputValue}
                                value={emailInputValue}
                                type="email"
                                autoComplete="new-password"
                                placeholder="Email Adress"
                                className={credentialError || emailRequiredError ? "error" : null}
                            />
                            {emailRequiredError ? (
                                <div className="login-form-msg">
                                    <span>Email field is required.</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="login-form-field">
                            <input
                                onChange={updatePasswordInputValue}
                                onKeyDown={listenForEnterKeyPress}
                                value={passwordInputValue}
                                type="password"
                                autoComplete="new-password"
                                placeholder="Password"
                                className={credentialError || emailRequiredError ? "error" : null}
                            />
                            {emailRequiredError ? (
                                <div className="login-form-msg">
                                    <span>Password field is required.</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="login-form-submit-btn-container">
                            {!loading ? (
                                <div onClick={() => submitLoginRequest()} className="login-form-submit-btn">
                                    <span>Login</span>
                                </div>
                            ) : (
                                <div className="login-form-submit-btn loading">
                                    <span>Loading</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function getServerSideProps({ req, res }) {
    const authResult = await authUser(req);

    if (authResult.success) {
        res.writeHead(302, { Location: "/" });
        res.end();
    }

    return { props: {} };
}

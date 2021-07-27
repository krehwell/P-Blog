import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";

const Header = dynamic(import("../components/header.js"));
const Sidebar = dynamic(import("../components/sidebar.js"));

import authUser from "../api/admin-user/auth.js";
import changePassword from "../api/admin-user/changePassword.js";

export default function ChangePassword() {
    const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [success, setSuccess] = useState(false);
    const [currentPasswordInputValue, setCurrentPasswordInputValue] = useState("");
    const [newPasswordInputValue, setNewPasswordInputValue] = useState("");
    const [confirmNewPasswordInputValue, setConfirmNewPasswordInputValue] = useState("");

    const updateCurrentPasswordInputValue = (e) => {
        setCurrentPasswordInputValue(e.target.value);
    };

    const updateNewPasswordInputValue = (e) => {
        setNewPasswordInputValue(e.target.value);
    };

    const updateConfirmNewPasswordInputValue = (e) => {
        setConfirmNewPasswordInputValue(e.target.value);
    };

    const submitChangeRequest = () => {
        if (!currentPasswordInputValue) {
            setError(true);
            setErrorMsg("Current password field is required.");
            setSuccess(false);
        } else if (!newPasswordInputValue) {
            setError(true);
            setErrorMsg("New password field is required.");
            setSuccess(false);
        } else if (newPasswordInputValue !== confirmNewPasswordInputValue) {
            setError(true);
            setErrorMsg("New password values do not match.");
            setSuccess(false);
        } else {
            setLoading(true);
            setError(false);
            setErrorMsg("");
            setSuccess(false);

            changePassword(currentPasswordInputValue, newPasswordInputValue, (apiResponse) => {
                setLoading(false);

                if (apiResponse.submitError) {
                    setError(true);
                    setErrorMsg("An error occured");
                    setSuccess(false);
                } else if (apiResponse.invalidPasswordCredentialError) {
                    setError(true);
                    setErrorMsg("Current password credential is invalid.");
                    setSuccess(false);
                } else if (!apiResponse.authSuccess) {
                    router.push("/login");
                } else {
                    setError(false);
                    setSuccess(true);
                }
            });
        }
    };

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
                                    value={currentPasswordInputValue}
                                    onChange={updateCurrentPasswordInputValue}
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
                                    value={newPasswordInputValue}
                                    onChange={updateNewPasswordInputValue}
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
                                    value={confirmNewPasswordInputValue}
                                    onChange={updateConfirmNewPasswordInputValue}
                                />
                            </div>
                        </div>
                        <div className="settings-page-submit-btn-section">
                            <div className="settings-form-btn-container">
                                {!loading ? (
                                    <div onClick={submitChangeRequest} className="settings-form-btn">
                                        <span>Submit</span>
                                    </div>
                                ) : (
                                    <div className="settings-form-btn loading">
                                        <span>Loading</span>
                                    </div>
                                )}
                            </div>
                            {error ? (
                                <div className="settings-submit-error-msg">
                                    <span>{errorMsg}</span>
                                </div>
                            ) : null}
                            {success ? (
                                <div className="settings-submit-success-msg">
                                    <span>Success!</span>
                                </div>
                            ) : null}
                        </div>
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

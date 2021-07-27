import { useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Header = dynamic(import("../components/header.js"));
const Sidebar = dynamic(import("../components/sidebar.js"));

import authUser from "../api/admin-user/auth.js";

import updateSitemap from "../api/sitemap/updateSitemap.js";
import pingSearchEngines from "../api/sitemap/pingSearchEngines.js";

import generateDownloadFile from "../utils/generateDownloadFile.js";

export default function Sitemap() {
    const router = useRouter();

    const [updateSitemapLoading, setUpdateSitemapLoading] = useState(false);
    const [updateSitemapError, setUpdateSitemapError] = useState(false);
    const [updateSitemapSuccess, setUpdateSitemapSuccess] = useState(false);

    const [pingLoading, setPingLoading] = useState(false);
    const [pingError, setPingError] = useState(false);
    const [pingSuccess, setPingSuccess] = useState(false);

    const updateSitemapRequest = () => {
        setUpdateSitemapLoading(true);
        setUpdateSitemapError(false);
        setUpdateSitemapSuccess(false);

        updateSitemap((apiResponse) => {
            setUpdateSitemapLoading(false);

            if (apiResponse.submitError) {
                setUpdateSitemapError(true);
                setUpdateSitemapSuccess(false);
            } else if (!apiResponse.authSuccess) {
                router.push("/login");
            } else if (!apiResponse.success) {
                setUpdateSitemapError(true);
                setUpdateSitemapSuccess(false);
            } else {
                setUpdateSitemapError(false);
                setUpdateSitemapSuccess(true);

                // open xml in new window and save
                let blob = new Blob([apiResponse.xml], { type: "text/xml" });
                let url = URL.createObjectURL(blob);
                window.open(url);
                URL.revokeObjectURL(url);
                generateDownloadFile("sitemap.xml", apiResponse.xml);
            }
        });
    };

    const pingSearchEnginesRequest = () => {
        setPingLoading(true);

        pingSearchEngines((apiResponse) => {
            setPingLoading(false);
            if (apiResponse.submitError) {
                setPingError(true);
                setPingSuccess(false);
            } else if (!apiResponse.authSuccess) {
                router.push("/login");
            } else if (!apiResponse.success) {
                setPingError(true);
                setPingSuccess(false);
            } else {
                setPingError(false);
                setPingSuccess(true);
            }
        });
    };

    return (
        <div className="layout-wrapper">
            <Head>
                <title>Sitemap | Admin</title>
            </Head>
            <Header />
            <Sidebar page="sitemap" />
            <div className="layout-content-container">
                <div className="sitemap-content">
                    <div className="sitemap-header">
                        <span>Manage Sitemap</span>
                    </div>
                    <div className="sitemap-form-container">
                        <div className="sitemap-form-section">
                            <div className="sitemap-form-title">
                                <span>Update Sitemap XML File</span>
                            </div>
                            <div className="sitemap-form-description">
                                <span>
                                    This will write new content to the sitemap.xml file hosted by the fronted website.
                                </span>
                            </div>
                            <div className="sitemap-form-btn-container">
                                {!updateSitemapLoading ? (
                                    <div onClick={updateSitemapRequest} className="sitemap-form-btn">
                                        <span>Update Sitemap</span>
                                    </div>
                                ) : (
                                    <div className="sitemap-form-btn loading">
                                        <span>Loading</span>
                                    </div>
                                )}
                            </div>
                            {updateSitemapSuccess ? (
                                <div className="sitemap-success-msg">
                                    <span>Success!</span>
                                </div>
                            ) : null}
                            {updateSitemapError ? (
                                <div className="sitemap-error-msg">
                                    <span>An error occurred.</span>
                                </div>
                            ) : null}
                        </div>

                        <div className="sitemap-form-section">
                            <div className="sitemap-form-title">
                                <span>Ping Search Engines</span>
                            </div>
                            <div className="sitemap-form-description">
                                <span>
                                    This will ping Google and Bing to let them know updates to the sitemap have been
                                    made.
                                </span>
                            </div>
                            <div className="sitemap-form-btn-container">
                                {!pingLoading ? (
                                    <div onClick={pingSearchEnginesRequest} className="sitemap-form-btn">
                                        <span>Send Ping</span>
                                    </div>
                                ) : (
                                    <div className="sitemap-form-btn loading">
                                        <span>Loading</span>
                                    </div>
                                )}
                            </div>
                            {pingSuccess ? (
                                <div className="sitemap-success-msg">
                                    <span>Success!</span>
                                </div>
                            ) : null}
                            {pingError ? (
                                <div className="sitemap-error-msg">
                                    <span>An error occurred.</span>
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

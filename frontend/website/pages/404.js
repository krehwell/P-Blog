import { Component } from "react";

import Header from "../components/header.js";
import Footer from "../components/footer.js";
import HeadMetadata from "../components/headMetadata.js";

export default function four0four() {
    return (
        <div className="layout-wrapper">
            <HeadMetadata title="Error | krehwell" />
            <Header />
            <div className="error-container">
                <h1>404 Page Not Found</h1>
                <p>❌ You go to a page which no one has ever made</p>
                <p>
                    <a href="/">Home</a>
                </p>
            </div>
            <Footer />
        </div>
    );
}

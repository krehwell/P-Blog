import { Component } from "react";

import Header from "../components/header.js";
import Footer from "../components/footer.js";
import HeadMetadata from "../components/headMetadata.js";

export default class extends Component {
  render() {
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="Error | krehwell"
        />
        <Header />
        <div className="error-container">
          <h1>404 Page Not Found</h1>
          <p>
            ❌ You go to a page which no one has ever made
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}

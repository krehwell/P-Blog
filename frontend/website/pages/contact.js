import {Component} from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import HeadMetadata from "../components/headMetadata.js";

export default class extends Component {

    render() {
        return (
           <div className="layout-wrapper">
            <HeadMetadata
              title="Contact | krehwell"
              metaDescription="if you have anything to says about me, don't say it"
             />
            <Header />
            <div className="contact-container">
              <div className="contact-section">
                <h1>Contact</h1>
                <p>I love meme, vim, vim meme, and of course... nobody expects spanish inquisition</p>
                <p>if you love me, thats mean you'r gay</p>
              </div>
              <div className="contact-section">
                <h2>Around the Web</h2>
                <ul>
                  <li><strong>Email</strong>: fahrimuham001@gmail.com</li>
                  <li><strong>GitHub</strong>: <a href="https://github.com/krehwell">krehwell</a></li>
                  <li><strong>Reddit</strong>: <a href="https://www.reddit.com/user/krehwell">krehwell</a></li>
                </ul>
              </div>
            </div>
            <Footer />
          </div>
        )
    }

}



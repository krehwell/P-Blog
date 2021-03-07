import {Component} from "react";
import Link from "next/link";

export default class extends Component {

  render() {
    return (
      <div className="sidebar-wrapper">
        <div className="sidebar-list">
          <ul>

            <a className={this.props.page === "blogpost" ? "active" : null } href="/">
              <li>
                <span>Blog Post</span>
              </li>
            </a>

            {/*
              * THIS IS COMMENTED SINCE:
                - Deploy on ready to go hosting (not cloud) so there is no where to store image

            <a className={this.props.page === "images" ? "active" : null } href="/images">
              <li>
                <span>Images</span>
              </li>
            </a>
            */}

            {/*
              * THIS IS COMMENTED SINCE:
                - Website is very simple with only couple pages to be crawled so no need sitemap

            <a className={this.props.page === "sitemap" ? "active" : null } href="/sitemap">
              <li>
                <span>sitemap</span>
              </li>
            </a>
            */}

            <Link href="/change-password">
                <a className={this.props.page === "password" ? "active" : null } >
                  <li>
                    <span>Change Password</span>
                  </li>
                </a>
            </Link>

          </ul>
        </div>
      </div>
    )
  }

}

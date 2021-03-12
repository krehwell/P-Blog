import {Component} from "react";
import Link from "next/link";

export default class extends Component {
    render() {
      return (
        <header className="header-wrapper">
          <div className="header-container">
            <div className="header-logo">
              <Link href="/">
                <a>
                  <span className="header-logo-icon">t(·̿Ĺ̯·̿ ̿)</span>
                  <span className="header-logo-text">krehwell</span>
                </a>
              </Link>
            </div>
            <div className="header-links">
              <Link href="/blog"><a>Blog</a></Link>
              <Link href="/about"><a>About</a></Link>
              <Link href="/contact"><a>Contact</a></Link>
            </div>
          </div>
        </header>
    )}
}

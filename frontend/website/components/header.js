import {Component} from "react";
import Link from "next/link";
import { Router } from 'next/router';

export default class extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loadingState: ""
        }
    }

    loading = () => {
        this.interval = setInterval(() => {
            this.setState({ loadingState: this.state.loadingState === "..."
                ? ""
                : this.state.loadingState + "." });
        }, 300);
    }

    unloading = () => {
        clearInterval(this.invterval);
    }

    render() {
          Router.events.on('routeChangeStart', this.loading);
          Router.events.on('routeChangeComplete', this.unloading);

          return ( <header className="header-wrapper">
              <div className="header-container">
                <div className="header-logo">
                  <Link href="/">
                    <a>
                      <span className="header-logo-icon">t(·̿Ĺ̯·̿ ̿)</span>
                      <span className="header-logo-text">krehwell{this.state.loadingState}</span>
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

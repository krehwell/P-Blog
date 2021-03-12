import {Component} from "react";
import Link from "next/link";

export default class extends Component {
    render(){
      return (
        <footer className="footer-wrapper">
          <div className="footer-links">
            <Link href="/blog"><a>Blog</a></Link>
            <Link href="/about"><a>About</a></Link>
            <Link href="/contact"><a>Contact</a></Link>
          </div>
          <div className="footer-bottom-msg">
            <p>📜 handcrafted by me and internet, use it freely as your freedom. no need to be wise. fork on <a href="https://github.com/krehwell/P-Blog">GitHub</a>.</p>
          </div>
        </footer>
      )
    }
}

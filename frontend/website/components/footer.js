import {Component} from "react";

export default class extends Component {
  render(){
    return (
      <footer className="footer-wrapper">
        <div className="footer-links">
          <a href="/blog">Blog</a>
          <a href="/About">About</a>
          <a href="/Contact">Contact</a>
        </div>
        <div className="footer-bottom-msg">
          <p>handcrafted by me and internet, use it freely as your freedom. no need to be wise.</p>
        </div>
      </footer>
    )
  }
}

import {Component} from "react";

import Header from "../components/header";
import Footer from "../components/footer";
import HeadMetadata from "../components/headMetadata.js";

export default class extends Component {

  render(){
    return (
      <div className="layout-wrapper">
        <HeadMetadata
          title="About Me | krehwell"
          metaDescription="krehwell is the author of this blog"
        />
        <Header />
        <div className="about-container">
          <div className="about-section">
            <h1>About Me</h1>
            <p>I use arch btw.</p>
            <p>I learn through all software stuff since semester 3 and I rigret every thing that I started it late. I was just realize how interesting this could be. Web, Linux, Os, Forum, Data Structure, Oop, Vim, algorithm (leet code, advent of code), etc.</p>
            <p>But hey nothing is too late, Now I learned stuff/things everyday and I hate css.</p>
          </div>
          <div className="about-section">
            <h2>Personal Tools</h2>
            <ul>
              <li><strong>Machine</strong>: <a href="https://ubuntu.com/wsl">WSL | Ubuntu</a></li>
              <li><strong>Editor</strong>: <a href="https://vim.org">Vim</a></li>
              <li><strong>Dildo</strong>: No, I don't use any</li>
              <li><strong>Dotfiles</strong>: <a href="https://github.com/krehwell/dotfiles">My Setup</a></li>
            </ul>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

}

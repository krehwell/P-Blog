import Header from "../components/header";
import Footer from "../components/footer";
import HeadMetadata from "../components/headMetadata.js";
import Timeline from "../components/Timeline.js";

export default function about() {
    return (
        <div className="layout-wrapper">
            <HeadMetadata title="About Me | krehwell" metaDescription="krehwell is the author of this blog" />
            <Header />
            <div className="about-container">
                <div className="about-section">
                    <h1>About Me</h1>
                    <p>I use arch btw. I don't even know 100% about what I'm doing with it but I use it anyway.</p>
                    <p>
                        I feel so exhausted trying to finish this junk blog as a fullstack + cms project of mine and
                        there are always last minute changes which are not last minute.
                    </p>
                    <p>
                        Sometimes hang around with frontend, sometimes backend, sometimes design. Everything's is so
                        tiring that leads to beat a meat in the end.
                    </p>
                </div>
                <div className="about-section">
                    <h2>🛠️ Personal Tools</h2>
                    <ul>
                        <li>
                            <strong>Main Machine</strong>: <a href="https://archlinux.org/">Arch Linux</a> +{" "}
                            <a href="https://i3wm.org/">i3</a>{" "}
                        </li>
                        <li>
                            <strong>Editor</strong>: <a href="https://www.vim.org/">Vim</a> +{" "}
                            <a href="https://github.com/tmux/tmux/wiki">tmux</a> 🔥
                        </li>
                        <li>
                            <strong>Dildo</strong>: No, I don't use any
                        </li>
                        <li>
                            <strong>Dongfiles</strong>: <a href="https://github.com/krehwell/dotfiles">My Setup</a>
                        </li>
                    </ul>
                </div>
                <div className="about-section">
                    <Timeline />
                </div>
            </div>
            <Footer />
        </div>
    );
}

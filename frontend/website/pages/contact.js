import Header from "../components/header";
import Footer from "../components/footer";
import HeadMetadata from "../components/headMetadata.js";

export default function contact() {
    return (
        <div className="layout-wrapper">
            <HeadMetadata
                title="Contact | krehwell"
                metaDescription="if you have anything to says about me, don't say it"
            />
            <Header />
            <div className="contact-container">
                <div className="contact-section">
                    <h1>Brief Myself</h1>
                    <p>
                        I love meme, vim, vim meme, and of course... nobody
                        expects spanish inquisition.
                    </p>
                    <p>
                        <i>
                            "It's good to be king. Wait, maybe. I think maybe
                            I'm just like a little bizarre little person who
                            walks back and forth, ..."
                        </i>{" "}
                        ~ Terry A. Davis
                    </p>
                </div>
                <div className="contact-section">
                    <h2>📝 Contact</h2>
                    <ul>
                        <li>
                            <strong>Email</strong>: fahrimuham001@gmail.com
                        </li>
                        <li>
                            <strong>GitHub</strong>:{" "}
                            <a href="https://github.com/krehwell">krehwell</a>
                        </li>
                        <li>
                            <strong>Reddit</strong>:{" "}
                            <a href="https://www.reddit.com/user/krehwell">
                                krehwell
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <Footer />
        </div>
    );
}

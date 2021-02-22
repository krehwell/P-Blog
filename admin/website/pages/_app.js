// layout
import "../styles/layout.css";
import "../styles/components/header.css";
import "../styles/components/sidebar.css";

// pages
import "../styles/login.css";
import "../styles/blog/index.css";
import "../styles/blog/create-new-post.css";
import "../styles/blog/edit.css"
import "../styles/images/index.css";

// codemirror
import "codemirror/lib/codemirror.css"
import "codemirror/theme/dracula.css"

export default function MyApp({Component, pageProps}) {
    return <Component {...pageProps}/>
}

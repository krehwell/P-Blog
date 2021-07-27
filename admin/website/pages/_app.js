// layout
import "../styles/layout.css";
import "../styles/components/header.css";
import "../styles/components/sidebar.css";

// pages
import "../styles/login.css";
import "../styles/blog/index.css";
import "../styles/blog/create-new-post.css";
import "../styles/blog/edit.css";
import "../styles/sitemap.css";
import "../styles/change-password.css";
import "../styles/_error.css";

// modals
import "../styles/components/modals/delete-blog-post.css";
import "../styles/components/modals/delete-image.css";

export default function MyApp({ Component, pageProps }) {
    return <Component {...pageProps} />;
}

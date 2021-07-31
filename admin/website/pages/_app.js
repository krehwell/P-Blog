import { useRouter } from "next/router";

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

// modals
import "../styles/components/modals/delete-blog-post.css";
import "../styles/components/modals/delete-image.css";

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    // SUPER IMPORTANT: to put `key={router.asPath}` to allow re-render on same path different query
    return <Component {...pageProps} key={router.asPath} />;
}

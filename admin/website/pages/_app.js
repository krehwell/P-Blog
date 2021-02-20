// layout
import "../styles/layout.css";
import "../styles/components/header.css";
import "../styles/components/sidebar.css";

// pages
import "../styles/login.css";

export default function MyApp({Component, pageProps}) {
    return <Component {...pageProps}/>
}

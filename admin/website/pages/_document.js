import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link
                        rel="preload"
                        href="/fonts/inter-var-latin.woff2"
                        as="font"
                        type="font/woff2"
                        crossOrigin="anonymous"
                    />
                    <meta name="application-name" content="PWA App" />
                    <meta name="apple-mobile-web-app-capable" content="yes" />
                    <meta name="apple-mobile-web-app-status-bar-style" content="default" />
                    <meta name="apple-mobile-web-app-title" content="Krehwell CMS" />
                    <meta name="description" content="Krehwell Admin App" />
                    <meta name="format-detection" content="telephone=no" />
                    <meta name="mobile-web-app-capable" content="yes" />
                    <meta name="msapplication-config" content="/static/icons/browserconfig.xml" />
                    <meta name="msapplication-TileColor" content="#2B5797" />
                    <meta name="msapplication-tap-highlight" content="no" />
                    <meta name="theme-color" content="#000000" />

                    <link rel="apple-touch-icon" href="/static/icons/apple-touch-icon.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/static/icons/touch-icon-ipad.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/icons/touch-icon-iphone-retina.png" />
                    <link rel="apple-touch-icon" sizes="167x167" href="/static/icons/touch-icon-ipad-retina.png" />

                    <link rel="icon" type="image/png" sizes="32x32" href="/static/icons/favicon-32x32.png" />
                    <link rel="icon" type="image/png" sizes="16x16" href="/static/icons/favicon-16x16.png" />
                    <link rel="manifest" href="/static/manifest.json" />
                    <link rel="mask-icon" href="/static/icons/safari-pinned-tab.svg" color="#5bbad5" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" />

                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:url" content="https://admin.krehwell.com" />
                    <meta name="twitter:title" content="Krehwell CMS" />
                    <meta name="twitter:description" content="Krehwell Admin App" />
                    <meta
                        name="twitter:image"
                        content="https://admin.krehwell.com/static/icons/android-chrome-192x192.png"
                    />
                    <meta name="twitter:creator" content="@DavidWShadow" />
                    <meta property="og:type" content="website" />
                    <meta property="og:title" content="Krehwell CMS" />
                    <meta property="og:description" content="Krehwell Admin App" />
                    <meta property="og:site_name" content="Krehwell PWA App" />
                    <meta property="og:url" content="https://admin.krehwell.com" />
                    <meta property="og:image" content="https://admin.krehwell.com/static/icons/apple-touch-icon.png" />
                </Head>
                <body className="bg-white dark:bg-black text-white dark:text-black">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;

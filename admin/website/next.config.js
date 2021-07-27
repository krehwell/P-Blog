const withPWA = require("next-pwa");

module.exports = withPWA({
    future: {
        webpack5: true,
        strictPostcssConfiguration: true,
    },
    reactStrictMode: true,
    experimental: {
        turboMode: true,
        eslint: true,
    },

    env: {
        DEV_ADMIN_API_URL: "http://localhost:5001",
        PRODUCTION_ADMIN_API_URL: "https://admin-rest-api.krehwell.com",
    },

    pwa: {
        disable: process.env.NODE_ENV === "development",
        dest: "public",
    },

    webpack: (config, { dev, isServer }) => {
        // Replace React with Preact only in client production build
        // https://github.com/leerob/leerob.io/blob/main/next.config.js
        if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: "preact/compat",
                "react-dom": "preact/compat",
            });
        }

        return config;
    },
});

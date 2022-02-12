const webpack = require("webpack");
const withPWA = require("next-pwa");

module.exports = withPWA({
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
        //github.com/leerob/leerob.io/blob/main/next.config.js
        https: if (!dev && !isServer) {
            Object.assign(config.resolve.alias, {
                react: "preact/compat",
                "react-dom": "preact/compat",
            });
        }

        config.plugins.push(
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
            })
        );
        if (
            config.optimization.splitChunks.cacheGroups &&
            config.optimization.splitChunks.cacheGroups.shared !== undefined
        ) {
            config.optimization.splitChunks.cacheGroups.shared.enforce = true;
        }

        return config;
    },
});

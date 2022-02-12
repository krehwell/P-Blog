const webpack = require("webpack");
const withPWA = require("next-pwa");

module.exports = withPWA({
    images: {
        domains: ["i.imgur.com"],
    },

    env: {
        DEV_API_URL: "http://localhost:5000",
        PRODUCTION_API_URL: "https://krehwell-rest-api.vercel.app",
    },

    pwa: {
        disable: process.env.NODE_ENV === "development",
        dest: "public",
    },

    webpack: (config) => {
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

    swcMinify: true,
});

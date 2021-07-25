module.exports = {
    env: {
        DEV_ADMIN_API_URL: "http://localhost:5001",
        PRODUCTION_ADMIN_API_URL: "https://admin-rest-api.krehwell.com",
    },

    pwa: {
        disable: process.env.NODE_ENV === "development",
        dest: "public",
    },

    webpack: (config) => {
        /* https://github.com/leerob/leerob.io/blob/main/next.config.js */

        // Object.assign(config.resolve.alias, {
        //   react: 'preact/compat',
        //   'react-dom/test-utils': 'preact/test-utils',
        //   'react-dom': 'preact/compat'
        // });

        return config;
    },
};

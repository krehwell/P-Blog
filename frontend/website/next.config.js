module.exports = {
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
};

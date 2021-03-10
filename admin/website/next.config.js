module.exports = {
    env: {
        "DEV_ADMIN_API_URL": "http://localhost:5001",
        "PRODUCTION_ADMIN_API_URL": "https://admin-krehwell-rest-api.vercel.app",
    },
    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "*" },
                    { key: "Access-Control-Allow-Methods", value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ]
            }
        ]
    }
}

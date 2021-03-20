const withPWA = require('next-pwa');

module.exports = withPWA({
  env: {
    "DEV_API_URL": "http://localhost:5000",
    "PRODUCTION_API_URL": "https://krehwell-rest-api.vercel.app"
  },

  pwa: {
    dest: 'public'
  },
});

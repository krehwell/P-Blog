const withPWA = require('next-pwa');

module.exports = withPWA({
  env: {
    "DEV_API_URL": "http://localhost:5000",
    "PRODUCTION_API_URL": "https://krehwell-rest-api.vercel.app"
  },

  pwa: {
    disable: process.env.NODE_ENV === 'development',
    dest: 'public'
  },

  /*
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact only in client production build
    // https://github.com/leerob/leerob.io/blob/main/next.config.js
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        react: 'preact/compat',
        'react-dom': 'preact/compat'
      });
    }

    return config;
  },
  */

});

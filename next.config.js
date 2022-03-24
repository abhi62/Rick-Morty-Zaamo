const withPWA = require("next-pwa");
module.exports = withPWA({
  reactStrictMode: true,
  images: {
    domains: ["rickandmortyapi.com"],
  },
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});

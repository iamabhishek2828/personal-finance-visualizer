module.exports = {
  reactStrictMode: true,
  env: {
    MONGODB_URI: process.env.MONGODB_URI,
  },
  images: {
    domains: ['example.com'], // Add any domains you want to allow for image optimization
  },
};
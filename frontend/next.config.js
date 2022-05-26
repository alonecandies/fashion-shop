module.exports = {
  reactStrictMode: true,
  distDir: "_next",
  images: {
    domains: [
      'lasy.s3.ap-southeast-1.amazonaws.com',
      'placehold.it',
      'product.hstatic.net',
      'ui-avatars.com',
      'file.hstatic.net'
    ]
  },
  env: {
    NEXT_PUBLIC_API_ENDPOINT: process.env.NEXT_PUBLIC_API_ENDPOINT || 'http://localhost:3000/v1',
  }
};

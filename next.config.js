// https://stackoverflow.com/questions/55175445/cant-import-svg-into-next-js

module.exports = {
  webpack5: false,
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
       // for webpack 5 use
       // { and: [/\.(js|ts)x?$/] }
      },
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
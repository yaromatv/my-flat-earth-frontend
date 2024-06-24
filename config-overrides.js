const { override, addWebpackAlias } = require('customize-cra');
const dotenv = require('dotenv');
const webpack = require('webpack');

dotenv.config();

module.exports = override(
  addWebpackAlias({
    '@vis.gl/react-google-maps/examples.js':
      'https://visgl.github.io/react-google-maps/scripts/examples.js',
  }),

  config => {
    return {
      ...config,
      plugins: [
        ...config.plugins,
        new webpack.DefinePlugin({
          'process.env.GOOGLE_MAPS_API_KEY': JSON.stringify(
            process.env.GOOGLE_MAPS_API_KEY
          ),
        }),
      ],
    };
  }
);

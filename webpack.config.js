import path from 'path';
import webpack from 'webpack';
import dotenv from 'dotenv';

// Загрузка переменных окружения из файла .env
dotenv.config();

const webpackConfig = (env, argv) => {
  const mode = argv.mode || 'development';

  return {
    mode,
    entry: './src/index.js',
    output: {
      path: path.resolve(process.cwd(), 'dist'),
      filename: 'bundle.js',
      publicPath: '/my-flat-earth/', // Аналог base в Vite
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    resolve: {
      alias: {
        '@vis.gl/react-google-maps/examples.js':
          'https://visgl.github.io/react-google-maps/scripts/examples.js',
      },
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': JSON.stringify({
          GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
        }),
      }),
    ],
    devServer: {
      static: {
        directory: path.join(process.cwd(), 'dist'),
      },
      compress: true,
      port: 9000,
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }

        devServer.app.get('/api/data', function (req, res) {
          res.json({ data: 'Hello World' });
        });

        return middlewares;
      },
      mimeTypes: {
        'application/javascript': ['js', 'mjs'],
      },
    },
  };
};

export default webpackConfig;

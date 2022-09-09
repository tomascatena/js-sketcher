import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import webpack, { Configuration } from 'webpack';

export type WebpackEnvs = {
  WEBPACK_BUNDLE: boolean;
  WEBPACK_BUILD: boolean;
  WEBPACK_ANALYZE: boolean;
}

const commonConfig = (env: WebpackEnvs): Configuration => {
  console.log(`Webpack env: ${JSON.stringify(env, null, 2)}\n`);

  const plugins = [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ];

  if (env.WEBPACK_ANALYZE) {
    plugins.push(new BundleAnalyzerPlugin({}));
  }

  const rules = [
    {
      oneOf: [
        {
          test: [/\.avif$/],
          type: 'asset',
          mimetype: 'image/avif',
          parser: {
            dataUrlCondition: {
              maxSize: '10000',
            },
          },
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: '10000',
            },
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: require.resolve('@svgr/webpack'),
              options: {
                prettier: false,
                svgo: false,
                svgoConfig: {
                  plugins: [{ removeViewBox: false }],
                },
                titleProp: true,
                ref: true,
              },
            },
            {
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash].[ext]',
              },
            },
          ],
          issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
          },
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: '3.22',
                    targets: {
                      browsers: [
                        '> 0.25%',
                        'last 2 versions',
                        'not dead',
                      ],
                    },
                  }
                ],
                '@babel/preset-react',
                '@babel/preset-typescript',
              ],
              plugins: ['@babel/plugin-transform-runtime'],
              cacheDirectory: true,
              cacheCompression: false,
              compact: process.env.NODE_ENV === 'production',
            },
          },
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
          exclude: /node_modules/,
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            { loader: 'style-loader' },
            { loader: 'css-loader', options: { modules: true } },
            { loader: 'sass-loader' },
          ],
          exclude: /node_modules/,
        },
        {
          test: /\.(ttf|woff|woff2)$/,
          loader: 'url-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.html$/,
          use: 'html-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.txt$/,
          use: 'raw-loader',
          exclude: /node_modules/,
        },
        {
          exclude: [/^$/, /\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          type: 'asset/resource',
        },
        // ** STOP ** Are you adding a new loader?
        // Make sure to add the new loader(s) before the "file" loader.
      ]
    }
  ].filter(Boolean);

  return {
    entry: './src/index.tsx',
    target: 'web',
    module: { rules },
    plugins,
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      plugins: [
        new TsconfigPathsPlugin({}),
      ],
    },
    optimization: {
      splitChunks: {
        chunks: 'all',
      }
    },
  };
};

export default (env: WebpackEnvs) => commonConfig(env);

import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import TerserPlugin from 'terser-webpack-plugin';
import commonConfig, { WebpackEnvs } from './webpack.common';
import path from 'path';

const prodConfig: Configuration = {
  mode: 'production',
  devtool: false,
  output: {
    assetModuleFilename: 'assets/[contenthash][ext]',
    chunkFilename: '[id].[contenthash].js',
    clean: true,
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    sourceMapFilename: '[name].[contenthash].map',
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 5,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
    ]
  },
  performance: {
    hints: 'warning',
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
};

export default (env :WebpackEnvs) => merge(commonConfig(env), prodConfig);

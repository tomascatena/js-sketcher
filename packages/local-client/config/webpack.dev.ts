import 'webpack-dev-server';
import { Configuration } from 'webpack';
import { merge } from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import commonConfig, { WebpackEnvs } from './webpack.common';
import path from 'path';

const devConfig: Configuration = {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    port: 3000,
    hot: true,
    open: false,
    historyApiFallback: {
      disableDotRule: true,
    }
  },
  output: {
    assetModuleFilename: 'assets/[contenthash][ext]',
    chunkFilename: '[id].[contenthash].js',
    clean: true,
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    sourceMapFilename: '[name].[contenthash].map',
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
  ],
};

export default (env: WebpackEnvs) => merge(commonConfig(env), devConfig);

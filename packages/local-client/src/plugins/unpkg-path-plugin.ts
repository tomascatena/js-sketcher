import * as esbuild from 'esbuild-wasm';
import axios from 'axios';

export const unpkgPathPlugin = () => {
  return {
    name: 'unpkg-path-plugin',
    setup(build: esbuild.PluginBuild) {
      /**
       * Path resolution algorithm.
       */
      build.onResolve({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            path: args.path,
            namespace: 'a',
          };
        }

        if (args.path.includes('./') || args.path.includes('../')) {
          return {
            path: new URL(args.path, `https://unpkg.com${args.resolveDir}/`).href,
            namespace: 'b',
          };
        }

        return {
          namespace: 'a',
          path: `https://unpkg.com/${args.path}`,
        };
      });

      build.onLoad({ filter: /.*/ }, async (args: any) => {
        if (args.path === 'index.js') {
          return {
            loader: 'jsx',
            contents: `
              const React = require('react');
              const ReactDOM = require('react-dom');

              console.log(React, ReactDOM);
            `,
          };
        }

        const { data, request } = await axios.get(args.path);

        return {
          loader: 'jsx',
          contents: data,
          resolveDir: new URL('./', request.responseURL).pathname,
        };
      });
    },
  };
};

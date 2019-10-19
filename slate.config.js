/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const plugins = [
  new CopyWebpackPlugin([
    {
      from: 'snippets/**/*',
      to: '../snippets/',
      flatten: true,
      ignore: [ 'icons/*.liquid' ],
    },
  ]),
];

module.exports = {
  'cssVarLoader.liquidPath': ['src/snippets/css-variables.liquid'],
  'webpack.postcss.plugins': (config) => {
    const plugins = [autoprefixer];
    // We only want to minify our CSS if we're building for production
    if (process.env.NODE_ENV === 'production') {
      plugins.push(cssnano(config.get('webpack.cssnano.settings')))
    }
    return plugins;
  },
  'paths.theme.src.snippets': 'snippets/icons',
  'webpack.extend': {
    plugins,
    resolve: {
      alias: {
        jquery: path.resolve('./node_modules/jquery'),
        'lodash-es': path.resolve('./node_modules/lodash-es'),
         'cypress': path.resolve('./cypress'),
         'layout': path.resolve('./src/layout'),
         'styles': path.resolve('./src/styles'),
         'scripts': path.resolve('./src/scripts'),
         'sections': path.resolve('./src/sections'),
         'snippets': path.resolve('./src/snippets'),
         'templates': path.resolve('./src/templates'),
      },
    },
  },
};

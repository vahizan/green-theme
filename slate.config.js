/* eslint-disable */

// Configuration file for all things Slate.
// For more information, visit https://github.com/Shopify/slate/wiki/Slate-Configuration

const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const path = require('path');

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
  'webpack.extend': {
    resolve: {
      alias: {
        jquery: path.resolve('./node_modules/jquery'),
        'lodash-es': path.resolve('./node_modules/lodash-es'),
         Layout: path.resolve('./src/layout'),
         Styles: path.resolve('./src/styles'),
         Scripts: path.resolve('./src/scripts'),
         Sections: path.resolve('./src/sections'),
         Snippets: path.resolve('./src/snippets'),
         Templates: path.resolve('./src/templates'),
      },
    },
  },
};

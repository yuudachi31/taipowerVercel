// craco.config.js
const CracoLessPlugin = require('craco-less');

module.exports = {
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#7ACA00',
              '@font-family': ['Noto Sans TC', 'sans-serif'],
              '@layout-body-background': '#ffffff',
              '@layout-header-background': '#ffffff'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
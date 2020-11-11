module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? ''
    : '/',
  // prepare gh-pages
  // publicPath:'/CreeperLand/',
  // publicPath:'/CreeperLand/dist',
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};

module.exports = {
  // publicPath: process.env.NODE_ENV === 'production'
  //   ? '/CreeperLand/'
  //   : '/',
  // prepare gh-pages
  publicPath:'/CreeperLand/',
  pluginOptions: {
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  }
};

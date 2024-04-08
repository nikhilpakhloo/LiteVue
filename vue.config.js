const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: [
    'vuetify'
  ],

  lintOnSave: false,
  publicPath: "./",
  outputDir: "./dist",
  configureWebpack: {
    devServer: {
      historyApiFallback: true
    },
    module: {
      rules: [{
        test: /\.pdf$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[path][name].[ext]",
            esModule: false
          }
        }
      }]
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'ko',
      fallbackLocale: 'ko',
      localeDir: 'locales',
      enableInSFC: false,
      enableBridge: false
    }
  },
})
// module.exports = {
//   transpileDependencies: [
//       'vuetify'
//   ],
//   publicPath: "",
// }
// publicPath: process.env.NODE_ENV === "production" ? "/" : "",

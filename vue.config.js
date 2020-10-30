module.exports = {
    devServer: {
      proxy: {
        '/api': {
          target: 'http://laravel.e-office.tw/',
          ws: true,
          changeOrigin: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
    }
  }
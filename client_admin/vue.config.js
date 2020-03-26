module.exports = {
  publicPath: '/admin',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
    }
  }
};
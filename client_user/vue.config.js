module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.199.214:3000',
        changeOrigin: true,
      },
    }
  }
};

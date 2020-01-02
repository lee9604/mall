const path = require('path')

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  devServer: {
    port: 8081
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('@', resolve('src'))
  }
}

const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  configureWebpack: config => {
    if(process.env.NODE_ENV === 'development') {
      config.devtool = "source-map";
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
  },
}
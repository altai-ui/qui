const path = require('path')

module.exports = async ({ config, mode }) => {
  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          prependData: `
            @import "./src/components/common/var.scss";
          `
        }
      }
    ],
    include: path.resolve(__dirname, '../')
  })
  return config
}

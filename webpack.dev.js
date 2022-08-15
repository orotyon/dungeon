const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
module.exports = merge(common, {
    entry: ['webpack-dev-server/client?'],
    mode: 'development',
    devtool: 'eval',
})
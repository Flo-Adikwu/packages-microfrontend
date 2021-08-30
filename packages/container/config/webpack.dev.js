const { merge } = require('webpack-merge');
const htmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')
const CommonConfig = require('./webpack.common');
const packageJson = require('../package.json');

const devConfig = {
    mode: 'development',
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: 'index.html'
        }
    },
    plugins: [
        new ModuleFederationPlugin({
            name: 'container',
            remotes: {
                marketing: 'marketing@http://localhost:3001/remoteEntry.js'
            },
            // shared: ['react', 'react-dom']
            shared: packageJson.dependencies

        }),
        new htmlWebpackPlugin({
            template: './public/index.html'
        })
    ]
}

module.exports = merge(CommonConfig, devConfig);
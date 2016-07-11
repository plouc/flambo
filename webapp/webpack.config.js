const webpack           = require('webpack')
const path              = require('path')
const autoprefixer      = require('autoprefixer')
const postcssImport     = require('postcss-import')
const postcssVars       = require('postcss-css-variables')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const BUILD_DIR = path.resolve(__dirname, 'public')
const APP_DIR   = path.resolve(__dirname, 'src')

const config = {
    devtool: 'eval',
    entry: [
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/only-dev-server',
        `${APP_DIR}/app`,
    ],
    output: {
        path:     BUILD_DIR,
        filename: '[name]-[hash:8].js',
    },
    modulesDirectories: ['node_modules'],
    resolve: {
        modulesDirectories: ['node_modules'],
    },
    module : {
        loaders: [
            {
                test:    /\.js$/,
                loaders: ['react-hot', 'babel?cacheDirectory'],
                exclude: /node_modules/,
                include: APP_DIR,
            },
            {
                test:   /\.css$/,
                loader: process.env.NODE_ENV == 'production' ?
                    ExtractTextPlugin.extract('style-loader!css-loader!postcss-loader') :
                    'style-loader!css-loader!postcss-loader',
            },
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title:    'flambo',
        }),
        new ExtractTextPlugin('[name]-[id]-[contenthash:8].css', {
            allChunks: true,
        }),
    ],
    postcss: webpack => [
        autoprefixer,
        postcssImport({
            addDependencyTo: webpack
        }),
        postcssVars(),
    ],
}


module.exports = config

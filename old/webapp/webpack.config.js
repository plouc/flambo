const webpack           = require('webpack')
const path              = require('path')
const autoprefixer      = require('autoprefixer')
const postcssImport     = require('postcss-import')
const postcssVars       = require('postcss-css-variables')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')


const DOC_MODE  = !!process.env.DOC_MODE
const BUILD_DIR = DOC_MODE ? path.resolve(__dirname, '..', 'docs', 'build') : path.resolve(__dirname, 'public')
const APP_DIR   = path.resolve(__dirname, 'src')


const config = {
    output: {
        path:     BUILD_DIR,
        filename: '[name]-[hash:8].js',
    },
    modulesDirectories: ['node_modules'],
    resolve: {
        fallback: [
            APP_DIR,
        ],
        modulesDirectories: ['node_modules'],
    },
    module : {
        loaders: [
            {
                test:    /\.js$/,
                exclude: /node_modules/,
                include: APP_DIR,
            },
            {
                test:     /\.css$/,
            },
            {
                test:   /\.(png|svg)$/,
                loader: 'url?limit=100000',
            },
            {
                test:   /\.(jpg|gif)$/,
                loader: 'file',
            },
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            title:    'flambo',
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

if (process.env.NODE_ENV === 'production') {
    config.devtool = 'cheap-module-source-map'
    config.entry = [
        `${APP_DIR}/app`,
    ]
    config.module.loaders[0].loaders = ['babel']
    config.module.loaders[1].loader  = ExtractTextPlugin.extract('style', 'css!postcss!resolve-url')
    config.plugins.push(new ExtractTextPlugin(
        DOC_MODE ? '[name].css' : '[name]-[id]-[contenthash:8].css',
        { allChunks: true }
    ))
    config.plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production'),
        },
    }))
} else {
    config.devtool = 'eval'
    config.entry = [
        'webpack-dev-server/client?http://localhost:8081',
        'webpack/hot/only-dev-server',
        `${APP_DIR}/app`,
    ]
    config.module.loaders[0].loaders = ['react-hot', 'babel?cacheDirectory']
    config.module.loaders[1].loaders = ['style', 'css', 'resolve-url', 'postcss']
    config.plugins.unshift(new webpack.HotModuleReplacementPlugin())
}

module.exports = config

const path = require('path');
const HtmlWebpackPlugin =  require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const publicPath = '/';
const publicUrl = '';

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry : {
        main: './index.js'
    },
    output : {
        path : path.resolve(__dirname , 'dist'),
        filename: '[name].[contenthash].js',
        // This is the URL that app is served from. We use "/" in development.
        publicPath: publicPath,
    },
    module : {
        rules : [
            {test : /\.(js)$/, use:'babel-loader'},
            /* https://blog.jakoblind.no/css-modules-webpack/ */
            {test : /\.css$/, use:[
                'style-loader',
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        modules: true,
                    }
                }
            ], include: /\.module\.css$/},
            {test : /\.css$/, use:['style-loader', 'css-loader'], exclude: /\.module\.css$/},
            {test : /\.s[ac]ss$/, use:['style-loader', 'css-loader', 'sass-loader']},
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]',
                },
            },
        ]
    },
    devServer: {
        port: 3000,
    },
    mode:'development',
    plugins : [
        new HtmlWebpackPlugin ({
            template : '../public/index.html'
        }),
        new CleanWebpackPlugin()
    ]

}
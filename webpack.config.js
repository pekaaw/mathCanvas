const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlBeautifyPlugin = require('html-beautify-webpack-plugin');

module.exports = {
    mode: "development",
    entry: {
        setupTest: "./test/setupTest.js",
        schemeEditor: "./src/index.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].js",
        libraryTarget: "var",
        library: ["disam", "[name]"]
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
            test: /\.js$/,
        },{
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        },{
            test: /\.hbs$/,
            use: [{
                loader: 'handlebars-loader',
                options: {
                    runtime: path.resolve(__dirname, './Handlebars.custom.js')
                }
            }]
        },{
            test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
            use: [{
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    outputPath: 'fonts/',
                    publicPath: 'fonts'
                }
            }]
        }]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery',
            Popper: ['popper.js', 'default']
        }),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'Development',
            template: 'test/index_template.hbs'
        }),
        new HtmlBeautifyPlugin({
            config: {
                html: {
                    end_with_newline: true,
                    indent_size: 2,
                    indent_with_tabs: false,
                    indent_inner_html: true,
                    preserve_newlines: false,
                    unformatted: ['p', 'i', 'b', 'span']
                }
            },
            replace: [ ' type="text/javascript"']
        })
    ]
};

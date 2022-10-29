const path = require('path');
//const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

const distPath = path.resolve(__dirname, '../dist');

module.exports = {
    mode: 'production',
    entry: './src/main/main.ts',
    output: {
        filename: 'main.js',
        path: distPath,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    watch: true,
//    plugins: [
//        new CopyPlugin({
//            patterns: [
//                { from: "./src/index.html", to: distPath + "/index.html" },
//            ],
//        }),
//    ]
    plugins: [
        new HtmlWebpackPlugin()
    ]
};
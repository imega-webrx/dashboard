const webpack = require("webpack");
const path = require("path");

module.exports = {
    entry: "./src/server.js",
    target: "node",
    mode: "production",
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "server.js",
        libraryTarget: "commonjs2",
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                },
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.css$/,
                use: ["css-loader"],
            },
            {
                test: /\.(woff|woff2|eot|ttf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: "url-loader",
            },
        ],
    },
};

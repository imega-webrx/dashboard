const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const configRules = require("./webpack.common");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = Object.assign({}, configRules, {
    entry: {
        client: "./src/client.js",
    },
    target: "web",
    mode: "production",
    output: {
        filename: "[name].js",
        path: path.resolve(__dirname, "build"),
        publicPath: "/",
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    ie8: false,
                    output: {
                        comments: false,
                    },
                },
                sourceMap: true,
                extractComments: false,
            }),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new webpack.DefinePlugin({
            "process.env.STORYBOOK_GRAPHQL_HOST": JSON.stringify("/graphql"),
        }),
        new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en-gb/),
    ],
    stats: {
        maxModules: Number.MAX_VALUE,
    },
});

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const configRules = {
    module: {
        rules: [
            {
                test: /\.less$/i,
                use: [
                    // { loader: "style-loader" },
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true,
                            modules: false,
                        },
                    },
                    {
                        loader: "less-loader",
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                            },
                        },
                    },
                ],
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                // options: {
                //     plugins: [
                //         [
                //             "import",
                //             {
                //                 libraryName: "antd",
                //                 style: true,
                //             },
                //         ],
                //     ],
                // },
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                use: [
                    {
                        loader: "file-loader",
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader", "postcss-loader"],
            },
        ],
    },
    devServer: {
        static: "build",
        watchContentBase: true,
    },
};

module.exports = configRules;

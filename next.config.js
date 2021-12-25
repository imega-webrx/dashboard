const withAntdLess = require("next-plugin-antd-less");

module.exports = {
    distDir: "build",
    // basePath: "/dashboard",
    ...withAntdLess({
        lessVarsFilePathAppendToEndOfContent: false, // optional
        cssLoaderOptions: {
            mode: "local",
            localIdentName: "[path][name]__[local]--[hash:base64:5]",
            exportLocalsConvention: "camelCase",
            exportOnlyLocals: false,
        },
        webpack(config) {
            return config;
        },
    }),
};

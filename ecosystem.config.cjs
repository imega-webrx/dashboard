module.exports = {
    apps: [
        {
            name: "dashboard",
            script: "./index.js",
            cwd: "/srv/dashboard/src",
            node_args: "--experimental-specifier-resolution=node",
            env: {
                NODE_ENV: "production",
            },
            kill_timeout: 15000,
            max_memory_restart: "150M",
        },
        {
            name: "dashboardDev",
            script: "./run.cjs",
            cwd: "./src",
            node_args: "--experimental-specifier-resolution=node",
            env: {
                NODE_ENV: "development",
            },
            kill_timeout: 15000,
            max_memory_restart: "150M",
        },
    ],
};

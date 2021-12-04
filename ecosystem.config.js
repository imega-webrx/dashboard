module.exports = {
    apps: [
        {
            name: "dashboard",
            script: "./index.js",
            cwd: "/srv/dashboard/src",
            env: {
                NODE_ENV: "production",
            },
            kill_timeout: 15000,
            max_memory_restart: "150M",
        },
    ],
};

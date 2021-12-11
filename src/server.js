// import path from "path";
// import fs from "fs";

import React from "react";
import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "./App";

const PORT = process.env.DASHBOARD_PORT || 9000;
const app = express();

// ...

const tmpl = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Dashboard</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>`;

app.get("*", (req, res) => {
    console.log("=====", req);

    const appTemplate = ReactDOMServer.renderToString(
        <StaticRouter location={req.url}>
            <App />
        </StaticRouter>
    );

    //   const indexFile = path.resolve('./build/index.html');
    //   fs.readFile(indexFile, 'utf8', (err, data) => {
    //     if (err) {
    //       console.error('Something went wrong:', err);
    //       return res.status(500).send('Oops, better luck next time!');
    //     }

    return res.send(
        tmpl.replace(
            '<div id="root"></div>',
            `<div id="root">${appTemplate}</div>`
        )
    );
    //   });
    // res.send("Hello World!");
});

// app.use(express.static("./build"));

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});

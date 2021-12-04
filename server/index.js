import path from 'path';
import fs from 'fs';

import React from 'react';
import express from 'express';
import ReactDOMServer from 'react-dom/server';

// import App from '../src/App';

const PORT = process.env.PORT || 3006;
const app = express();

// ...

app.get('/', (req, res) => {
  // const app = ReactDOMServer.renderToString(<App />);
  // const app = ReactDOMServer.renderToString(<div><h1>Dashboard</h1></div>);

  // const indexFile = path.resolve('./build/index.html');
  // fs.readFile(indexFile, 'utf8', (err, data) => {
  //   if (err) {
  //     console.error('Something went wrong:', err);
  //     return res.status(500).send('Oops, better luck next time!');
  //   }

  //   return res.send(
  //     data.replace('<div id="root"></div>', `<div id="root">${app}</div>`)
  //   );
  // });
  res.send('Hello World!');
});

// app.use(express.static('./build'));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
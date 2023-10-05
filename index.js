const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();

const page404 = fs.readFileSync('404.html', 'utf-8', (err, data) => {
  if (err) throw err;
  return data;
});

app.get('/', (req, res) => {
  const filename = path.join(__dirname, 'index.html');
  fs.readFile(filename, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send(page404);
    } else {
      res.status(200).send(data);
    }
  });
});

app.get('/:page', (req, res) => {
  const page = req.params.page;
  const filename = path.join(__dirname, `${page}.html`);
  fs.readFile(filename, 'utf-8', (err, data) => {
    if (err) {
      res.status(404).send(page404);
    } else {
      res.status(200).send(data);
    }
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// const http = require("http");
// const url = require("url");
// const fs = require("fs");

// const page404 = fs.readFileSync("404.html", "utf-8", (err, data) => {
//   if (err) throw err;
//   return data;
// });

// http.createServer(function (req, res) {
//     const q = url.parse(req.url, true);
//     const filename = q.pathname === "/" ? `./index.html` : `.${q.pathname}.html`

//     fs.readFile(filename, function (err, data) {
//       if (err) {
//         res.writeHead(404, { "Content-Type": "text/html" });
//         res.write(page404);
//         return res.end();
//       } else {
//         res.writeHead(200, { "Content-Type": "text/html" });
//         res.write(data);
//         return res.end();
//       }
//     });
//   })
//   .listen(8080);
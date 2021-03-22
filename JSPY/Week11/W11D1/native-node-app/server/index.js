const http = require('http');
const { readFile } = require('fs').promises;
const path = require('path');

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/images')){
    const imageFilePath = './assets' + req.url;
    let imageFileContents;
    try {
      imageFileContents = await readFile(imageFilePath);
    } catch(e) {
      res.status = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not Found');
      return;
    }
    const fileExtension = path.extname(req.url);

    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${fileExtension.substring(1)}`);
    res.end(imageFileContents);
    return;
  }

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('I have items');
});

server.listen(port=8081, hostname='localhost', () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
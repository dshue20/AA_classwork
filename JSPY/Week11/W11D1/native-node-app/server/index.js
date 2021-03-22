const http = require('http');
const { readFile } = require('fs').promises;
const path = require('path');
const { Item } = require('../models');

const server = http.createServer(async (req, res) => {
  if (req.url.startsWith('/images')){
    const imageFilePath = './assets' + req.url;
    let imageFileContents;
    try {
      imageFileContents = await readFile(imageFilePath);
    } catch(e) {
      res.status = 404;
      res.setHeader('Content-Type', 'text/plain');
      res.end('404 Not');
      return;
    }

    const fileExtension = path.extname(req.url);
    res.statusCode = 200;
    res.setHeader('Content-Type', `image/${fileExtension.substring(1)}`);
    res.end(imageFileContents);
    return;
  }

  if (req.url === '/items/new'){
    const imageFilePath = "./views/add-item.html";
    const imageFileContents = await readFile(imageFilePath);
    res.status = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(imageFileContents);
    return;
  }

  if (req.url === '/items' && req.method === 'POST'){
    let body = '';
    for await (let chunk of req) {
      body += chunk;
    }
    const bodyData = body.split('&')
      .map(keyValue => keyValue.split('='))
      .map(([key, value]) => [key, value.replace(/\+/g, ' ')])
      .map(([key, value]) => [key, decodeURIComponent(value)])
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {});

    // Create an Item
    await Item.create(bodyData);

    // Redirect the browser to "/"
    res.statusCode = 302;
    res.setHeader('Location', '/');
    res.end();
    return;
  }

  const items = await Item.findAll();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`<div><a href="/items/new">Add a new item</a></div>I have ${items.length} items`);
});

server.listen(port=8081, hostname='localhost', () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});